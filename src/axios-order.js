import axios from 'axios'

const instance = axios.create({
  baseURL:'paste ur db url',
})

export default instance
