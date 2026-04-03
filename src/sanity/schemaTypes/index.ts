import { type SchemaTypeDefinition } from 'sanity'

import { homeType } from './homeType'
import { musicType } from './musicType'
import { podcastType } from './podcastType'
import { releaseType } from './releaseType'
import { blogType } from './blogType'
import { serviceType } from './serviceType'

export const schemaTypes: SchemaTypeDefinition[] = [
  homeType,
  releaseType,
  musicType,
  podcastType,
  blogType,
  serviceType,
]

