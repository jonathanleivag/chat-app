import hourMonth from '../helpers/hourMonth'

export default function IncomingMessage ({ message }) {
  return (
    <>
      {message && (
        <div className='incoming_msg'>
          <div className='received_msg'>
            <div className='received_withd_msg'>
              <p>{message.message}</p>
              <span className='time_date'> {hourMonth(message.createdAt)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
