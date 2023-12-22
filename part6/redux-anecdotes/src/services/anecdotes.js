import axios from "axios"

import { getId } from "../reducers/anecdoteReducer"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    id: getId(),
    votes: 0
  }

  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  const request = axios.put(`${baseUrl}/${id}`, { ...data, votes: data.votes + 1 })

  return request.then(response => response.data)
}

export default { getAll, createNew, updateVote }
