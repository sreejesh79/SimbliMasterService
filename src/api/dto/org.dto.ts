import { ICompaniesEntity } from "entity/companies.entity";
import { IUsersEntity } from "entity/users.entity";

export interface ICompanyDTO {
    url: string;
    fullname: string;
    pan: string;
    offices: IOfficeDTO[],
    createdBy?: IUsersEntity;

}

export interface IOfficeDTO {
    name?: string;
    officeAddress: string;
    gstNo: string;
    gstAddress: string;
    createdBy: IUsersEntity;
    company: ICompaniesEntity;
}

export interface IBrandingDTO {
    logo: string;
    colorId?: number;
}

export interface ICompanyToUsersDTO {
    companiesId?: number;
    usersId: number;
    rolesId: number;
}