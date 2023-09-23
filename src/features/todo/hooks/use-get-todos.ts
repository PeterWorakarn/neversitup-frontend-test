import { useQuery } from 'react-query';
import { getTodosAPI } from '../api-action'

const useGetTodos = () => {
  return useQuery(
    ['get-todos'],
    () => getTodosAPI(),
  )
}

export default useGetTodos;