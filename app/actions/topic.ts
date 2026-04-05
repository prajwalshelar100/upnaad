'use server'

import { adminClient } from '@/src/sanity/lib/adminClient'
import { revalidatePath } from 'next/cache'

export async function submitTopic(formData: { title: string; category: string; description: string; email?: string }) {
  try {
    const { title, category, description, email } = formData
    
    await adminClient.create({
      _type: 'topic',
      title,
      category,
      description,
      email,
      status: 'Trending',
      upvotes: 0,
      downvotes: 0,
    })

    revalidatePath('/submit-topic')
    revalidatePath('/topics')
    return { success: true }
  } catch (error) {
    console.error('Error submitting topic:', error)
    return { success: false, error: 'Failed to submit topic' }
  }
}

export async function voteTopic(topicId: string, voteType: 'up' | 'down') {
  try {
    const field = voteType === 'up' ? 'upvotes' : 'downvotes'
    
    await adminClient
      .patch(topicId)
      .setIfMissing({ upvotes: 0, downvotes: 0 })
      .inc({ [field]: 1 })
      .commit()

    revalidatePath('/submit-topic')
    revalidatePath('/topics')
    return { success: true }
  } catch (error) {
    console.error('Error voting on topic:', error)
    return { success: false, error: 'Failed to vote' }
  }
}
