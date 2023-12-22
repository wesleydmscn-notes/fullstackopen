import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

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
      state.push({ content: action.payload, votes: 0, id: getId() })
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const { addVotes, addNewAnecdote, setNotes } = anecdotesReducer.actions
export default anecdotesReducer.reducer
