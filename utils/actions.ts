import prisma from '@/prisma/script'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const getAllSubject = async () => {
  const subjects = await prisma.subject.findMany({
    include: { topics: true },
    cache: 'no-store',
  })

  return subjects
}

export const getAllTopics = async (query: string) => {
  if (!query) {
    return await prisma.topics.findMany({
      include: {
        subject: true,
      },
    })
  }

  return {
    topics: await prisma.topics.findMany({
      where: {
        title: {
          contains: query.toLocaleLowerCase(),
        },
      },
      include: {
        subject: true,
      },
    }),
  }
}

export const createTopic = async (formData: FormData) => {
  const title = formData.get('title')
  const short_desc = formData.get('short_desc')
  const long_desc = formData.get('long_desc')
  const subjectId = formData.get('subjectId')

  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Title is required and must be a valid string.')
  }

  if (typeof short_desc !== 'string' || !short_desc.trim()) {
    throw new Error('Short description is required and must be a valid string.')
  }

  if (typeof long_desc !== 'string' || !long_desc.trim()) {
    throw new Error('Long description is required and must be a valid string.')
  }

  if (typeof subjectId !== 'string' || !subjectId.trim()) {
    throw new Error('Subject ID is required and must be a valid string.')
  }

  await prisma.topics.create({
    data: {
      title,
      short_desc,
      long_desc,
      subjectId,
    },
  })
  revalidatePath('/control/topics')
  redirect('add-topic?success=true')
}

export const updateTopic = async (formData: FormData) => {
  const id = formData.get('id')
  const title = formData.get('title')
  const short_desc = formData.get('short_desc')
  const long_desc = formData.get('long_desc')
  const subjectId = formData.get('subjectId')

  if (typeof title !== 'string' || !title.trim()) {
    throw new Error('Title is required and must be a valid string.')
  }

  if (typeof short_desc !== 'string' || !short_desc.trim()) {
    throw new Error('Short description is required and must be a valid string.')
  }

  if (typeof long_desc !== 'string' || !long_desc.trim()) {
    throw new Error('Long description is required and must be a valid string.')
  }

  if (typeof subjectId !== 'string' || !subjectId.trim()) {
    throw new Error('Subject ID is required and must be a valid string.')
  }
  if (typeof id !== 'string' || !id.trim()) {
    throw new Error('ID is required and must be a valid string.')
  }

  await prisma.topics.update({
    where: {
      id,
    },
    data: {
      title,
      short_desc,
      long_desc,
      subjectId,
    },
  })

  redirect('?success=true')
}

export const getSingleTopic = async (id: string) => {
  return await prisma.topics.findUnique({
    where: {
      id,
    },
    include: { subject: true },
  })
}

export const deleteTopic = async (formData: FormData) => {
  const id = formData.get('id')
  if (typeof id !== 'string' || !id.trim()) {
    throw new Error('Id is Required')
  }
  await prisma.topics.delete({
    where: {
      id,
    },
  })
  revalidatePath('/')
}

export const createSubject = async (formData: FormData) => {
  const name = formData.get('name')
  const short_desc = formData.get('short_desc')
  const short_name = formData.get('short_name')

  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('Name is required and must be a valid string.')
  }

  if (typeof short_name !== 'string') {
    throw new Error('Short Name is required and must be a valid string.')
  }

  if (typeof short_desc !== 'string') {
    throw new Error('Short Desc is required and must be a valid string.')
  }

  await prisma.subject.create({
    data: {
      name,
      short_name,
      short_desc,
    },
  })
  revalidatePath('/control/subjects')
  redirect('/control/subjects')
}

export const updateSubject = async (formData: FormData) => {
  const id = formData.get('id')
  const name = formData.get('name')
  const short_name = formData.get('short_name')
  const short_desc = formData.get('short_desc')

  if (typeof id !== 'string' || !id.trim()) {
    throw new Error('ID is required and must be a valid string.')
  }

  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('Name is required and must be a valid string.')
  }

  if (typeof short_name !== 'string') {
    throw new Error('Short Name is required and must be a valid string.')
  }

  if (typeof short_desc !== 'string') {
    throw new Error('Short Desc is required and must be a valid string.')
  }

  await prisma.subject.update({
    where: {
      id,
    },
    data: {
      name,
      short_name,
      short_desc,
    },
  })

  redirect('?success=true')
}

