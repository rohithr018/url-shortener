import api from './api'

export const shortenUrl = async (data) => {
  const res = await api.post('/shorten', data)
  return res.data
}

export const getGlobalAnalytics = async () => {
  const res = await api.get('/analytics')
  return res.data
}

