import { APIRequestContext, APIResponse } from "@playwright/test";
import {
  GetObjectResponse,
  PostObjectRequest,
  PostObjectResponse,
  PutObjectRequest,
  PutObjectResponse,
  DeleteObjectResponse,
} from "../types/api/restful-api";

type EndPointParams = {
  id?: string;
  data?: PostObjectRequest | PutObjectRequest;
};

const apiUrl = "https://api.restful-api.dev/objects";

export class ApiTestEndpoint {
  constructor(private readonly apiRequest: APIRequestContext) { }

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

  async testingApiEndpoint(endPointType: "get", queryData: EndPointParams): Promise<{ statusCode: number; response: GetObjectResponse }>;
  async testingApiEndpoint(endPointType: "post", queryData: EndPointParams): Promise<{ statusCode: number; response: PostObjectResponse }>;
  async testingApiEndpoint(endPointType: "put", queryData: EndPointParams): Promise<{ statusCode: number; response: PutObjectResponse }>;
  async testingApiEndpoint(endPointType: "delete", queryData: EndPointParams): Promise<{ statusCode: number; response: DeleteObjectResponse }>;

  async testingApiEndpoint(
    endPointType: "get" | "post" | "put" | "delete",
    queryData: EndPointParams,
    statusCode?: number,
  ): Promise<{ statusCode: number; response: string }>;

  async testingApiEndpoint(
    endPointType: "get" | "post" | "put" | "delete",
    queryData: EndPointParams,
    statusCode: number = 200,
  ): Promise<
      { statusCode: number; response: GetObjectResponse }
    | { statusCode: number; response: PostObjectResponse }
    | { statusCode: number; response: PutObjectResponse }
    | { statusCode: number; response: DeleteObjectResponse }
    | { statusCode: number; response: string }
  > {
    switch (endPointType) {
      case "get":
        if (queryData.id) {
          return await this.prepareResponse(await this.apiRequest.get(`${apiUrl}/${queryData.id}`), statusCode);
        } else {
          return await this.prepareResponse(await this.apiRequest.get(apiUrl), statusCode);
        }
      case "post":
        if (queryData.data) {
          return await this.prepareResponse(await this.apiRequest.post(apiUrl, { data: queryData.data as PostObjectRequest }), statusCode);
        } else {
          throw new Error("Request data for post endpoint call is missing!");
        }
      case "put":
        return await this.prepareResponse(await this.apiRequest.put(`${apiUrl}/${queryData.id}`, { data: queryData.data as PutObjectRequest }), statusCode);
      case "delete":
        return await this.prepareResponse(await this.apiRequest.delete(`${apiUrl}/${queryData.id}`), statusCode);
      default:
        throw new Error("Invalid API method type");
    }
  }

  private async prepareResponse(response: APIResponse, statusCode: number = 200): Promise<
    { statusCode: number; response: GetObjectResponse }
    | { statusCode: number; response: PostObjectResponse }
    | { statusCode: number; response: PutObjectResponse }
    | { statusCode: number; response: DeleteObjectResponse }
    | { statusCode: number; response: string }> {
    if (statusCode === 200) {
      return { statusCode: response.status(), response: await response.json() };
    } else {
      return { statusCode: response.status(), response: await response.text() };
    }
  }
}
