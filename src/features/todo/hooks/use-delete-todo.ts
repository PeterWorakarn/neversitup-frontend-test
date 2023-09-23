import { useMutation } from 'react-query'
import { deleteTodoByIdAPI, editTodoAPI } from '../api-action';

const useDeleteTodo = () => {
  return useMutation(deleteTodoByIdAPI);
}

export default useDeleteTodo;