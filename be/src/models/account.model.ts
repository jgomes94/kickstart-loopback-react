import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Account extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  createdAt ? : string;
  
  @property({
    type: 'date',
    default: () => new Date()
  })
  modifiedAt ? : string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
