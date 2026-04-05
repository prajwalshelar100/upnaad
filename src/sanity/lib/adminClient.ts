import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// This client has write permissions and should ONLY be used in Server Actions or Route Handlers
// It requires SANITY_API_WRITE_TOKEN to be set in environment variables
export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Must be false for mutations
  token: process.env.SANITY_API_WRITE_TOKEN,
})
