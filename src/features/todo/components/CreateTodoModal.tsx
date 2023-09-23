'use client';
import React from 'react'
import { Modal } from 'flowbite-react';
import useCreateTodo from '../hooks/use-create-todo';
import { useFormik } from 'formik';
import { TTodoBody } from '../api-action';
import { useRouter } from 'next/router';
import { authTokenHandler } from '../../../utils/constant';
import { useQueryClient } from 'react-query';
import Loading from '../../common/components/Loading';
import ErrorBody from '../../common/components/ErrorBody';
import TodoForm from './TodoForm';
import TodoFormContainer from './TodoFormContainer';

type TCreateTodoProps = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}

const CreateTodoModal: React.FC<TCreateTodoProps> = (props) => {
  const createTodo = useCreateTodo();
  const queryClient = useQueryClient();
  const router = useRouter();
  const forceLogout = () => {
    authTokenHandler.clear()
    router.push('/login')
  }
  const reload = async () => {
    await queryClient.invalidateQueries(['get-todos']);
  };

  const handleCreate = (values: TTodoBody) => {
    createTodo.mutate(values, {
      onSuccess: (res) => {
        if (res.success) {
          props.setIsOpenModal(false);
          reload();
        } else {
          forceLogout()
        }
      },
      onError: () => {
        forceLogout()
      }
    })
  }
  return (
    <>
      <Modal size="sm" position="center" show={props.isOpenModal} onClose={() => props.setIsOpenModal(false)}>
        <Modal.Header>Create TODO</Modal.Header>
        <Modal.Body>
          {!createTodo.isLoading && !createTodo.isError && (
            <TodoFormContainer
              type='Create'
              setIsOpenModal={(value) => props.setIsOpenModal(false)}
              submitPayload={(values) => handleCreate(values)} />
          )}
          {createTodo.isLoading && <Loading />}
          {createTodo.isError && <ErrorBody />}
        </Modal.Body>
      </Modal >
    </>
  )
}

export default CreateTodoModal