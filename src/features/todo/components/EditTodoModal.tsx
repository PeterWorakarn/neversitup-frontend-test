'use client';
import React from 'react'
import { Modal } from 'flowbite-react';
import useGetTodoById from '../hooks/use-get-todo-by-id';
import Loading from '../../common/components/Loading';
import ErrorBody from '../../common/components/ErrorBody';
import TodoForm from './TodoForm';
import TodoFormContainer from './TodoFormContainer';
import { TTodoBody } from '../api-action';
import useEditTodo from '../hooks/use-edit-todo';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { authTokenHandler } from '../../../utils/constant';

type TEditTodoModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  title: string;
  todoId: string;
}

const EditTodoModal: React.FC<TEditTodoModalProps> = (props) => {
  const getTodoById = useGetTodoById(props.todoId);
  const editTodo = useEditTodo();
  const queryClient = useQueryClient();
  const router = useRouter();
  const forceLogout = () => {
    authTokenHandler.clear()
    router.push('/login')
  }
  const reload = async () => {
    await queryClient.invalidateQueries(['get-todo-by-id']);
    await queryClient.invalidateQueries(['get-todos']);
  };

  const handleEdit = (values: TTodoBody) => {
    editTodo.mutate({ ...values, todoId: props.todoId }, {
      onSuccess: (res) => {
        if (res.success) {
          reload();
          props.setIsOpenModal(false);
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
        <Modal.Header>Edit TODO: <br /> {props.title} ?
          <br /> <span className='text-sm text-gray-400'>({props.todoId})</span>
        </Modal.Header>

        <Modal.Body>
          {!getTodoById.isLoading && !getTodoById.isError && (getTodoById.isSuccess && getTodoById.data.success) && (
            <TodoFormContainer
              type='Edit'
              initialValue={getTodoById.data.data}
              setIsOpenModal={(value) => props.setIsOpenModal(false)}
              submitPayload={(values) => handleEdit(values)} />
          )}
          {getTodoById.isLoading && <Loading />}
          {getTodoById.isError && <ErrorBody />}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditTodoModal