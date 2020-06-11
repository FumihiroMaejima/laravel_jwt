import axios from 'axios'

export default class Authentication {
  options: any

  constructor(options: any) {
    this.options = options
  }

  async getUser() {
    return { data: true }
  }

  async authority(meta: any): Promise<any> {
    return {data: true}
  }
}
