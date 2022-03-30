import { Service } from 'typedi';
import { IRepository } from './base.repository';
import { Repository } from 'typeorm';
import { masterDBConnection } from '../../config/db';
import { OfficesEntity, IOfficesEntity } from '../entity/offices.entity';
import { IOfficeDTO } from 'api/dto/org.dto';

@Service()
export class BranchesRepository implements IRepository {

	getRepository = (): Repository<OfficesEntity> => {
		return masterDBConnection().getRepository( OfficesEntity );
	};

	public save = async ( data: IOfficeDTO[] ): Promise<OfficesEntity[]> => {
		const branchesEntity: OfficesEntity[] = this.getRepository().create( data );
		const newBranches: OfficesEntity[] = await this.getRepository().save( branchesEntity );
		return newBranches;
	};
}
