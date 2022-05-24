import {
  Count,
  CountSchema,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Account} from '../models';
import {AccountRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class AccountController {
  constructor(
    @repository(AccountRepository)
    public accountRepository : AccountRepository,
  ) {}

  @get('/accounts/count')
  @response(200, {
    description: 'Account model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.count(where);
  }

  @get('/accounts/{id}')
  @response(200, {
    description: 'Account model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Account, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Account, {exclude: 'where'}) filter?: FilterExcludingWhere<Account>
  ): Promise<Account> {
    return this.accountRepository.findById(id, filter);
  }


  @put('/accounts/{id}')
  @response(204, {
    description: 'Account PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() account: Account,
  ): Promise<void> {
    await this.accountRepository.replaceById(id, account);
  }

}
