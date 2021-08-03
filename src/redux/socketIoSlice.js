import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import storageEncrypt from '../helpers/storageEncrypt'

const socketIoSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: null
  },
  reducers: {
    connectSocket: state => {
      state.socket = io(process.env.REACT_APP_URI, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: {
          token: storageEncrypt.decrypt('token')
        }
      })
    },
    disconnectSocket: state => {
      if (state.socket) {
        state.socket.disconnect()
      }
    }
  }
})

export const { connectSocket, disconnectSocket } = socketIoSlice.actions

export default socketIoSlice.reducer
