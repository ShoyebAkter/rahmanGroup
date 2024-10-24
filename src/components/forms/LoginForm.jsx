import React from 'react'
import { Form, ErrorMessage, Field, useFormikContext} from 'formik'

const LoginForm = ({loading}) => {
  const {touched, dirty, isValid, errors} = useFormikContext()
  const labelStyle = "md:text-lg text-md px-1 font-bold"

  return (
    <div className='w-full p-3 overflow-auto'>
        <Form className='overflow-auto'>
            <div className='gap-1 flex flex-col items-start p-2 w-full' >
                <label htmlFor=""
                    className={labelStyle}
                >
                    Email Address * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='email'/>
                </div>
                <Field
                    name="email"
                    id="email"
                    type='email'
                    className={ touched.email && errors.email ?
                    "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
                    "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
                    }
                    autoComplete="off"
                />
            </div>
            <div className='gap-1 flex flex-col items-start p-2 w-full' >
                <label htmlFor=""
                    className={labelStyle}
                >
                    Password * :
                </label>
                <div className='flex w-full animate-pulse flex-row items-end text-red-900 font-medium justify-end px-2'>
                    <ErrorMessage name='passwd'/>
                </div>
                <Field
                    name="passwd"
                    id="passwd"
                    type='password'
                    className={ touched.passwd && errors.passwd ?
                    "w-full p-3 rounded-lg px-5 text-red-800 border-2 border-red-500" :
                    "w-full p-3 rounded-lg px-5 text-black border-2 border-gray-300"
                    }
                    autoComplete="off"
                />
            </div>


            <div className='w-full flex flex-col items-end justify-center font-bold mt-3'>
                <button 
                    type='submit'
                    className={
                    !(dirty && isValid) ? 
                    "border-0 p-2 bg-gray-300 bg-opacity-80 text-gray-400 rounded-xl px-5 mr-2"
                    : 'border-0 p-3 bg-green-600 bg-opacity-60 text-white rounded-xl px-5 mr-2 w-fu'
                    }>

                        
                      {
                        loading ? 'Authenticating ... ' :
                        'Go'
                      }
                   
                </button>
            </div> 
        </Form>
    </div>
  )
}

export default LoginForm
