import { ICompanyDTO, IBranchDTO } from '../dto/org.dto';
import { Service } from 'typedi';
import { BaseEntity, IBaseEntity } from 'entity/baseentity';
import { BranchesRepository } from '../repositories/branches.repository';
import { CompaniesRepository } from '../repositories/companies.repository';

@Service()
export class OrgService {

	constructor (
        private _companyRepo: CompaniesRepository,
        private _branchesRepo: BranchesRepository
	) {}
	public createNewCompany = async ( data: ICompanyDTO ): Promise<IBaseEntity> => {
		const branches: IBranchDTO[] = data.branches;
		const newBranches: IBaseEntity[] = await this._branchesRepo.save( branches );
		const newCompany: IBaseEntity = await this._companyRepo.save( data, newBranches );
		return newCompany;
	};
}