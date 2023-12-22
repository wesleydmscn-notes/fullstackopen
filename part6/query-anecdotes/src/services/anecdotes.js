import axios from "axios"

const baseURL = "http://localhost:3001/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = () => axios.get(baseURL).then((res) => res.data)

export const createAnecdote = (newAnecdote) =>
  axios.post(baseURL, newAnecdote).then((res) => res.data)
