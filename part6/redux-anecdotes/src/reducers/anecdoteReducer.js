import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVotes(state, action) {
      for (const anecdote of state) {
        if (anecdote.id === action.payload) {
          anecdote.votes += 1
        }
      }
    },
    addNewAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
})

export const { addVotes, addNewAnecdote, setAnecdote } = anecdotesReducer.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export default anecdotesReducer.reducer
