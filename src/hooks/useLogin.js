import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RE_NEW_TOKEN, VERIFY_TOKEN } from '../apollo/gql/userGql'
import { scrollToBottomAnimated } from '../helpers/scrollToBottom'
import { reNewToken, varifyTokenAction } from '../redux/authSlice'
import { dataUsers, newMessage } from '../redux/chatSlice'
import { connectSocket, disconnectSocket } from '../redux/socketIoSlice'

export default function useLogin () {
  const { data } = useQuery(VERIFY_TOKEN)
  const { data: data0 } = useQuery(RE_NEW_TOKEN)
  const { socket } = useSelector(state => state.socket)
  const dispatch = useDispatch()
  const { logged } = useSelector(state => state.authReducer)

  useEffect(() => {
    if (data) {
      dispatch(varifyTokenAction(data.isLogin))
    }
  }, [dispatch, data])

  useEffect(() => {
    if (data0) {
      dispatch(reNewToken(data0.reNewToken))
    }
  }, [dispatch, data0])

  useEffect(() => {
    if (logged) {
      dispatch(connectSocket())
    }
  }, [dispatch, logged])

  useEffect(() => {
    if (!logged) {
      dispatch(disconnectSocket())
    }
  }, [dispatch, logged])

  useEffect(() => {
    if (logged) {
      socket?.on('get-users', users => {
        dispatch(dataUsers(users))
      })
    }
  }, [socket, dispatch, logged])

  useEffect(() => {
    socket?.on('send-message', message => {
      dispatch(newMessage(message))
      scrollToBottomAnimated('message')
    })
  }, [socket, dispatch, logged])

  return { ok: true }
}
