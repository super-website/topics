import { getAllComments } from '@/utils/actions'

export default async function page() {
  const data = await getAllComments()
  return (
    <div>
      <h1>Comments</h1>
      <div>
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
