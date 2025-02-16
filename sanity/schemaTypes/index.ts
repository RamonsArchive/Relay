import { type SchemaTypeDefinition } from 'sanity'
import { user } from './user'
import { reviews } from './reviews'
import { product } from './product'
import { collections } from './collections'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, product, collections, reviews],
}
