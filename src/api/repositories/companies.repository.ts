import { Service } from 'typedi';
import { IRepository } from './base.repository';
import { Repository } from 'typeorm';
import { masterDBConnection } from '../../config/db';
import { CompaniesEntity, ICompaniesEntity } from '../entity/companies.entity';
import { ICompanyDTO } from 'api/dto/org.dto';
import { IBaseEntity } from 'entity/baseentity';
import { BranchesEntity } from 'entity/branches.entity';

@Service()
export class CompaniesRepository implements IRepository {

	getRepository = (): Repository<CompaniesEntity> => {
		return masterDBConnection().getRepository( CompaniesEntity );
	};

	public save = async ( data: ICompanyDTO, branches: IBaseEntity[] ): Promise<CompaniesEntity> => {
		const companyInstance: CompaniesEntity = this.getRepository().create( data );
		const branchesData: BranchesEntity[] = <BranchesEntity[]>branches;
		companyInstance.branches = branchesData;
		const newCompany: CompaniesEntity = await this.getRepository().save( companyInstance );
		return newCompany;
	};
}
