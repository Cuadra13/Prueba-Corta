import {Entity, model, property, hasMany} from '@loopback/repository';
import {Aspirantes} from './aspirantes.model';

@model()
export class Plazas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idplaza?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'string',
    required: true,
  })
  requisitos: string;

  @hasMany(() => Aspirantes)
  aspirantes: Aspirantes[];

  @property({
    type: 'string',
  })
  aspirantesId?: string;

  constructor(data?: Partial<Plazas>) {
    super(data);
  }
}

export interface PlazasRelations {
  // describe navigational properties here
}

export type PlazasWithRelations = Plazas & PlazasRelations;
