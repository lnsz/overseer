import Gateway from '../gateway'

export default {
  getStatus() {
    return Gateway().get('users')
  },
  createUser(params) {
    return Gateway().post('users', params)
  },
  updateUser(params) {
    return Gateway().put(`users/${params.username}`, params)
  },
  getUser(params) {
    return Gateway().get(`users/${params.username}`)
  },
  deleteUser(params) {
    return Gateway().delete(`users/${params.username}`)
  },
  login(params) {
    return Gateway().post('login', params)
  },
  logout() {
    return Gateway().post('logout')
  }
}
