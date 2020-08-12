/* root */
export interface RootState {
  version: string
}

export interface AuthState {
  name: string | null,
  id: number | null,
  authority: object | null
}
