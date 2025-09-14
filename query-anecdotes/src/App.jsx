import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateVote } from './requests'
import { useNotificationDispatch } from './notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotify = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  })

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    const updated = {...anecdote, votes: ++anecdote.votes}
    updateVoteMutation.mutate(updated)
    dispatchNotify({type: 'SET', payload: `you voted ${anecdote.content}`})
    setTimeout(() => dispatchNotify({type: 'REMOVE'}), 3000)
    console.log('vote')
  }

  if (result.isLoading) {
    return (
      <div>Loading .........</div>
    )
  }

  if (result.isError) {
    return (
      <div>Error fetching content from server</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
