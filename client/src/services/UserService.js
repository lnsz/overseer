import Api from '@/services/Api'

export default {
  getStatus () {
    return Api().get('users')
  },

  createUser (params) {
    return Api().post('users', params)
  },

  updateUser (params) {
    return Api().put(`users/${params.username}`, params)
  },

  getUser (params) {
    return Api().get(`users/${params.username}`)
  },

  deleteUser (params) {
    return Api().delete(`users/${params.username}`)
  },

  login (params) {
    return Api().post('login', params)
  },

  logout (params) {
    return Api().post('logout', params)
  }
}
