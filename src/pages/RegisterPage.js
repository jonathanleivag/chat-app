import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../apollo/gql/userGql'
import { useDispatch } from 'react-redux'
import { loginActions } from '../redux/authSlice'
import Swal from 'sweetalert2'
import { useState } from 'react'

export default function RegisterPage () {
  const [createUser] = useMutation(CREATE_USER)
  const dispatch = useDispatch()
  const [checket, setChecket] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password0: ''
    },
    onSubmit: async value => {
      try {
        const { data } = await createUser({
          variables: { createUserInput: value }
        })
        dispatch(loginActions({ ...data.createUser, checket }))
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        })
      }
    }
  })

  const handleButton = () => {
    let result = true
    if (
      formik.values.name === '' ||
      formik.values.email === '' ||
      formik.values.password === '' ||
      formik.values.password0 === ''
    ) {
      result = false
    }
    return result
  }

  const handleChecked = () => {
    setChecket(!checket)
  }

  return (
    <form
      className='login100-form validate-form flex-sb flex-w'
      onSubmit={formik.handleSubmit}
    >
      <span className='login100-form-title mb-3'>Chat - Register</span>
      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='text'
          name='name'
          placeholder='Name'
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <span className='focus-input100' />
      </div>
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
      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='password'
          name='password0'
          placeholder='Repeat password'
          autoComplete='ON'
          value={formik.values.password0}
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
          <Link to='/auth/login' className='txt1'>
            Ya tienes cuenta?
          </Link>
        </div>
      </div>
      <div className='container-login100-form-btn m-t-17'>
        <button
          type={handleButton() ? 'submit' : 'button'}
          className='login100-form-btn'
          disabled={!handleButton()}
          style={{ cursor: handleButton() ? 'pointer' : 'not-allowed' }}
        >
          Crear cuenta
        </button>
      </div>
    </form>
  )
}
