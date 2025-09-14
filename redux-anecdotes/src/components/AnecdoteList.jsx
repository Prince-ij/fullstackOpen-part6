import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import {setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes.filter(
        p => p.content.includes(state.filter)
    ))


    const vote = (id) => {
        console.log('vote', id)
        const anecdote = anecdotes.find(p => p.id === id)
        dispatch(increaseVote(id))
        dispatch(setNotification(`you voted ${anecdote.content}`, 5))
    }


    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </>

    )
}

export default AnecdoteList;
