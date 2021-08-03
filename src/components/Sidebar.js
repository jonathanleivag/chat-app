import SidebarChatItem from './SidebarChatItem'
import { useSelector } from 'react-redux'

export default function Sidebar () {
  const { users } = useSelector(state => state.chat)
  const { id } = useSelector(state => state.authReducer)
  return (
    <>
      <div className='inbox_chat'>
        {users
          ?.filter(user => user._id !== id)
          .map(user => (
            <SidebarChatItem key={user._id} user={user} />
          ))}
        <SidebarChatItem />
        <div className='extra_space' />
      </div>
    </>
  )
}
