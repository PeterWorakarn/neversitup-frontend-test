import { useMutation } from 'react-query'
import { editTodoAPI } from '../api-action';

const useEditTodo = () => {
  return useMutation(editTodoAPI);
}

export default useEditTodo;