import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from './baseentity';
import { OfficesEntity, IOfficesEntity } from './offices.entity';
import { BrandingsEntity, IBrandingsEntity } from './brandings.entity';
import { IUsersEntity, UsersEntity } from './users.entity';
import { CompaniesToUsersEntity } from './companiestousers.entity';

export interface ICompaniesEntity {
    url: string;
    fullname: string;
    pan: string;
    offices: IOfficesEntity[];
    branding: IBrandingsEntity
}

@Entity( 'companies' )
export class CompaniesEntity extends BaseEntity implements ICompaniesEntity {
    @Column( 'varchar' )
    	url: string;

    @Column( 'varchar' )
    	fullname: string;

    @Column( 'varchar' )
    	pan: string;

    @ManyToOne( () => UsersEntity, ( user ) => user.offices )
    @JoinColumn( { name: 'created_by' } )
    	createdBy: IUsersEntity;

    @OneToMany( () => OfficesEntity, ( office ) => office.company, { eager: true } )
    @JoinColumn( { name: 'companyId' } )
    	offices: IOfficesEntity[];

    @OneToOne( () => BrandingsEntity, { eager: true } )
    @JoinColumn( { name: 'brandingId' } )
    	branding: IBrandingsEntity;

	@OneToMany( () => CompaniesToUsersEntity, ( companiesToUsers ) => companiesToUsers.company )
    	companiesToUsers: CompaniesToUsersEntity[];
}