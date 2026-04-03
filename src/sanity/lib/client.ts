import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Wrapper to prevent build crash if sanity isn't set up
const originalFetch = client.fetch.bind(client);
client.fetch = async (...args: any[]) => {
  try {
    return await originalFetch(...args);
  } catch (err: any) {
    console.warn("Sanity fetch warning:", err.message);
    return null;
  }
};

