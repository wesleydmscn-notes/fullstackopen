import axios from "axios"

const baseurl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseurl)
}

const createPerson = (person) => {
  return axios.post(baseurl, person)
}

export { getAll, createPerson }