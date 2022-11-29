import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Aspirantes} from '../models';
import {AspirantesRepository} from '../repositories';

export class AspirantesController {
  constructor(
    @repository(AspirantesRepository)
    public aspirantesRepository : AspirantesRepository,
  ) {}

  @post('/aspirantes')
  @response(200, {
    description: 'Aspirantes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aspirantes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aspirantes, {
            title: 'NewAspirantes',
            exclude: ['id'],
          }),
        },
      },
    })
    aspirantes: Omit<Aspirantes, 'id'>,
  ): Promise<Aspirantes> {
    return this.aspirantesRepository.create(aspirantes);
  }

  @get('/aspirantes/count')
  @response(200, {
    description: 'Aspirantes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aspirantes) where?: Where<Aspirantes>,
  ): Promise<Count> {
    return this.aspirantesRepository.count(where);
  }

  @get('/aspirantes')
  @response(200, {
    description: 'Array of Aspirantes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aspirantes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aspirantes) filter?: Filter<Aspirantes>,
  ): Promise<Aspirantes[]> {
    return this.aspirantesRepository.find(filter);
  }

  @patch('/aspirantes')
  @response(200, {
    description: 'Aspirantes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aspirantes, {partial: true}),
        },
      },
    })
    aspirantes: Aspirantes,
    @param.where(Aspirantes) where?: Where<Aspirantes>,
  ): Promise<Count> {
    return this.aspirantesRepository.updateAll(aspirantes, where);
  }

  @get('/aspirantes/{id}')
  @response(200, {
    description: 'Aspirantes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aspirantes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Aspirantes, {exclude: 'where'}) filter?: FilterExcludingWhere<Aspirantes>
  ): Promise<Aspirantes> {
    return this.aspirantesRepository.findById(id, filter);
  }

  @patch('/aspirantes/{id}')
  @response(204, {
    description: 'Aspirantes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aspirantes, {partial: true}),
        },
      },
    })
    aspirantes: Aspirantes,
  ): Promise<void> {
    await this.aspirantesRepository.updateById(id, aspirantes);
  }

  @put('/aspirantes/{id}')
  @response(204, {
    description: 'Aspirantes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aspirantes: Aspirantes,
  ): Promise<void> {
    await this.aspirantesRepository.replaceById(id, aspirantes);
  }

  @del('/aspirantes/{id}')
  @response(204, {
    description: 'Aspirantes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.aspirantesRepository.deleteById(id);
  }
}
