'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createTopic } from '@/utils/actions'
import ReactSimpleMDEEditor from 'react-simplemde-editor'
import 'simplemde/dist/simplemde.min.css'
interface Subject {
  id: string
  name: string
}

export default function AddNewTopic({ subjects }: { subjects: Subject[] }) {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  const [longDesc, setLongDesc] = useState('')

  const handleEditorChange = (value: string) => {
    setLongDesc(value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    formData.append('long_desc', longDesc)

    try {
      await createTopic(formData)
      console.log('Topic created successfully!')
    } catch (error) {
      console.error('Error creating topic:', error)
    }
  }

  return (
    <div className='p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm'>
      <h1 className='text-3xl font-semibold mb-4'>Add Topic</h1>

      {success && (
        <div className='alert alert-success mb-4'>
          Topic added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} method='POST' className='space-y-4'>
        <div className='form-control'>
          <label htmlFor='title' className='block text-sm font-medium'>
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Enter Your Title'
            className='input input-bordered w-full mt-1'
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor='short_desc' className='block text-sm font-medium'>
            Short Description
          </label>
          <input
            type='text'
            id='short_desc'
            name='short_desc'
            placeholder='Enter Your Short Description'
            className='input input-bordered w-full mt-1'
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor='long_desc' className='block text-sm font-medium'>
            Long Description
          </label>

          <ReactSimpleMDEEditor
            value={longDesc}
            onChange={handleEditorChange}
            options={{
              spellChecker: false,
              maxHeight: '400px',
            }}
          />
        </div>

        <div className='form-control'>
          <label className='block text-sm font-medium'>Subject</label>
          <select
            name='subjectId'
            id='subjectId'
            className='select select-bordered w-full mt-1'
            required
          >
            <option value='' disabled selected>
              Select a Subject
            </option>
            {subjects.map((subject) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <button type='submit' className='btn btn-primary w-full'>
          Submit
        </button>
      </form>
    </div>
  )
}
