import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdote = async (anecdote) => {
    const res = axios.post(baseUrl, anecdote)
    return res.data
}

export const updateVote = async (anecdote) => {
    const res = axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return res.data
}
