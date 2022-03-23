import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './baseentity';
import { BranchesEntity, IBranchesEntity } from './branches.entity';
import { BrandingsEntity, IBrandingsEntity } from './brandings.entity';

export interface ICompaniesEntity {
    url: string;
    fullname: string;
    pan: string;
    branches: IBranchesEntity[];
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

    @OneToMany( () => BranchesEntity, ( branch ) => branch.company )
    @JoinColumn()
    	branches: IBranchesEntity[];

    @OneToOne( () => BrandingsEntity )
    @JoinColumn()
    	branding: IBrandingsEntity;
}