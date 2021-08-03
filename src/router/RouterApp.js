import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import ChatPage from './../pages/ChatPage'
import AuthRouter from './AuthRouter'
import { useSelector } from 'react-redux'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import useLogin from '../hooks/useLogin'

export default function RouterApp () {
  const { checking, logged } = useSelector(state => state.authReducer)
  useLogin()

  if (checking) {
    return <h1>Cargando....</h1>
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter isLogin={logged} path='/auth' component={AuthRouter} />
          <PrivateRouter isLogin={logged} exact path='/' component={ChatPage} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}
