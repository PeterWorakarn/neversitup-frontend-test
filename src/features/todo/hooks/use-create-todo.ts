import { useMutation } from 'react-query'
import { createTodoAPI } from '../api-action';

const useCreateTodo = () => {
  return useMutation(createTodoAPI);
}

export default useCreateTodo;