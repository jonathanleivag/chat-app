import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

export default function hourMonth (date) {
  return moment(date).format('DD/MM/YYYY | HH:mm')
}
