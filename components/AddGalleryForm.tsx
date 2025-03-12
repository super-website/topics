'use client'
import { useState } from 'react'
import { createGallery } from '@/utils/actions'
import { useSearchParams } from 'next/navigation'

export default function GalleryForm() {
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || files.length === 0) {
      alert('Please enter a title and select at least one image.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    files.forEach((file) => formData.append('files', file))

    await createGallery(formData)
  }

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-center mb-4'>Add Gallery</h1>
      {success && (
        <p className='my-4 alert text-green-400'>Gallery Added Successfully</p>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <label className='block'>
          <span className='font-medium text-gray-700'>Title</span>
          <input
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter gallery title'
          />
        </label>

        <label className='block'>
          <span className='font-medium text-gray-700'>Images</span>
          <input
            name='files'
            type='file'
            multiple
            onChange={handleFileChange}
            className='hidden'
            id='fileInput'
          />
          <div className='flex items-center gap-2 mt-2'>
            <button
              type='button'
              onClick={() => document.getElementById('fileInput')?.click()}
              className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            >
              Choose Files
            </button>
            {files.length > 0 && (
              <span className='text-gray-600'>
                {files.length} files selected
              </span>
            )}
          </div>
        </label>

        {files.length > 0 && (
          <div className='flex flex-wrap gap-4 mt-3'>
            {files.map((file, index) => (
              <div key={index} className='relative w-24 h-24'>
                <img
                  src={URL.createObjectURL(file)}
                  alt='Gallery Image'
                  width={200}
                  height={200}
                  className='rounded-md object-cover border'
                />
                <button
                  type='button'
                  onClick={() => removeFile(index)}
                  className='absolute top-1 right-1  text-white text-xs px-2 py-1 rounded-full'
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}

        <div className='flex justify-between mt-4'>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
