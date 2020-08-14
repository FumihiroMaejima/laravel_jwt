/* root */
export interface HeaderDataState {
  id: number | null
  token: string | null
}

export interface BaseAddHeaderResponse {
  Authorization: string
  'X-Auth-ID': number | string
}
