import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { anecdoteAdder } from "../reducers/anecdoteReducer";
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
      event.preventDefault()
      console.log(event.target.anecdote.value)
      const content = event.target.anecdote.value
      dispatch(anecdoteAdder(content))
      dispatch(setNotification(`Note '${content}'  created successfully`, 5))
      event.target.anecdote.value = ''
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                <input name='anecdote'/>
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm;
