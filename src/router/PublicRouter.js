import { Redirect, Route } from 'react-router-dom'

export default function PublicRouter ({
  isLogin,
  component: Component,
  ...rest
}) {
  const handleComponent = props => {
    return !isLogin ? <Component {...props} /> : <Redirect to='/' />
  }
  return <Route {...rest} component={handleComponent} />
}
