import api, { APIResponse, TErrorResponse } from '../../utils/api';
import * as Yup from 'yup';

export type TTodo = {
  _id: string,
  title: string,
  description: string,
  user_id: string,
  createdAt: string,
  updatedAt: string,
}

export type TTodoBody = {
  title: string,
  description: string,
}

type TTodosResponse = {
  data: TTodo[];
} & APIResponse;

type TTodoResponse = {
  data: TTodo;
} & APIResponse;

export const validationSchema = Yup.object().shape({
  title: Yup.string().required(
    'The title field is required.',
  ),
  description: Yup.string().required(
    'The description field is required.',
  ),
});

export function getTodosAPI():Promise<TTodosResponse | TErrorResponse> {
  return api.get('/todos').then((res) => res as TTodosResponse | TErrorResponse)
}

export function getTodoByIdAPI(todoId:string):Promise<TTodoResponse | TErrorResponse> {
  return api.get(`/todos/${todoId}`).then((res) => res as TTodoResponse | TErrorResponse)
}

export function createTodoAPI(body: TTodoBody): Promise<TTodoResponse | TErrorResponse> {
  return api.post('/todos', {body}).then((res) => res as TTodoResponse | TErrorResponse)
}

export function editTodoAPI(body: TTodoBody & {todoId: string}): Promise<APIResponse | TErrorResponse> {
  return api.put(`/todos/${body.todoId}`, {body}).then((res) => res as APIResponse | TErrorResponse)
}

export function deleteTodoByIdAPI(body: {todoId:string}):Promise<APIResponse | TErrorResponse> {
  return api.delete(`/todos/${body.todoId}`).then((res) => res as APIResponse | TErrorResponse)
}