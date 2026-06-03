import { APIRequestContext } from "@playwright/test";
import {
  DeleteObjectResponse,
  GetObjectResponse,
  PostObjectRequest,
  PostObjectResponse,
  PutObjectRequest,
  PutObjectResponse,
} from "../types/api/restful-api";

const apiUrl = "https://api.restful-api.dev/objects";

export async function getAllObjects(
  request: APIRequestContext,
): Promise<{ statusCode: Number; response: GetObjectResponse[] }> {
  const response = await request.get(apiUrl);
  return { statusCode: response.status(), response: await response.json() };
}

export async function getObjectById(
  request: APIRequestContext,
  id: string,
): Promise<{ statusCode: Number; response: GetObjectResponse }> {
  const response = await request.get(`${apiUrl}/${id}`);
  return { statusCode: response.status(), response: await response.json() };
}

export async function postObject(
  request: APIRequestContext,
  data: PostObjectRequest,
): Promise<{ statusCode: Number; response: PostObjectResponse }> {
  const response = await request.post(apiUrl, { data });
  return { statusCode: response.status(), response: await response.json() };
}

export async function putObject(
  request: APIRequestContext,
  id: string,
  data: PutObjectRequest,
): Promise<{ statusCode: Number; response: PutObjectResponse }> {
  const response = await request.put(`${apiUrl}/${id}`, { data });
  return { statusCode: response.status(), response: await response.json() };
}

export async function deleteObject(
  request: APIRequestContext,
  id: string,
): Promise<{ statusCode: Number; response: DeleteObjectResponse }> {
  const response = await request.delete(`${apiUrl}/${id}`);
  return { statusCode: response.status(), response: await response.json() };
}
