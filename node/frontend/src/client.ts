import axios from 'axios'
import mock from '../mocks/$mock'

let baseURL = process.env.VUE_APP_API_URL

if (process.env.NODE_ENV === 'development') {
  baseURL = process.env.DEVELOP_API_URL
  if (process.env.MOCK_CLIENT_MODE === 'mockClientMode') {
    mock()
  }
}

const client = axios.create({
  baseURL: baseURL,
  responseType: 'json'
})

export default client
