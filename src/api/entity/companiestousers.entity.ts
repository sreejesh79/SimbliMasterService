import { Service } from 'typedi';
import { Entity, Column, AfterLoad, BeforeInsert, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from './baseentity';
import { CompaniesEntity } from './companies.entity';
import { UsersEntity } from './users.entity';

export interface ICompaniesToUsers {
    companiesId: number;
    usersId: number;
    rolesId: number;
}

@Entity( 'companies_users_roles' )
export class CompaniesToUsersEntity extends BaseEntity  implements ICompaniesToUsers {

    @Column( { name: 'companyId', type: 'int' } )
    	companiesId: number;

    @Column( { name: 'userId', type: 'int' } )
    	usersId: number;

    @Column( { name: 'roleId', type: 'int' } )
    	rolesId: number;

	 @ManyToOne( () => CompaniesEntity, ( company ) => company.companiesToUsers, { eager: true } )
	 	company: CompaniesEntity;

	 /* @ManyToMany( () => UsersEntity, ( user ) => user.companiesToUsers, { eager: true } )
    @JoinTable( { name: 'users' } )
    	user: UsersEntity; */

}