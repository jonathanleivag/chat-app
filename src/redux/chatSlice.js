import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    id: '',
    chatActive: null,
    users: [],
    messages: []
  },
  reducers: {
    dataUsers: (state, actions) => {
      state.users = actions.payload
    },
    chatActive: (state, actions) => {
      if (actions.payload !== state.chatActive) {
        state.messages = []
      }
      state.chatActive = actions.payload
    },
    newMessage: (state, actions) => {
      if (
        actions.payload.to === state.chatActive ||
        actions.payload.from === state.chatActive
      ) {
        state.messages = [...state.messages, actions.payload]
      }
    },
    uploadMessages: (state, actions) => {
      state.messages = [...actions.payload]
    },
    purgeMessages: state => {
      state.id = ''
      state.chatActive = null
      state.users = []
      state.messages = []
    }
  }
})

export const {
  dataUsers,
  chatActive,
  newMessage,
  uploadMessages,
  purgeMessages
} = chatSlice.actions

export default chatSlice.reducer
