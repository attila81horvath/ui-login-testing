import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { ApiTestEndpoint } from "../../services/public-api";
import { PostObjectResponse } from "../../types/api/restful-api";

test.describe("api testing group", () => {
  test(`api testing`, async ({ request }) => {
    // given
    const apiTest = new ApiTestEndpoint(request);
    const data = {
      name: faker.commerce.productName(),
      data: {
        year: faker.number.int({ min: 1990, max: 2025 }),
        price: parseFloat(faker.commerce.price()),
        "CPU model": faker.commerce.productMaterial(),
        "Hard disk size": `${faker.number.int({ min: 1, max: 100 })} TB`,
      },
    };

    const postResponse = await apiTest.postObject(data);
    expect(postResponse.statusCode, "Post object is failed!").toBe(200);
    const newObjectId = postResponse.response.id;

    const getResponse = await apiTest.getObjectById(newObjectId);
    expect(
      getResponse.statusCode,
      `Get object by id: ${newObjectId} is failed!`,
    ).toBe(200);

    // when
    const updateData = {
      name: faker.commerce.productName(),
      data: {
        year: faker.number.int({ min: 1990, max: 2025 }),
        price: parseFloat(faker.commerce.price()),
        "CPU model": faker.commerce.productMaterial(),
        "Hard disk size": `${faker.number.int({ min: 1, max: 100 })} TB`,
        color: faker.color.human(),
      },
    };
    const putResponse = await apiTest.putObject(newObjectId, updateData);
    expect(
      putResponse.statusCode,
      `Put object by id: ${newObjectId} is failed!`,
    ).toBe(200);

    // then
    const deleteResponse = await apiTest.deleteObject(newObjectId);
    expect(
      deleteResponse.statusCode,
      `Delete object by id: ${newObjectId} is failed!`,
    ).toBe(200);
    expect(
      deleteResponse.response.message,
      `Delete object by id: ${newObjectId} is failed!`,
    ).toBe(`Object with id = ${newObjectId} has been deleted.`);
  });

    test(`api testing with new endpoint call`, async ({ request }) => {
    // given
    const apiTest = new ApiTestEndpoint(request);
    const data = {
      name: faker.commerce.productName(),
      data: {
        year: faker.number.int({ min: 1990, max: 2025 }),
        price: parseFloat(faker.commerce.price()),
        "CPU model": faker.commerce.productMaterial(),
        "Hard disk size": `${faker.number.int({ min: 1, max: 100 })} TB`,
      },
    };

    //const postResponse = await apiTest.postObject(data);
    const postResponse = await apiTest.testingApiEndpoint("post", {data});
    expect(postResponse.statusCode, "Post object is failed!").toBe(200);
    const newObjectId = postResponse.response.id;

    //const getResponse = await apiTest.getObjectById(newObjectId);
    const getResponse = await apiTest.testingApiEndpoint("get", {id: newObjectId});
    expect(
      getResponse.statusCode,
      `Get object by id: ${newObjectId} is failed!`,
    ).toBe(200);

    // when
    const updateData = {
      name: faker.commerce.productName(),
      data: {
        year: faker.number.int({ min: 1990, max: 2025 }),
        price: parseFloat(faker.commerce.price()),
        "CPU model": faker.commerce.productMaterial(),
        "Hard disk size": `${faker.number.int({ min: 1, max: 100 })} TB`,
        color: faker.color.human(),
      },
    };
    //const putResponse = await apiTest.putObject(newObjectId, updateData);
    const putResponse = await apiTest.testingApiEndpoint("put", {data, id: newObjectId});
    expect(
      putResponse.statusCode,
      `Put object by id: ${newObjectId} is failed!`,
    ).toBe(200);

    // then
    //const deleteResponse = await apiTest.deleteObject(newObjectId);
    const deleteResponse = await apiTest.testingApiEndpoint("delete", {id: newObjectId});
    expect(
      deleteResponse.statusCode,
      `Delete object by id: ${newObjectId} is failed!`,
    ).toBe(200);
    expect(
      deleteResponse.response.message,
      `Delete object by id: ${newObjectId} is failed!`,
    ).toBe(`Object with id = ${newObjectId} has been deleted.`);
  });
});
