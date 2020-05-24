import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/api/"
// axios.defaults.withCredentials = true

const Search = ({ field, query}) => {
  return axios.get(`search/books/${field}/${query}`)
}

export default {
  Search
}