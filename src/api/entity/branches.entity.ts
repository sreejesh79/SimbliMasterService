import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './baseentity';
import { CompaniesEntity, ICompaniesEntity } from './companies.entity';

export interface IBranchesEntity {
    name: string;
    branchAddress: string;
    gstAddress: string;
    company: ICompaniesEntity
}

@Entity( 'branches' )
export class BranchesEntity extends BaseEntity implements IBranchesEntity {
    @Column( 'varchar' )
    	name: string;

    @Column( { name: 'branch_address', type: 'text' } )
    	branchAddress: string;

    @Column( { name: 'gst_address', type: 'text' } )
    	gstAddress: string;

    @ManyToOne( () => CompaniesEntity, ( company ) => company.branches )
    @JoinColumn()
    	company: ICompaniesEntity;

}