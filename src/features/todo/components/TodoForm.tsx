import { FormikProps } from 'formik'
import React from 'react'
import { TTodoBody } from '../api-action';
import ErrorMessageBody from '../../common/components/ErrorMessageBody';

type TTodoFormProps = {
  type: 'Create' | 'Edit';
  formik: FormikProps<TTodoBody>;
  setIsOpenModal: (value: boolean) => void;
}

const TodoForm: React.FC<TTodoFormProps> = (props) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className='w-full'>
      <div className="mb-6">
        <div className='w-full'>
          <label className='mb-2 block text-sm font-medium leading-6 text-gray-900' htmlFor='title'>
            Title
          </label>
          <input
            value={props.formik.values.title}
            onChange={props.formik.handleChange}
            onBlur={props.formik.handleBlur}
            className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            name='title' type="text"
          />
          {props.formik.touched.title && props.formik.errors.title
            && <ErrorMessageBody message={props.formik.errors.title} />}
        </div>
        <div className='w-full mt-4'>
          <label className='mb-2 block text-sm font-medium leading-6 text-gray-900' htmlFor='description'>
            Description
          </label>
          <textarea
            value={props.formik.values.description}
            onChange={props.formik.handleChange}
            onBlur={props.formik.handleBlur}
            rows={4}
            className='block resize-none w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            name='description'
          />
          {props.formik.touched.description && props.formik.errors.description
            && <ErrorMessageBody message={props.formik.errors.description} />}
        </div>
      </div>
      <div className='flex items-center justify-between gap-5'>
        <button type='button' className='flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' onClick={() => props.setIsOpenModal(false)}>
          Decline
        </button>
        <button onClick={() => props.formik.handleSubmit()} type='submit' className='flex w-full justify-center rounded-md bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm' >
          {props.type} Todo</button>
      </div>
    </form >


  )
}

export default TodoForm