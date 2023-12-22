import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    addNewAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
})

export const { addNewAnecdote, voteAnecdote, setAnecdote } = anecdotesReducer.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addNewAnecdote(newAnecdote))
  }
}

export const addVotes = id => {
  return async dispatch => {
    const newVote = await anecdoteService.updateVote(id)
    dispatch(voteAnecdote(newVote))
  }
}

export default anecdotesReducer.reducer
