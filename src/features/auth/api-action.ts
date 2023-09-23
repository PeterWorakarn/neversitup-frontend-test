import api, { APIResponse, TErrorResponse } from '../../utils/api';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string().email('Invalid email format.').required(
    'The username field is required.',
  ),
  password: Yup.string().required(
    'The password field is required.',
  ),
});

export type TLoginBody = {
  username: string,
  password: string
}

export type TLoginResponse = APIResponse & {
  data: {
    token: string
  }
}

export function loginAPI(
  body: TLoginBody
):Promise<TLoginResponse | TErrorResponse> {
  return api.post('/users/auth', {body}).then((res) => res as TLoginResponse | TErrorResponse)
}