/* eslint-disable */ 
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import Responses from 'config/responses';
import { IResponse } from 'types';
import { Expiries } from 'config/constants';
import { KMSSignDTO, KMSSignResponse } from '../api/dto/lamda.dto';
import { LamdaUtils } from './lamda.utils';
import { Logger } from 'config/logger';

@Service()
export class TokenUtils {

    constructor (
        private _expiries: Expiries,
        private _kmsSignDto: KMSSignDTO,
        private _lamdaUtils: LamdaUtils
    ) {

    }
    public generateOtpAccessToken = ( email: string ): string => {
        const secret: string = process.env.OTP_ACCESS_TOKEN_SECRET;
        const payload: IPayload = {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (this._expiries.OTP_TOKEN_EXPIRY)
        }
		return this.generateH256Token( payload, secret);
	};

    public verifyOtpAccessToken = (token: string): IResponse => {
        try {
            const secret: string = process.env.OTP_ACCESS_TOKEN_SECRET;
            var decoded: any = jwt.verify(token, Buffer.from(secret).toString('base64') , { algorithm: 'HS256' });
            return Responses[200](decoded);
        } catch (e) {
            console.log('e.message', e.message);
            return Responses[403](e.message);
        }
    }

    public generateRegisterToken =  (email: string): string => {
        const secret: string = process.env.REGISTER_TOKEN_SECRET;
        const payload: IPayload = {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (this._expiries.REGISTER_TOKEN_EXPIRY)
        }
        const token: string = this.generateH256Token( payload, secret);
        return token;

    }

    public verifyRegisterToken = ( token: string ): IResponse => {
        try {
            const secret: string = process.env.REGISTER_TOKEN_SECRET;
            var decoded: any = jwt.verify(token, Buffer.from(secret).toString('base64') , { algorithm: 'HS256' });
            return Responses[200](decoded);
        } catch (e) {
            return Responses[403](e.message);
        }
    }

    public  generateRefreshToken = ( email: string ): string => {
        const secret: string = process.env.REFRESH_TOKEN_SECRET;
        const payload: IPayload = {
            email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (this._expiries.REFRESH_TOKEN_EXPIRY)
        }
        const token: string = this.generateH256Token( payload, secret);
        return token;
    }

    public verifyRefreshToken = ( token: string ): IResponse => {
        try {
            const secret: string = process.env.REFRESH_TOKEN_SECRET;
            var decoded: any = jwt.verify(token, Buffer.from(secret).toString('base64') , { algorithm: 'HS256' });
            return Responses[200](decoded);
        } catch (e) {
            console.log('e.message', e.message);
            return Responses[403](e.message);
        }
    }

    public generateAccessToken = async ( email: string ): Promise<KMSSignResponse> => {
        const accessToken: KMSSignResponse =  <KMSSignResponse>await this._lamdaUtils.kmsJwtSign( <KMSSignDTO>{ email });
        return accessToken;
    }

    public veryfyAccessToken = async (token: string ): Promise<IPayload> => {
        const decoded: any = await this._lamdaUtils.kmsJwtVerify(token);
        try {
            const payload:IPayload = <IPayload>JSON.parse(decoded.decoded);
            return payload;
        } catch (e) {
            return decoded.decoded;
        }
    }

    public generateH256Token = ( payload: IPayload, secret: string ): string => {
        return jwt.sign( payload, Buffer.from(secret).toString('base64'), {
			algorithm: 'HS256',
			subject: JSON.stringify( payload )
		} );
    }

}

export interface IPayload {
    email: string,
    iat: number,
    exp: number
}

export interface IDecoded {
    decoded: IPayload
}

