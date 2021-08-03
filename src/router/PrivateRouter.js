import { Redirect, Route } from 'react-router-dom'

export default function PrivateRouter ({
  isLogin,
  component: Component,
  ...rest
}) {
  const handleComponent = props => {
    return isLogin ? <Component {...props} /> : <Redirect to='/auth' />
  }
  return <Route {...rest} component={handleComponent} />
}
