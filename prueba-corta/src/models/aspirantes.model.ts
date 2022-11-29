import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plazas} from './plazas.model';

@model()
export class Aspirantes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombrecompleto: string;

  @property({
    type: 'string',
  })
  genero?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  idplaza: string;

  @property({
    type: 'string',
  })
  plazasId?: string;

  @hasMany(() => Plazas)
  plazas: Plazas[];

  constructor(data?: Partial<Aspirantes>) {
    super(data);
  }
}

export interface AspirantesRelations {
  // describe navigational properties here
}

export type AspirantesWithRelations = Aspirantes & AspirantesRelations;
