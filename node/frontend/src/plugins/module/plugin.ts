import rootModule from './store'
const namespace = 'module'

export default ({ store }: any) => {
  store.registerModule(namespace, rootModule)
}
