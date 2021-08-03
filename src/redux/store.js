import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import socketIoReducer from './socketIoSlice'
import chatReducer from './chatSlice'
import thunk from 'redux-thunk'

export default configureStore({
  reducer: { authReducer, socket: socketIoReducer, chat: chatReducer },
  middleware: [thunk]
})
