import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { TLoginBody, validationSchema } from '../features/auth/api-action'
import useLogin from '../features/auth/hooks/use-login'
import { authTokenHandler } from '../utils/constant'
import { useRouter } from 'next/router'
import Loading from '../features/common/components/Loading'
import ErrorBody from '../features/common/components/ErrorBody'
import ErrorMessageBody from '../features/common/components/ErrorMessageBody'

const LoginPage: React.FC = () => {
  const router = useRouter();
  const login = useLogin();
  const pushDefaultPage = () => {
    router.push('/');
  };
  const formik = useFormik<TLoginBody>({
    initialValues: {
      username: '', // bivigig582@bnovel.com
      password: '' // 123456789
    },
    onSubmit: (values: TLoginBody) => {
      login.mutate(values, {
        onSuccess: (res) => {
          if (res.success) {
            authTokenHandler.set(res.data.token);
            pushDefaultPage();
          } else {
            router.reload();
          }
        },
        onError: () => {
          router.reload();
        }
      })
    },
    validationSchema
  })

  useEffect(() => {
    if (authTokenHandler.get()) {
      pushDefaultPage();
    }
  }, [])


  return (
    <>
      <title>Login </title>
      <section className='w-full h-screen flex items-center justify-center container mx-auto p-6'>
        <div className='max-w-[450px] w-full mx-auto'>

          {!login.isLoading && !login.isError && (
            <>
              <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Login to your account</h1>
              <form className='w-full' onSubmit={(e) => e.preventDefault()}>
                <div className='w-full mt-4'>
                  <label className='mb-2 block text-sm font-semibold leading-6 text-gray-900' htmlFor='username'>
                    Username
                  </label>
                  <input
                    className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    name='username' type="text"
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.username && formik.errors.username && <ErrorMessageBody message={formik.errors.username} />}
                </div>
                <div className='w-full mt-4'>

                  <label className='mb-2 block text-sm font-semibold leading-6 text-gray-900' htmlFor='password'>
                    Password
                  </label>
                  <input
                    className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    name='password' type="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password && <ErrorMessageBody message={formik.errors.password} />}
                </div>



                <button
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10 disabled:opacity-50'
                  onClick={() => formik.handleSubmit()}
                  type='submit'
                >Login</button>
              </form>
            </>
          )}

          {login.isLoading && <Loading />}
          {login.isError && <ErrorBody />}
        </div>
      </section>
    </>
  )
}

export default LoginPage