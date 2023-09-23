import React from 'react'
import { TTodoBody, validationSchema } from '../api-action'
import { useFormik } from 'formik'
import TodoForm from './TodoForm'

type TTodoFormContainerProps = {
  type: 'Edit'
  initialValue: TTodoBody
  submitPayload: (data: TTodoBody) => void;
  setIsOpenModal: (value: boolean) => void;
} | {
  type: 'Create'
  submitPayload: (data: TTodoBody) => void;
  setIsOpenModal: (value: boolean) => void;
}

const defaultInitialValue = {
  title: '',
  description: ''
}

const TodoFormContainer: React.FC<TTodoFormContainerProps> = (props) => {
  const formik = useFormik<TTodoBody>({
    initialValues: props.type === 'Create' ? defaultInitialValue : props.initialValue,
    onSubmit: (values: TTodoBody) => {
      props.submitPayload(values)
    },
    validationSchema
  })

  return (
    <TodoForm type={props.type} formik={formik} setIsOpenModal={(value) => props.setIsOpenModal(false)} />
  )
}

export default TodoFormContainer