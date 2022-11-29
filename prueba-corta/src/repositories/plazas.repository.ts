import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Plazas, PlazasRelations, Aspirantes} from '../models';
import {AspirantesRepository} from './aspirantes.repository';

export class PlazasRepository extends DefaultCrudRepository<
  Plazas,
  typeof Plazas.prototype.idplaza,
  PlazasRelations
> {

  public readonly aspirantes: HasManyRepositoryFactory<Aspirantes, typeof Plazas.prototype.idplaza>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AspirantesRepository') protected aspirantesRepositoryGetter: Getter<AspirantesRepository>,
  ) {
    super(Plazas, dataSource);
    this.aspirantes = this.createHasManyRepositoryFactoryFor('aspirantes', aspirantesRepositoryGetter,);
    this.registerInclusionResolver('aspirantes', this.aspirantes.inclusionResolver);
  }
}
