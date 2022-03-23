import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseentity';

export interface IColorsPalleteEntity {
    primaryColor: string;
    secondaryColor: string;
}

@Entity( 'colors_pallete' )
export class ColorsPalleteEntity extends BaseEntity implements IColorsPalleteEntity {
    @Column( 'varchar' )
    	primaryColor: string;

    @Column( 'varchar' )
    	secondaryColor: string;
}
