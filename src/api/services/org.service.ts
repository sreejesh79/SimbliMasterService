import { ICompanyDTO, ICompanyToUsersDTO, IOfficeDTO } from '../dto/org.dto';
import { Service } from 'typedi';
import { BaseEntity, IBaseEntity } from 'entity/baseentity';
import { BranchesRepository } from '../repositories/offices.repository';
import { CompaniesRepository } from '../repositories/companies.repository';
import { IUserDTO } from '../dto/users.dto';
import { CompanyToUsersRepository } from '../repositories/companytousers.repository';
import UsersService from './users.service';
import { CompaniesEntity, ICompaniesEntity } from 'entity/companies.entity';
import { CompaniesToUsersEntity, ICompaniesToUsers } from 'entity/companiestousers.entity';
import Responses from 'config/responses';
import { IResponse } from 'types';

@Service()
export class OrgService {

	constructor (
        private _companyRepo: CompaniesRepository,
        private _branchesRepo: BranchesRepository,
		private _companyToUsersRepo: CompanyToUsersRepository,
		private _usersService: UsersService
	) {}

	public createNewCompany = async ( data: ICompanyDTO ): Promise<CompaniesEntity> => {
		const offices: IOfficeDTO[] = data.offices;
		const owner: IUserDTO = this._usersService.owner;
		data.createdBy = owner;
		let newCompany: CompaniesEntity = await this._companyRepo.save( data );
		if ( newCompany && newCompany.id ) {
			const officesWithCompany: IOfficeDTO[] = this._addCompanyToOffices( offices, newCompany );
			const officesWithOwner: IOfficeDTO[] = this._addOwnersToOffices( officesWithCompany, owner );
			const newOffices: IBaseEntity[] = await this._branchesRepo.save( officesWithOwner );
			const companyToUsers: ICompanyToUsersDTO = <ICompanyToUsersDTO> {
				companiesId: newCompany.id,
				usersId: this._usersService.owner.id,
				rolesId: 2
			};
			const newCompanyToUsers: CompaniesToUsersEntity = await this._companyToUsersRepo.save( companyToUsers );
			newCompany = await this._companyRepo.getById( newCompany.id );
		}
		return newCompany;
	};

	public getByUser = async (): Promise<IResponse> => {
		const owner: IUserDTO = this._usersService.owner;
		const companiesToUsers: ICompaniesToUsers[] = await this._companyToUsersRepo.getByUser( owner );
		if ( companiesToUsers && companiesToUsers.length ) {
			return Responses[200]( companiesToUsers );
		} else {
			return Responses[404]( 'Companies not found' );
		}
	};
	private _addCompanyToOffices = ( offices: IOfficeDTO[], company: ICompaniesEntity ): IOfficeDTO[] => {
		for ( const office of offices ) {
			office.company = company;
		}
		return offices;
	};

	private _addOwnersToOffices = ( offices: IOfficeDTO[], owner: IUserDTO ): IOfficeDTO[] => {
		for ( const office of offices ) {
			office.createdBy = owner;
		}
		return offices;
	};
}