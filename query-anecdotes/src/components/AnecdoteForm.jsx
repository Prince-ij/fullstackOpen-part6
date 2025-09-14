import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../notificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotify = useNotificationDispatch()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      dispatchNotify({type: 'SET', payload: `${content} successfully created`})
      setTimeout(() => dispatchNotify({type:'REMOVE'}), 3000)
    },
    onError: () => {
      dispatchNotify({type: 'SET', payload: 'Too short, must be greater than 5 chars'})
      setTimeout(() => dispatchNotify({type:'REMOVE'}), 3000)
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdoteMutation.mutate({content, votes: 0})
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
