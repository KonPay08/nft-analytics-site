import { ApiPath, ApiReqBodies, ApiResBodies } from 'src/shared/apiTypes';

const isServer = typeof window === 'undefined';
let API_URL: string | undefined;
API_URL = isServer ? process.env.SERVER_SIDE_API_URL : process.env.NEXT_PUBLIC_CLIENT_SIDE_API_URL;

export function getActionApi() {
  return {
    postRequest: async <T extends ApiPath>(path: T, body: ApiReqBodies[T]): Promise<ApiResBodies[T]> => {
      const response = await fetch(`${API_URL}/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        next: { revalidate: 60 }
      });
      
      if (!response.ok) {
        console.error("fetch error: ", response.statusText);
        return { success: false, errorCode: response.statusText } as unknown as ApiResBodies[T];
      }
      
      const data = await response.json();
      return data;
    },
    getRequest: async <T extends ApiPath>(path: T): Promise<ApiResBodies[T]> => {
      const response = await fetch(`${API_URL}/${path}`, {
        next: { revalidate: 0 }
      });
      
      if (!response.ok) {
        console.error("fetch error: ", response.statusText);
        return { success: false, errorCode: response.statusText } as unknown as ApiResBodies[T];
      }
      
      const data = await response.json();
      return data;
    }
  };
};
