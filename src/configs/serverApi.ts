import { OutgoingHttpHeader } from "http";
import { BACKEND_URL } from "./constant";
import { IPaging } from "@/types/product";

type methodType = "GET" | "POST";
export const defaultHeaders = {
  Accept: "application/json",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
  "Content-Type": "application/json",
  // "Cache-Control": "max-age=<1000>"
};

export type APIResponse<T = any> = {
  success: boolean;
  result: T;
  paging?: IPaging;
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

export const serverRequest = async (url: string, method: methodType, data: any, cache: RequestCache = "default") => {
  const response = await fetch(`${BACKEND_URL}/${url}`, {
    method: method,
    headers: { ...defaultHeaders },
    body: data ? JSON.stringify(data) : undefined,
    cache: cache,
  });
  const result = await checkStatus(response);
  return parseJSON(result);
};
