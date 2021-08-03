import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useState } from 'react'
import { loginActions } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'
import { LOGIN } from './../apollo/gql/userGql'
import Swal from 'sweetalert2'

export default function LoginPage () {
  const [checket, setChecket] = useState(false)
  const dispatch = useDispatch()
  const [login] = useMutation(LOGIN)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async value => {
      try {
        const { data } = await login({ variables: { loginInput: value } })
        dispatch(loginActions({ ...data.login, checket }))
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      }
    }
  })

  const handleChecked = () => {
    setChecket(!checket)
  }

  const handleButton = () => {
    let result = true
    if (formik.values.email === '' || formik.values.password === '') {
      result = false
    }
    return result
  }

  return (
    <form
      className='login100-form validate-form flex-sb flex-w'
      onSubmit={formik.handleSubmit}
    >
      <span className='login100-form-title mb-3'>Chat - Ingreso</span>
      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='email'
          name='email'
          placeholder='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <span className='focus-input100' />
      </div>
      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='ON'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <span className='focus-input100' />
      </div>
      <div className='row mb-3'>
        <div onClick={handleChecked} className='col'>
          <input
            className='input-checkbox100'
            id='ckb1'
            type='checkbox'
            name='remember-me'
            checked={checket}
            readOnly
          />
          <label className='label-checkbox100'>Recordarme</label>
        </div>
        <div className='col text-right'>
          <Link to='/auth/register' className='txt1'>
            Nueva cuenta?
          </Link>
        </div>
      </div>
      <div className='container-login100-form-btn m-t-17'>
        <button
          type={handleButton() ? 'submit' : 'button'}
          className='login100-form-btn'
          style={{ cursor: handleButton() ? 'pointer' : 'not-allowed' }}
          disabled={!handleButton()}
        >
          Ingresar
        </button>
      </div>
    </form>
  )
}
