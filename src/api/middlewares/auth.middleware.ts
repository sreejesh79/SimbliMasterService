import { Service } from 'typedi';
import { Middleware } from '../../decorators/middleware.decorator';
import { Use } from '../../decorators/route.decorator';
import { Request, Response, NextFunction } from 'express';
import { TokenUtils, IPayload } from '../../utils/token.utils';
import { Messages } from 'config/constants';
import { IResponse } from 'types';
import Responses from 'config/responses';
import UsersService from '../services/users.service';
import { IUserDTO } from 'api/dto/users.dto';
import { Logger } from 'config/logger';

@Middleware( '/api/v1' )
@Service()
export class AuthMiddleware {
	constructor (
       private _usersService: UsersService,
        private _tokenUtils: TokenUtils,
        private _messages: Messages,

	) {}
	@Use( '/*' )
	public authorization = async ( req: Request, res: Response, next: NextFunction ) => {
			const badreqResponse: IResponse = Responses[400]( this._messages.TOKEN_BADREQUEST );
			if ( req.headers['authorization'] ) {
				const accessToken: string = req.headers['authorization'].toString();
				const payLoad: IPayload = await this._tokenUtils.veryfyAccessToken( accessToken );
				if ( payLoad && payLoad.email ) {
					const owner: IUserDTO = await this._usersService.getByEmail( payLoad.email );
					if ( owner && owner.id ) {
						req.user = owner;
						this._usersService.owner = owner;
						next();
						return;
					} else {
						return res.status( badreqResponse.statusCode ).json( badreqResponse );
					}
				} else {
					const deniedResponse: IResponse = Responses[401]( JSON.stringify( payLoad ) );
					return res.status( deniedResponse.statusCode ).json( deniedResponse );
				}
			} else {
				return res.status( badreqResponse.statusCode ).json( badreqResponse );
			}
		};
}