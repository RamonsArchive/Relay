import { type SchemaTypeDefinition } from 'sanity'
import { user } from './user'
import { reviews } from './reviews'
import { product } from './product'
import { collections } from './collections'
import { brands } from './brands'
import { colors } from './colors'
import {materials} from './materials'
import { categories } from './categories'
import { flaggedReviews } from './flaggedReviews'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, product, collections, reviews, brands, colors, materials, categories, flaggedReviews],
}
