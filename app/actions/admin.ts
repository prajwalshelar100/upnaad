'use server'

import { adminClient } from '@/src/sanity/lib/adminClient'
import { revalidatePath } from 'next/cache'

async function uploadImage(file: File | null) {
  if (!file || file.size === 0) return null;
  try {
    const asset = await adminClient.assets.upload('image', file);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export async function createMusic(formData: FormData) {
  const passcode = formData.get('passcode') as string;
  if (passcode !== process.env.ADMIN_PASSCODE) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const spotifyUrl = formData.get('spotifyUrl') as string;
    const youtubeUrl = formData.get('youtubeUrl') as string;
    const audioUrl = formData.get('audioUrl') as string;
    const genre = formData.get('genre') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0];
    const theme = formData.get('theme') as string;
    const meaning = formData.get('meaning') as string;
    const artworkFile = formData.get('artwork') as File;

    const artwork = await uploadImage(artworkFile);

    await adminClient.create({
      _type: 'music',
      title,
      description,
      spotifyUrl,
      youtubeUrl,
      audioUrl,
      genre,
      category,
      date,
      theme,
      meaning,
      artwork: artwork || undefined,
    });

    revalidatePath('/music');
    return { success: true };
  } catch (error) {
    console.error('Error creating music:', error);
    return { success: false, error: 'Failed to create music track' };
  }
}

export async function createPodcast(formData: FormData) {
  const passcode = formData.get('passcode') as string;
  if (passcode !== process.env.ADMIN_PASSCODE) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const youtubeUrl = formData.get('youtubeUrl') as string;
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0];
    const thumbnailFile = formData.get('thumbnail') as File;

    const thumbnail = await uploadImage(thumbnailFile);

    await adminClient.create({
      _type: 'podcast',
      title,
      description,
      youtubeUrl,
      date,
      thumbnail: thumbnail || undefined,
    });

    revalidatePath('/podcast');
    return { success: true };
  } catch (error) {
    console.error('Error creating podcast:', error);
    return { success: false, error: 'Failed to create podcast episode' };
  }
}

export async function createBlog(formData: FormData) {
  const passcode = formData.get('passcode') as string;
  if (passcode !== process.env.ADMIN_PASSCODE) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const title = formData.get('title') as string;
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0];
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const categoryStr = formData.get('categories') as string;
    const categories = categoryStr ? categoryStr.split(',').map(s => s.trim()) : [];
    const coverImageFile = formData.get('coverImage') as File;

    const coverImage = await uploadImage(coverImageFile);
    const slugValue = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await adminClient.create({
      _type: 'blog',
      title,
      slug: { _type: 'slug', current: slugValue },
      date,
      excerpt,
      content,
      categories,
      coverImage: coverImage || undefined,
    });

    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Error creating blog:', error);
    return { success: false, error: 'Failed to create article' };
  }
}

export async function createRelease(formData: FormData) {
  const passcode = formData.get('passcode') as string;
  if (passcode !== process.env.ADMIN_PASSCODE) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const title = formData.get('title') as string;
    const thesis = formData.get('thesis') as string;
    const content = formData.get('content') as string;
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0];
    const lyrics = formData.get('lyrics') as string;
    const sanskritText = formData.get('sanskritText') as string;
    const transliteration = formData.get('transliteration') as string;
    const simpleMeaning = formData.get('simpleMeaning') as string;
    const deepInterpretation = formData.get('deepInterpretation') as string;
    const philosophicalExplanation = formData.get('philosophicalExplanation') as string;
    const whyItMatters = formData.get('whyItMatters') as string;
    const topicStr = formData.get('topics') as string;
    const topics = topicStr ? topicStr.split(',').map(s => s.trim()) : [];
    const coverImageFile = formData.get('coverImage') as File;

    const coverImage = await uploadImage(coverImageFile);
    const slugValue = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await adminClient.create({
      _type: 'release',
      title,
      slug: { _type: 'slug', current: slugValue },
      thesis,
      content,
      date,
      lyrics,
      sanskritText,
      transliteration,
      simpleMeaning,
      deepInterpretation,
      philosophicalExplanation,
      whyItMatters,
      topics,
      coverImage: coverImage || undefined,
    });

    revalidatePath('/releases');
    revalidatePath('/archive');
    return { success: true };
  } catch (error) {
    console.error('Error creating release:', error);
    return { success: false, error: 'Failed to create release' };
  }
}

export async function createService(formData: FormData) {
  const passcode = formData.get('passcode') as string;
  if (passcode !== process.env.ADMIN_PASSCODE) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const priceRange = formData.get('priceRange') as string;
    const icon = formData.get('icon') as string;
    const featureStr = formData.get('features') as string;
    const features = featureStr ? featureStr.split(',').map(s => s.trim()) : [];

    const slugValue = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await adminClient.create({
      _type: 'service',
      title,
      slug: { _type: 'slug', current: slugValue },
      description,
      priceRange,
      icon,
      features,
    });

    revalidatePath('/services');
    return { success: true };
  } catch (error) {
    console.error('Error creating service:', error);
    return { success: false, error: 'Failed to create service offering' };
  }
}