export const getSinglSubject = async (id: string) => {
  return await prisma.subject.findUnique({
    where: {
      id,
    },
    include: { topics: true },
  })
}

export const deleteSubject = async (formData: FormData) => {
  const id = formData.get('id')

  if (typeof id !== 'string' || !id.trim()) {
    throw new Error('Id is required')
  }

  try {
    await prisma.subject.delete({
      where: {
        id,
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.error('Error deleting subject:', error)

    throw new Error(`Failed to delete subject`)
  }
}
// auth

// Create Admin if none exist

export async function createFirstAdmin() {
  const isAlreadyAdmin = await prisma.admin.findFirst()

  if (isAlreadyAdmin) {
    throw new Error('Admin ALready exists.')
  }
  const hashedPassword = await bcrypt.hash('Admin@123', 10)

  const admin = await prisma.admin.create({
    data: {
      name: 'Admin',
      email: 'admin@notes.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  return admin
}

export const login = async (formData: FormData) => {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
      throw new Error('Email and password are required.')
    }

    if (typeof email !== 'string' || !email.trim()) {
      throw new Error('Invalid Email')
    }

    if (typeof password !== 'string' || !password.trim()) {
      throw new Error('Invalid Password')
    }

    const user = await prisma.admin.findUnique({ where: { email } })

    if (!user) {
      throw new Error('User not found.')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Invalid credentials.')
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const token = await new SignJWT({ id: user.id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret)

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })
    cookies().set('role', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    redirect('/control')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

export const logout = async () => {
  cookies().delete('token')
  cookies().delete('role')
  redirect('/control/login')
}
export const createGallery = async (formData: FormData) => {
  const files = formData.getAll('files') as File[]
  const title = formData.get('title') as string

  if (!title || files.length === 0) {
    throw new Error('Title and files are required')
  }

  try {
    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      return new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: 'gallery' }, (error, result) => {
              if (error || !result) {
                return reject(error || new Error('Upload failed'))
              }
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              })
            })
            .end(buffer)
        }
      )
    })

    const uploadedImages = await Promise.all(uploadPromises)

    await prisma.gallery.create({
      data: {
        title,
        images: uploadedImages,
      },
    })
    revalidatePath('/control/gallery')
  } catch (error) {
    console.error('Upload failed:', error)
    throw new Error('Gallery creation failed')
  }
  redirect('/control/gallery/add-gallery?success=true')
}

export const getAllGallery = async () => {
  return await prisma.gallery.findMany({})
}

export const deleteGallery = async (formData: FormData) => {
  const id = formData.get('galleryId') as string | number
  await prisma.gallery.delete({
    where: {
      id: id as string,
    },
  })

  revalidatePath('/control/gallery')
}

export const updateGallery = async (formData: FormData) => {
  console.log(formData)

  const galleryId = formData.get('galleryId') as string
  const title = formData.get('title') as string
  const existingImages = formData.getAll('existingImages') as string[]
  const newImages = formData.getAll('newImages') as File[]

  if (
    !galleryId ||
    !title ||
    (existingImages.length === 0 && newImages.length === 0)
  ) {
    throw new Error('Gallery ID, title, and at least one image are required')
  }

  const gallery = await prisma.gallery.findUnique({ where: { id: galleryId } })
  if (!gallery) throw new Error('Gallery not found')

  const uploadedImages = await Promise.all(
    newImages.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      return new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: 'gallery' }, (error, result) => {
              if (error || !result) reject(error || new Error('Upload failed'))
              else
                resolve({
                  secure_url: result.secure_url,
                  public_id: result.public_id,
                })
            })
            .end(buffer)
        }
      )
    })
  )

  const images = [
    ...existingImages.map((url) => ({ secure_url: url })),
    ...uploadedImages,
  ]

  await prisma.gallery.update({
    where: { id: galleryId },
    data: { title, images },
  })
  redirect(`/control/gallery/edit-gallery/${galleryId}?success=true`)
}

export const getSingleGallery = async (id: string) => {
  return await prisma.gallery.findUnique({
    where: {
      id,
    },
  })
}

export const getDownloadUrl = async (fileUrl: string) => {
  if (!fileUrl) throw new Error('No file URL provided')

  try {
    const response = await fetch(fileUrl)
    if (!response.ok)
      throw new Error(`Failed to fetch file: ${response.statusText}`)

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error generating download URL:', error)
    return null
  }
}
