import { useMutation } from 'react-query'
import { loginAPI } from '../api-action';

const useLogin = () => {
  return useMutation(loginAPI);
}

export default useLogin;