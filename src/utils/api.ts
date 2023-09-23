import { authTokenHandler } from './constant';

type TOption = {
  headers?: RequestInit['headers'];
  body?: Record<string, any>;
  formData?: FormData;
};

export type TErrorResponse = {
  success: false;
  message: string;
}

export type APIResponse = {
  success: true;
}

const defaultErrorResponse: TErrorResponse = {
  success: false,
  message: 'Something went wrong'
}
const authErrorResponse: TErrorResponse = {
  success: false,
  message: 'Unauthorized'
}

const apiBaseUrl = 'https://candidate.neversitup.com/todo';

async function processFetch(res:Response): Promise<APIResponse & {[key: string]: any} | TErrorResponse> {
  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    if (res.status === 401) {
      // TODO: Unauthorize here
      throw authErrorResponse
    }
    throw defaultErrorResponse
  }
  if (contentType?.includes('application/json')) {
    const payload = await res.json();
    return {
      success: true,
      data: payload
    };
  }
  
  throw defaultErrorResponse
}

const processCatch = (e:TErrorResponse): TErrorResponse => {
  return {
    success: false,
    message: e.message ?? defaultErrorResponse.message
  }
}

const api = {
  get: (url: string, option: TOption = {}): Promise<APIResponse & {[key: string]: any} | TErrorResponse> => {
    const {headers = {}} = option;
    const token =  authTokenHandler.get() // get token here
    const fetchUrl = `${apiBaseUrl}${url}`;
    const fetchParams: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}`} : {}),
      },
    };
    
    return fetch(fetchUrl, {
      ...fetchParams,
    }).then((res) => processFetch(res)).catch((e) => processCatch(e))
  },
  post: (url: string, option: TOption = {}): Promise<APIResponse & {[key: string]: any} | TErrorResponse> => {
    const {headers = {}, body = {}} = option;
    const token =  authTokenHandler.get() // get token here
    const fetchUrl = `${apiBaseUrl}${url}`;
    const fetchParams: RequestInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}`} : {}),
      },
      body: JSON.stringify(body),
    };
    
    return fetch(fetchUrl, {
      ...fetchParams,
    }).then((res) => processFetch(res)).catch((e) => processCatch(e))
  },
  put: (url: string, option: TOption = {}): Promise<APIResponse & {[key: string]: any} | TErrorResponse> => {
    const {headers = {}, body = {}} = option;
    const token =  authTokenHandler.get() // get token here
    const fetchUrl = `${apiBaseUrl}${url}`;
    const fetchParams: RequestInit = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}`} : {}),
      },
      body: JSON.stringify(body),
    };
    
    return fetch(fetchUrl, {
      ...fetchParams,
    }).then((res) => processFetch(res)).catch((e) => processCatch(e))
  },
  delete: (url: string, option: TOption = {}): Promise<APIResponse & {[key: string]: any} | TErrorResponse> => {
    const {headers = {}} = option;
    const token =  authTokenHandler.get() // get token here
    const fetchUrl = `${apiBaseUrl}${url}`;
    const fetchParams: RequestInit = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}`} : {}),
      },
    };
    
    return fetch(fetchUrl, {
      ...fetchParams,
    }).then((res) => processFetch(res)).catch((e) => processCatch(e))
  },
}

export default api;