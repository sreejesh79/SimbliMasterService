export interface ICompanyDTO {
    url: string;
    fullname: string;
    pan: string;
    branches: IBranchDTO[]
}

export interface IBranchDTO {
    name?: string;
    branchAddress: string;
    gstAddress: string;
}

export interface IBrandingDTO {
    logo: string;
    colorId?: number;
}