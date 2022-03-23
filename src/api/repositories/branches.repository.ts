import { Service } from 'typedi';
import { IRepository } from './base.repository';
import { Repository } from 'typeorm';
import { masterDBConnection } from '../../config/db';
import { BranchesEntity, IBranchesEntity } from '../entity/branches.entity';
import { IBranchDTO } from 'api/dto/org.dto';

@Service()
export class BranchesRepository implements IRepository {

	getRepository = (): Repository<BranchesEntity> => {
		return masterDBConnection().getRepository( BranchesEntity );
	};

	public save = async ( data: IBranchDTO[] ): Promise<BranchesEntity[]> => {
		const branchesEntity: BranchesEntity[] = this.getRepository().create( data );
		const newBranches: BranchesEntity[] = await this.getRepository().save( branchesEntity );
		return newBranches;
	};
}
