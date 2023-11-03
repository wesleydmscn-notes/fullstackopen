import axios from "axios"

const baseurl = "/api/persons"

const getAll = () => {
  return axios.get(baseurl)
}

const createPerson = (person) => {
  return axios.post(baseurl, person)
}

const updatePerson = (id, data) => {
  return axios.put(`${baseurl}/${id}`, data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseurl}/${id}`)
}

export { getAll, createPerson, updatePerson, deletePerson }
