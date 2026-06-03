import { test, expect } from '@playwright/test';
import { deleteObject, getAllObjects, getObjectById, postObject, putObject } from '../../services/public-api';
import { faker } from '@faker-js/faker';

test.describe('api testing group', () => {
  test(`api testing`, async ({ request }) => {
    // given
    const data = {
      "name": faker.commerce.productName(),
      "data": {
        "year": faker.number.int({ min: 1990, max: 2025 }),
        "price": parseFloat(faker.commerce.price()),
        "CPU model": faker.commerce.productMaterial(),
        "Hard disk size": `${faker.number.int({ min: 1, max: 100})} TB`
      }
    };
    
    const postResponse = await postObject(request, data);
    expect(postResponse.statusCode, 'Post object is failed!').toBe(200);
    const newObjectId = postResponse.response.id;

    const getResponse = await getObjectById(request, newObjectId);
    expect(getResponse.statusCode, `Get object by id: ${newObjectId} is failed!`).toBe(200);

    // when
    const updateData = {
        "name": faker.commerce.productName(),
        "data": {
          "year": faker.number.int({ min: 1990, max: 2025 }),
          "price": parseFloat(faker.commerce.price()),
          "CPU model": faker.commerce.productMaterial(),
          "Hard disk size": `${faker.number.int({ min: 1, max: 100})} TB`,
          "color": faker.color.human()
      }
    }
    const putResponse = await putObject(request, newObjectId, updateData);
    expect(putResponse.statusCode, `Put object by id: ${newObjectId} is failed!`).toBe(200);

    // then
    const deleteResponse = await deleteObject(request, newObjectId);
    expect(deleteResponse.statusCode, `Delete object by id: ${newObjectId} is failed!`).toBe(200);
    expect(deleteResponse.response.message, `Delete object by id: ${newObjectId} is failed!`).toBe(`Object with id = ${newObjectId} has been deleted.`);
  });
});
