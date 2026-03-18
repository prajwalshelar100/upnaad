import { type SchemaTypeDefinition } from 'sanity'

import { musicType } from './musicType'
import { podcastType } from './podcastType'
import { releaseType } from './releaseType'

export const schemaTypes: SchemaTypeDefinition[] = [
  releaseType,
  musicType,
  podcastType,
]
