import { Service } from 'typedi';
import { Controller } from '../../decorators/controller.decorator';
import { Request, Response, NextFunction } from 'express';
import { IBaseEntity } from 'entity/baseentity';
import { OrgService } from '../services/org.service';
import { ICompanyDTO } from 'api/dto/org.dto';
import Responses from '../../config/responses';
import { Get, Post } from '../../decorators/route.decorator';
import { IUserDTO } from 'api/dto/users.dto';
import { IResponse } from 'types';

@Controller( '/org' )
@Service()
export class OrgController {
	constructor (
        private _orgService: OrgService
	) {}

    @Post( '/' )
	public createNewCompany = async ( req: Request, res: Response, next: NextFunction ) => {
    		try {
    			const response: IBaseEntity = await this._orgService.createNewCompany( <ICompanyDTO>req.body );
    			if ( response && response.id ) {
    				return res.json( Responses[200]( response ) );
    			} else {
    				return res.json( Responses[500]( JSON.stringify( response ) ) );
    			}
    		} catch ( e ) {
    			next( e );
    		}
    	};

	@Get( '/user/companies' )
    public getByUser = async ( req: Request, res: Response, next: NextFunction ) => {
			try {
				const response: IResponse = await this._orgService.getByUser();
				return res.status( response.statusCode ).json( response );
			} catch ( e ) {
				next( e );
			}
		};
}