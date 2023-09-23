import { useQuery } from 'react-query';
import { getTodoByIdAPI } from '../api-action';

const useGetTodoById = (todoId: string) => {
  return useQuery(
    ['get-todo-by-id', todoId],
    () => getTodoByIdAPI(todoId),
  )
}

export default useGetTodoById;