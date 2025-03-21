import { getAllComments } from '@/utils/actions'

export default async function page() {
  const data = await getAllComments()
  return (
    <div>
      <h1>Comments</h1>
      <div className='alert alert-info'>
        <p>Here are the comments</p>
      </div>
      <div
        className='grid grid-cols-1 gap-4'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        {data.map((comment) => (
          <div key={comment.id}>
            <h2>{comment.name}</h2>
            <p>{comment.email}</p>
            <p>{comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
