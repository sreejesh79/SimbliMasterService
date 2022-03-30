/* eslint-disable */ 
import { createConnections, ConnectionOptions, Connection, getConnection } from 'typeorm';
import { UsersEntity } from '../api/entity/users.entity';
import { RolesEntity } from '../api/entity/roles.entity';
import { ColorsPalleteEntity } from '../api/entity/colorspallete.entity';
import { BrandingsEntity } from '../api/entity/brandings.entity';
import { CompaniesEntity } from '../api/entity/companies.entity';
import { OfficesEntity } from '../api/entity/offices.entity';
import { CompaniesToUsersEntity } from '../api/entity/companiestousers.entity';

class DB {

	public static readonly MASTER_DB_NAME: string = 'postgres';
	private static _connections: Connection[];

	private static _masterDB: ConnectionOptions;

	public static async init (): Promise<any> {
		DB._masterDB = {
			name: DB.MASTER_DB_NAME,
			type: 'postgres',
			host: process.env.MASTER_DB_HOST,
			port: Number( process.env.MASTER_DB_PORT ),
			username: process.env.MASTER_DB_USER,
			password: process.env.MASTER_DB_PASSWORD,
			database: process.env.MASTER_DATABASE,
			entities: [UsersEntity, RolesEntity, ColorsPalleteEntity, BrandingsEntity, CompaniesEntity, OfficesEntity, CompaniesToUsersEntity]
		};
		this._connections = await createConnections( [
			this._masterDB
		] );
		console.log( '\x1b[35mINFO\x1b[0m', `Master DB successfully connected to ${process.env.MASTER_DB_HOST}:${process.env.MASTER_DB_PORT}` );
	}

	public static get connections (): any {
		return this._connections;
	}


}

export default DB;

export const masterDBConnection = () => {
	return getConnection( DB.MASTER_DB_NAME );
};