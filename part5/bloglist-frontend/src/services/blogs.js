import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request

  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const baseURL = `${baseUrl}/${newObject.id}`
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(baseURL, newObject, config)
  return response.data
}

export default { getAll, create, update, setToken }
