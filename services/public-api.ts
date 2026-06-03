import { APIRequestContext } from "@playwright/test";
import {
  GetObjectResponse,
  PostObjectRequest,
  PostObjectResponse,
  PutObjectRequest,
  PutObjectResponse,
  DeleteObjectResponse,
} from "../types/api/restful-api";

const apiUrl = "https://api.restful-api.dev/objects";

export class ApiTestEndpoint {
  constructor(private readonly apiRequest: APIRequestContext) {}

  async getAllObjects(): Promise<{
    statusCode: Number;
    response: GetObjectResponse[];
  }> {
    const response = await this.apiRequest.get(apiUrl);
    return { statusCode: response.status(), response: await response.json() };
  }

  async getObjectById(
    id: string,
  ): Promise<{ statusCode: Number; response: GetObjectResponse }>;
  async getObjectById(
    id: string,
    statusCode: number,
  ): Promise<{ statusCode: Number; response: string }>;

  async getObjectById(
    id: string,
    statusCode: number = 200,
  ): Promise<
    | { statusCode: Number; response: GetObjectResponse }
    | { statusCode: Number; response: string }
  > {
    const response = await this.apiRequest.get(`${apiUrl}/${id}`);
    if (statusCode === 200) {
      return { statusCode: response.status(), response: await response.json() };
    } else {
      return { statusCode: response.status(), response: await response.text() };
    }
  }

  async postObject(
    data: PostObjectRequest,
  ): Promise<{ statusCode: Number; response: PostObjectResponse }>;

  async postObject(
    data: PostObjectRequest,
    statusCode: number,
  ): Promise<{ statusCode: Number; response: string }>;

  async postObject(
    data: PostObjectRequest,
    statusCode: number = 200,
  ): Promise<
    | { statusCode: Number; response: PostObjectResponse }
    | { statusCode: Number; response: string }
  > {
    const response = await this.apiRequest.post(apiUrl, { data });
    if (statusCode === 200) {
      return { statusCode: response.status(), response: await response.json() };
    } else {
      return { statusCode: response.status(), response: await response.text() };
    }
  }

  async putObject(
    id: string,
    data: PutObjectRequest,
  ): Promise<{ statusCode: Number; response: PutObjectResponse }>;
  async putObject(
    id: string,
    data: PutObjectRequest,
    statusCode: number,
  ): Promise<{ statusCode: Number; response: string }>;

  async putObject(
    id: string,
    data: PutObjectRequest,
    statusCode: number = 200,
  ): Promise<
    | { statusCode: Number; response: PutObjectResponse }
    | { statusCode: Number; response: string }
  > {
    const response = await this.apiRequest.put(`${apiUrl}/${id}`, { data });
    if (statusCode === 200) {
      return { statusCode: response.status(), response: await response.json() };
    } else {
      return { statusCode: response.status(), response: await response.text() };
    }
  }

  async deleteObject(
    id: string,
  ): Promise<{ statusCode: Number; response: DeleteObjectResponse }>;
  async deleteObject(
    id: string,
    statusCode: number,
  ): Promise<{ statusCode: Number; response: string }>;

  async deleteObject(
    id: string,
    statusCode: number = 200,
  ): Promise<
    | { statusCode: Number; response: DeleteObjectResponse }
    | { statusCode: Number; response: string }
  > {
    const response = await this.apiRequest.delete(`${apiUrl}/${id}`);
    if (statusCode === 200) {
      return { statusCode: response.status(), response: await response.json() };
    } else {
      return { statusCode: response.status(), response: await response.text() };
    }
  }
}
