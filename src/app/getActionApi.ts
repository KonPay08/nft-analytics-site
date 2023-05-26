import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiPath, ApiReqBodies, ApiResBodies } from 'src/shared/apiTypes';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function createAxiosInstance() {
  const config: AxiosRequestConfig = { baseURL: API_URL }
  const instance = axios.create(config);
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      console.error("axios error: ", error);
      return { data: { success: false, errorCode: error.code } };
    }
  );
  return instance;
};

export function getActionApi() {
  const getAxiosInstance = createAxiosInstance();
  return {
    postRequest: async <T extends ApiPath>(path: T, body: ApiReqBodies[T]): Promise<ApiResBodies[T]> => {
      const { data } = await getAxiosInstance.post<ApiResBodies[T]>(path, body);
      return data;
    },
    getRequest: async <T extends ApiPath>(path: T): Promise<ApiResBodies[T]> => {
      const { data } = await getAxiosInstance.get<ApiResBodies[T]>(path);
      return data;
    }
  };
};
