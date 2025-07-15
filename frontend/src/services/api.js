import axios from 'axios'

const ENV = import.meta.env.VITE_NODE_ENV
const BASE_URL = ENV=="PROD" ? import.meta.env.VITE_API_BASE_URL : 'http://localhost:5000/api'
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
