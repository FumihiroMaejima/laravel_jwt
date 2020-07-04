/* root */
export interface RootState {
  version: string
}

/* Login Module */
export interface LoginState {
  postData: {
    name: PostData['name']
    password: PostData['password']
  }
}
/* Login Module PostData */
export interface PostData {
  name: string
  password: string
}
