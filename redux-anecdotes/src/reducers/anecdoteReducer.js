import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdote'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// export const makeVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id
//     }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content
//     }
//   }
// }

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      return [...state, asObject(content)].sort((a, b) => b.votes - a.votes)
    },
    makeVote(state, action) {
      const id = action.payload
      const anecdote = state.find(anecdote => anecdote.id === id)
      console.log(id, current(anecdote))
      ++anecdote.votes
      // console.log('updated anectode', updatedAnectode)
      state.sort((a, b) => b.votes - a.votes)
    },
    fetchAnecdotes(state, action) {
      return action.payload
    }
  }

})

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecdote = state.find(anecdote => anecdote.id === id)
//       const updatedAnectode = {
//         ...anecdote,
//         votes: ++anecdote.votes
//       }
//       // console.log('updated anectode', updatedAnectode)
//       const anectodes = state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnectode)
//       return orderBy(anectodes, ['votes'], ['desc'])
//     }

//   case 'NEW_ANECDOTE': {
//     const anecdote = asObject(action.payload.content)
//     return orderBy([...initialState, anecdote], ['votes'], ['desc'])
//   }

//     default:
//       return state
//   }

// }

export const Initializer = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(fetchAnecdotes(anecdotes))
  }
}

export const anecdoteAdder = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdote(content)
    dispatch(createAnecdote(anecdote.content))
  }
}

export const increaseVote = (id) => {
  return async dispatch => {
    dispatch(makeVote(id))
    await anecdoteService.updateVote(id)
  }
}

export default anecdoteSlice.reducer
export const {createAnecdote, makeVote, fetchAnecdotes} = anecdoteSlice.actions
