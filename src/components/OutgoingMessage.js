import hourMonth from '../helpers/hourMonth'

export default function OutgoingMessage ({ message }) {
  return (
    <>
      {message && (
        <div className='outgoing_msg'>
          <div className='sent_msg'>
            <p>{message.message}</p>
            <span className='time_date'> {hourMonth(message.createdAt)} </span>
          </div>
        </div>
      )}
    </>
  )
}
