import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Aspirantes,
  Plazas,
} from '../models';
import {AspirantesRepository} from '../repositories';

export class AspirantesPlazasController {
  constructor(
    @repository(AspirantesRepository) protected aspirantesRepository: AspirantesRepository,
  ) { }

  @get('/aspirantes/{id}/plazas', {
    responses: {
      '200': {
        description: 'Array of Aspirantes has many Plazas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plazas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plazas>,
  ): Promise<Plazas[]> {
    return this.aspirantesRepository.plazas(id).find(filter);
  }

  @post('/aspirantes/{id}/plazas', {
    responses: {
      '200': {
        description: 'Aspirantes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plazas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aspirantes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plazas, {
            title: 'NewPlazasInAspirantes',
            exclude: ['idplaza'],
            optional: ['aspirantesId']
          }),
        },
      },
    }) plazas: Omit<Plazas, 'idplaza'>,
  ): Promise<Plazas> {
    return this.aspirantesRepository.plazas(id).create(plazas);
  }

  @patch('/aspirantes/{id}/plazas', {
    responses: {
      '200': {
        description: 'Aspirantes.Plazas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plazas, {partial: true}),
        },
      },
    })
    plazas: Partial<Plazas>,
    @param.query.object('where', getWhereSchemaFor(Plazas)) where?: Where<Plazas>,
  ): Promise<Count> {
    return this.aspirantesRepository.plazas(id).patch(plazas, where);
  }

  @del('/aspirantes/{id}/plazas', {
    responses: {
      '200': {
        description: 'Aspirantes.Plazas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plazas)) where?: Where<Plazas>,
  ): Promise<Count> {
    return this.aspirantesRepository.plazas(id).delete(where);
  }
}
