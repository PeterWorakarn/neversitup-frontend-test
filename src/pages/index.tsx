import type { NextPage } from 'next'
import { withPageAuth } from '../features/common/with-page-auth'
import useGetTodos from '../features/todo/hooks/use-get-todos';
import { useState } from 'react';
import CreateTodoModal from '../features/todo/components/CreateTodoModal';
import { authTokenHandler } from '../utils/constant';
import { useRouter } from 'next/router';
import Loading from '../features/common/components/Loading';
import ErrorBody from '../features/common/components/ErrorBody';
import DeleteTodoModal from '../features/todo/components/DeleteTodoModal';
import EditTodoModal from '../features/todo/components/EditTodoModal';


type TTodoMode = {
  mode: 'CREATE'
} | {
  mode: 'EDIT',
  title: string,
  todoId: string,
} | {
  mode: 'DELETE',
  title: string,
  todoId: string,
} | {
  mode: 'VIEW'
}

const defaultTodoMode: TTodoMode = { mode: 'VIEW' }

const Home: NextPage = () => {
  const [todoMode, setTodoMode] = useState<TTodoMode>(defaultTodoMode);
  const getTodos = useGetTodos();
  const router = useRouter();

  const logoutHandler = () => {
    authTokenHandler.clear()
    router.push('/login')
  }

  if (getTodos.isError || (getTodos.isSuccess && !getTodos.data.success)) {
    logoutHandler();
  }


  return (
    <>
      <title>TODO App</title>
      <section className='w-full h-full flex flex-col gap-5 items-center justify-center container mx-auto px-6 pt-6'>
        <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>TODO App</h1>
        <div className={`max-w-[450px] min-h-[65vh] flex flex-col-reverse gap-2 w-full bg-slate-100 h-full rounded-md mx-auto p-2
        ${getTodos.isSuccess && getTodos.data.success && !getTodos.data.data.length ? 'justify-center' : 'justify-end'}
        `}>
          {getTodos.isSuccess && getTodos.data.success && getTodos.data.data.map((eachTodo) => {
            return (
              <article
                onClick={() => {
                  setTodoMode({ mode: 'EDIT', todoId: eachTodo._id, title: eachTodo.title })
                }}
                key={eachTodo._id}
                className='px-2.5 relative cursor-pointer pt-5 pb-2.5 rounded-md shadow-sm bg-white'
              >
                <button onClick={(e) => {
                  e.stopPropagation()
                  setTodoMode({ mode: 'DELETE', todoId: eachTodo._id, title: eachTodo.title })
                }} type="button" className="absolute top-1 right-0 p-3 focus-visible:outline-offset-[-4px]">
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                  </svg>
                </button>
                <h2 className='text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>{eachTodo.title}</h2>
                <p className='mt-1.5 line-clamp-3 text-sm leading-6 text-gray-600'>{eachTodo.description}</p>
                <div className='mt-1 w-full text-right text-gray-500 text-xs'>{(new Date(eachTodo.updatedAt)).toLocaleString('en-us')}</div>
              </article>
            )
          })}
          {getTodos.isSuccess && getTodos.data.success && !getTodos.data.data.length && (
            <div className='w-full h-full flex items-center text-center justify-center'>
              <p className='text-gray-400 text-center text-xl font-normal'>
                No TODO found,
                <br />
                <span className='text-sm block mt-1 font-normal'>Try click Create TODO to create new todo.</span>
              </p>
            </div>
          )}
          {getTodos.isLoading && <Loading />}
          {getTodos.isError && <ErrorBody />}
        </div>
        <section className='sticky bottom-0 w-full flex items-center justify-center px-6 pt-6 pb-2.5 bg-white shadow-t-md'>
          <div className='flex flex-col gap-1 w-fit'>
            <button
              onClick={() => setTodoMode({ mode: 'CREATE' })}
              className='inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className='w-5 h-5'><path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"></path></svg>
              Create TODO</button>
            <button
              onClick={() => logoutHandler()}
              className='mt-1 text-center text-xs text-gray-500' type="button">
              Log out</button>
          </div>
        </section>
      </section>
      {todoMode.mode === 'CREATE' && (
        <CreateTodoModal
          isOpenModal={todoMode.mode === 'CREATE'}
          setIsOpenModal={(value) => !value && setTodoMode(defaultTodoMode)}
        />
      )}
      {todoMode.mode === 'DELETE' && (
        <DeleteTodoModal
          isOpenModal={todoMode.mode === 'DELETE'}
          setIsOpenModal={(value) => !value && setTodoMode(defaultTodoMode)}
          todoId={todoMode.todoId}
          title={todoMode.title}
        />
      )}
      {todoMode.mode === 'EDIT' && (
        <EditTodoModal
          isOpenModal={todoMode.mode === 'EDIT'}
          setIsOpenModal={(value) => !value && setTodoMode(defaultTodoMode)}
          todoId={todoMode.todoId}
          title={todoMode.title}
        />
      )}

    </>
  )
}

export default withPageAuth(Home)
