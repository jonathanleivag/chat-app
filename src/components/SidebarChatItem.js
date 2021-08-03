import { useDispatch, useSelector } from 'react-redux'
import { chatActive } from '../redux/chatSlice'

export default function SidebarChatItem ({ user }) {
  const dispatch = useDispatch()
  const { chatActive: chatActive0 } = useSelector(state => state.chat)

  const handleChatActive = id => {
    dispatch(chatActive(id))
  }

  return (
    <>
      {user && (
        <div
          className={`chat_list ${chatActive0 === user._id && 'active_chat'}`}
          onClick={() => handleChatActive(user._id)}
        >
          <div className='chat_people'>
            <div className='chat_ib'>
              <h5>{user.name}</h5>
              {user.online && <span className='text-success'>Online</span>}
              {!user.online && <span className='text-danger'>Offline</span>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
