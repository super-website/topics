'use client'
import { useState } from 'react'
import { updateGallery } from '@/utils/actions'
import { useSearchParams } from 'next/navigation'

export default function EditGalleryForm({ data }: { data: any }) {
  const [title, setTitle] = useState(data.title || '')
  const [existingImages, setExistingImages] = useState(data.images || [])
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index: number) => {
    setExistingImages((prev: string[]) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || (files.length === 0 && existingImages.length === 0)) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('galleryId', data.id)
      formData.append('title', title)
      files.forEach((file) => formData.append('files', file))
      existingImages.forEach((img: any) =>
        formData.append('existingImages', img.secure_url)
      )

      await updateGallery(formData)
    } catch (error) {
      console.error('Error updating gallery:', error)
      alert('Failed to update gallery.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-center mb-4'>Edit Gallery</h1>
      {success && (
        <p className='my-4 text-green-600 alert'>
          Gallery Updated Successfully
        </p>
      )}
      {error && <p className='my-4 text-red-600 alert'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input type='hidden' name='galleryId' value={data.id} />
        <label className='block'>
          <span className='font-medium text-gray-700'>Title</span>
          <input
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500'
            placeholder='Enter gallery title'
          />
        </label>

        {/* File Upload */}
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
          <button
            type='button'
            onClick={() => document.getElementById('fileInput')?.click()}
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2'
          >
            Choose Files
          </button>
          <p className='text-gray-600 mt-1'>{files.length} files selected</p>
        </label>

        {/* Display Existing Images */}
        {existingImages.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-3'>
            {existingImages.map((img: any, index: number) => (
              <div key={index} className='relative w-24 h-24'>
                <img
                  src={img.secure_url}
                  alt='Gallery Image'
                  className='rounded-md object-cover border w-60 h-full'
                />
                <button
                  type='button'
                  onClick={() => removeExistingImage(index)}
                  className='absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full'
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Display New Images */}
        {files.length > 0 && (
          <div className='flex flex-wrap gap-4 mt-3'>
            {files.map((file, index) => (
              <div key={index} className='relative w-24 h-24'>
                <img
                  src={URL.createObjectURL(file)}
                  alt='New Gallery Image'
                  className='rounded-md object-cover border w-full h-full'
                />
                <button
                  type='button'
                  onClick={() => removeFile(index)}
                  className='absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full'
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        )}

        <div className='flex justify-between mt-4'>
          <button
            type='submit'
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
