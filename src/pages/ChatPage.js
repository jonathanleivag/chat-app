import { useSelector } from 'react-redux'
import ChatSelect from '../components/ChatSelect'
import InboxPeople from '../components/InboxPeople'
import Messages from '../components/Messages'
import '../css/chat.css'

export default function ChatPage () {
  const { chatActive } = useSelector(state => state.chat)
  return (
    <div className='messaging'>
      <div className='inbox_msg'>
        <InboxPeople />
        {!chatActive && <ChatSelect />}
        {chatActive && <Messages />}
      </div>
    </div>
  )
}
