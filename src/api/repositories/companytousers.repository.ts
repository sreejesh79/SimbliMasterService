import { Service } from 'typedi';
import { IRepository } from './base.repository';
import { Repository } from 'typeorm';
import { masterDBConnection } from '../../config/db';
import { CompaniesToUsersEntity } from '../entity/companiestousers.entity';
import { ICompanyToUsersDTO } from '../dto/org.dto';
import { IUserDTO } from 'api/dto/users.dto';


@Service()
export class CompanyToUsersRepository implements IRepository {

	getRepository = (): Repository<CompaniesToUsersEntity> => {
		return masterDBConnection().getRepository( CompaniesToUsersEntity );
	};

	public getByUser = async ( user: IUserDTO ): Promise<CompaniesToUsersEntity[]> => {
		const companyToUserssEntity: CompaniesToUsersEntity[] = await this.getRepository().find( { usersId: user.id } );
		return companyToUserssEntity;
	};

	public save = async ( data: ICompanyToUsersDTO ): Promise<CompaniesToUsersEntity> => {
		const companyToUserssEntity: CompaniesToUsersEntity = this.getRepository().create( data );
		const newBranches: CompaniesToUsersEntity = await this.getRepository().save( companyToUserssEntity );
		return newBranches;
	};
}
