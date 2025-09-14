import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const anecdotes = await axios.get(baseUrl)
    return anecdotes.data
}

const createAnecdote = async(data) => {
    const content = asObject(data)
    const anecdotes = await axios.post(baseUrl, content)
    return anecdotes.data
}

const updateVote = async (id) => {
    const anecdotes = await getAnecdotes()
    const anecdote = anecdotes.find(p => p.id == id)
    const updatedAnectode = {...anecdote, votes: ++anecdote.votes}
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnectode)
    return response.data
}

export default {
    getAnecdotes,
    createAnecdote,
    updateVote
}
