'use client';
import React from 'react'
import { Modal } from 'flowbite-react';
import useDeleteTodo from '../hooks/use-delete-todo';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { authTokenHandler } from '../../../utils/constant';
import Loading from '../../common/components/Loading';
import ErrorBody from '../../common/components/ErrorBody';

type TDeleteTodoModalProps = {
  isOpenModal: boolean;
  title: string;
  todoId: string;
  setIsOpenModal: (value: boolean) => void;
}

const DeleteTodoModal: React.FC<TDeleteTodoModalProps> = (props) => {
  const deleteTodo = useDeleteTodo();
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

  const deleteHandler = (todoId: string) => {
    deleteTodo.mutate({
      todoId: todoId
    }, {
      onSuccess: (res) => {
        if (res.success) {
          reload();
          props.setIsOpenModal(false);
        } else {
          forceLogout();
        }
      },
      onError: () => {
        forceLogout();
      }
    })
  }

  return (
    <>
      <Modal size="sm" position="center" show={props.isOpenModal} onClose={() => props.setIsOpenModal(false)}>
        <Modal.Header>Delete TODO: <br /> {props.title} ?
          <br /> <span className='text-sm text-gray-400'>({props.todoId})</span>
        </Modal.Header>
        <Modal.Body>
          {!deleteTodo.isLoading && !deleteTodo.isError && (
            <div className='w-full'>
              <div className="mb-6">
                <p className='text-sm text-gray-500'>
                  Are you sure you want to delete your todo? Your data will be permanently removed. This action cannot be undone.
                </p>
              </div>
              <div className='flex items-center justify-between gap-5'>
                <button type='button' className='flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' onClick={() => props.setIsOpenModal(false)}>
                  Decline
                </button>
                <button onClick={() => deleteHandler(props.todoId)} type='submit' className='flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500' >Delete Todo</button>
              </div>
            </div>
          )}
          {deleteTodo.isLoading && <Loading />}
          {deleteTodo.isError && <ErrorBody />}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DeleteTodoModal