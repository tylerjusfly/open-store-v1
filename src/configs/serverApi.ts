import { BACKEND_URL } from "./constant";

type methodType = "GET" | "POST";
export const defaultHeaders = {
  Accept: "application/json",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
  "Content-Type": "application/json",
};

export type APIResponse<T = any> = {
  success: boolean;
  result: T;
};

export const parseJSON = (response: any): APIResponse => response.json();

export const checkStatus = async (response: any) => {
  if (!response.ok) {
    const message = await response.text();

    const err = JSON.parse(message);
    throw Object.freeze({ message: err.message || err.error });
  }

  return response;
};

export const serverRequest = async (url: string, method: methodType, data: any) => {
  const response = await fetch(`${BACKEND_URL}/${url}`, {
    method: method,
    headers: { ...defaultHeaders },
    body: data ? JSON.stringify(data) : undefined,
  });
  const result = await checkStatus(response);
  return parseJSON(result);
};
