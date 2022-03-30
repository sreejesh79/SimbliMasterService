import { Entity, Column, ManyToMany, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from './baseentity';
import { CompaniesEntity } from './companies.entity';
import { CompaniesToUsersEntity } from './companiestousers.entity';
import { OfficesEntity } from './offices.entity';
import { RolesEntity } from './roles.entity';

export interface IUsersEntity {
    email: string;
    password: string;
    mobile: string;
    refresh_token: string;
}

@Entity( 'users' )
export class UsersEntity extends BaseEntity implements IUsersEntity {

    @Column( 'varchar' )
    	email: string;

    @Column( { type: 'varchar', select: false } )
    	password: string;

    @Column( 'varchar' )
    	mobile: string;

    @Column( 'varchar' )
    	refresh_token: string;

    @ManyToMany( () => RolesEntity, { eager: true } )
    @JoinTable( { name: 'users_roles' } )
    	roles: RolesEntity[];
    @OneToMany( () => OfficesEntity, ( offices ) => offices.createdBy, { eager: true } )
    @JoinColumn( { name: 'created_by' } )
    	offices: OfficesEntity[];

	/* @ManyToMany( () => CompaniesToUsersEntity, ( companiesToUsers ) => companiesToUsers.user )
    @JoinTable( { name: 'companies_users_roles' } )
    	companiesToUsers: CompaniesToUsersEntity[]; */

}