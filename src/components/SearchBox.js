import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'
import { purgeMessages } from '../redux/chatSlice'

export default function SearchBox () {
  const { name } = useSelector(state => state.authReducer)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(purgeMessages())
  }

  return (
    <>
      <div className='headind_srch'>
        <div className='recent_heading mt-2'>
          <h4>{name.split(' ')[0]}</h4>
        </div>
        <div className='srch_bar'>
          <div className='stylish-input-group'>
            <button onClick={handleLogout} className='btn text-danger'>
              Salir
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
