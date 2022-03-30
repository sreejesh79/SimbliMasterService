import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './baseentity';
import { CompaniesEntity, ICompaniesEntity } from './companies.entity';
import { IUsersEntity, UsersEntity } from './users.entity';

export interface IOfficesEntity {
    name: string;
    officeAddress: string;
    gstNo: string;
    gstAddress: string;
    company: ICompaniesEntity
}

@Entity( 'offices' )
export class OfficesEntity extends BaseEntity implements IOfficesEntity {
    @Column( 'varchar' )
    	name: string;

    @Column( { name: 'address', type: 'text' } )
    	officeAddress: string;
    @Column( { name: 'gst_no', type: 'varchar' } )
    	gstNo: string;

    @Column( { name: 'gst_address', type: 'text' } )
    	gstAddress: string;

    @ManyToOne( () => UsersEntity, ( user ) => user.offices )
    @JoinColumn( { name: 'created_by' } )
    	createdBy: IUsersEntity;

    @ManyToOne( () => CompaniesEntity, ( company ) => company.offices )
    @JoinColumn( { name: 'companyId' } )
    	company: ICompaniesEntity;

}