'use server'

import { adminClient } from '@/src/sanity/lib/adminClient'
import { revalidatePath } from 'next/cache'

export async function submitStory(formData: { title: string; category: string; content: string; author: string; email?: string }) {
  try {
    const { title, category, content, author, email } = formData
    
    // Create the story document in Sanity
    // Note: We might want to mark it as un-published or draft, but for simplicity we create it
    // We can filter by a "published" flag in the gallery if needed.
    await adminClient.create({
      _type: 'story',
      title,
      category,
      content,
      author,
      excerpt: content.substring(0, 150) + "...", // Auto-generate excerpt if not provided
      date: new Date().toISOString().split('T')[0],
      isFeatured: false,
    })

    revalidatePath('/stories')
    revalidatePath('/collaborate')
    return { success: true }
  } catch (error) {
    console.error('Error submitting story:', error)
    return { success: false, error: 'Failed to submit story' }
  }
}
