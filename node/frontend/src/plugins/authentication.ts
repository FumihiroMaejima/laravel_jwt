/* eslint-disable */
import axios from 'axios'
import cnf from '~/config/config.json'

export default class Authentication {
  options: any

  constructor(options: any) {
    this.options = options
    // this.$opt = Object.assign()
  }

  async getUser(header: object) {
    axios.defaults.withCredentials = true
    return await axios
      .post(cnf.PATH_AUTH_SELF, {}, { headers: header })
      .then(response => {
        // for check console.log('axios response' + JSON.stringify(response, null, 2))
        return { data: response.data, status: response.status}
      })
      .catch(error => {
        // for check console.error('axios error' + JSON.stringify(error.message, null, 2))
        return { data: error, status: error.response.status }
      })
  }

  async authority(meta: any): Promise<any> {
    return { data: true }
  }
}
