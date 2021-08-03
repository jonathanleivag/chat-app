import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadMessages } from '../redux/chatSlice'
import IncomingMessage from './IncomingMessage'
import OutgoingMessage from './OutgoingMessage'
import SendMessage from './SendMessage'
import { useLazyQuery } from '@apollo/client'
import { GET_MESSAGES } from './../apollo/gql/messageGql'
import { scrollToBottomAnimated } from '../helpers/scrollToBottom'

export default function Messages () {
  const { messages } = useSelector(state => state.chat)
  const { chatActive } = useSelector(state => state.chat)
  const { id } = useSelector(state => state.authReducer)

  const dispatch = useDispatch()
  const [getChat, { data }] = useLazyQuery(GET_MESSAGES, {
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (chatActive) {
      getChat({
        variables: { getChatInput: { from: chatActive } }
      })
    }
  }, [dispatch, chatActive, getChat])

  useEffect(() => {
    if (data?.getChat.length > 0) {
      dispatch(uploadMessages(data.getChat.reverse()))
      setTimeout(() => {
        scrollToBottomAnimated('message')
      }, 250)
    }
  }, [data, dispatch])

  return (
    <>
      <div className='mesgs'>
        <div className='msg_history' id='message'>
          {messages.map(message => {
            if (message.to === id) {
              return <IncomingMessage message={message} key={message.id} />
            } else {
              return <OutgoingMessage message={message} key={message.id} />
            }
          })}
        </div>
        <SendMessage />
      </div>
    </>
  )
}
