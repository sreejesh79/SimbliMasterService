import { Service } from 'typedi';
import { IRepository } from './base.repository';
import { Repository } from 'typeorm';
import { masterDBConnection } from '../../config/db';
import { CompaniesEntity, ICompaniesEntity } from '../entity/companies.entity';
import { ICompanyDTO } from 'api/dto/org.dto';
import { IBaseEntity } from 'entity/baseentity';
import { OfficesEntity } from 'entity/offices.entity';

@Service()
export class CompaniesRepository implements IRepository {

	getRepository = (): Repository<CompaniesEntity> => {
		return masterDBConnection().getRepository( CompaniesEntity );
	};

	public getById = async ( id: number ): Promise<CompaniesEntity> => {
		const company: CompaniesEntity = await this.getRepository().findOne( { id } );
		return company;
	};

	public save = async ( data: ICompanyDTO ): Promise<CompaniesEntity> => {
		const companyInstance: CompaniesEntity = this.getRepository().create( data );
		const newCompany: CompaniesEntity = await this.getRepository().save( companyInstance );
		return newCompany;
	};
}
