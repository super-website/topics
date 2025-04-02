import DeleteBtn from '@/components/DeleteBtn'
import { getAllComments, deleteComment } from '@/utils/actions'

export const revalidate = 0

export default async function Page() {
  const data = await getAllComments()

  return (
    <div className='max-w-7xl mx-auto p-5'>
      <h1 className='text-xl text-gray-800 mb-8'>Comments</h1>

      <div className='overflow-x-auto'>
        {data.length === 0 ? (
          <p className='text-gray-500 text-center text-lg'>
            No comments available.
          </p>
        ) : (
          <div className='overflow-x-auto'>
            <table className='table table-zebra w-full'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((comment) => (
                  <tr key={comment.id}>
                    <th>{comment.name}</th>
                    <td>{comment.email}</td>
                    <td>{comment.message}</td>
                    <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                    <td>
                      <DeleteBtn id={comment.id} deleteAction={deleteComment} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
