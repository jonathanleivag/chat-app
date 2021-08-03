import { createSlice } from '@reduxjs/toolkit'
import storageEncrypt from '../helpers/storageEncrypt'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: storageEncrypt.decrypt('data')?.id || null,
    checking: true,
    logged: storageEncrypt.decrypt('data')
      ? storageEncrypt.decrypt('data').logged
      : false,
    name: storageEncrypt.decrypt('data')?.name || null,
    email: storageEncrypt.decrypt('data')?.email || null,
    token: storageEncrypt.decrypt('data')?.token || ''
  },
  reducers: {
    loginActions: (state, actions) => {
      state.id = actions.payload.data.id
      state.logged = true
      state.name = actions.payload.data.name
      state.email = actions.payload.data.email
      state.token = actions.payload.token

      if (actions.payload.checket) {
        storageEncrypt.encrypt('data', state)
      }

      storageEncrypt.encrypt('token', actions.payload.token)
      state.checking = false
    },
    varifyTokenAction: (state, actions) => {
      if (actions.payload) {
        state.checking = false
      } else {
        storageEncrypt.remove('token')
        storageEncrypt.remove('data')

        state.id = null
        state.checking = false
        state.logged = false
        state.name = null
        state.email = null
        state.token = ''
      }
    },
    logout: state => {
      storageEncrypt.remove('token')
      storageEncrypt.remove('data')

      state.id = null
      state.checking = false
      state.logged = false
      state.name = null
      state.email = null
      state.token = ''
    },
    reNewToken: (state, actions) => {
      if (storageEncrypt.decrypt('data')) {
        state.id = actions.payload.user.id
        state.logged = true
        state.name = actions.payload.user.name
        state.email = actions.payload.user.email
        state.token = actions.payload.token
        storageEncrypt.encrypt('data', state)
      }
      storageEncrypt.encrypt('token', actions.payload.token)
      state.checking = false
    }
  }
})

export const {
  loginActions,
  logout,
  varifyTokenAction,
  reNewToken
} = authSlice.actions

export default authSlice.reducer
