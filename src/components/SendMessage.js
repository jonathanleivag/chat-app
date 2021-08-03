import { useFormik } from 'formik'
import { useSelector } from 'react-redux'

export default function SendMessage () {
  const { socket } = useSelector(state => state.socket)
  const { id } = useSelector(state => state.authReducer)
  const { chatActive } = useSelector(state => state.chat)

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (value, actions) => {
      if (value.message.trim().length !== 0) {
        socket?.emit('send-message', {
          from: id,
          to: chatActive,
          message: value.message.trim()
        })
      }
      actions.resetForm()
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='type_msg row'>
        <div className='input_msg_write col-sm-9'>
          <input
            value={formik.values.message}
            onChange={formik.handleChange}
            type='text'
            id='message'
            name='message'
            className='write_msg'
            placeholder='Mensaje...'
            autoComplete='off'
          />
        </div>
        <div className='col-sm-3 text-center'>
          <button className='msg_send_btn mt-3' type='submit'>
            enviar
          </button>
        </div>
      </div>
    </form>
  )
}
