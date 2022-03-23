import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './baseentity';
import { ColorsPalleteEntity, IColorsPalleteEntity } from './colorspallete.entity';

export interface IBrandingsEntity {
    logo: string;
    color: IColorsPalleteEntity;
}

@Entity( 'brandings' )
export class BrandingsEntity extends BaseEntity implements IBrandingsEntity {
    @Column( 'text' )
    	logo: string;

    @OneToOne( () => ColorsPalleteEntity )
    @JoinColumn()
    	color: IColorsPalleteEntity;

}

