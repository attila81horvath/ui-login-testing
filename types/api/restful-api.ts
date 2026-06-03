export type PostObjectRequest = {
  "name": string,
  "data": {
    "year": number,
    "price": number,
    "CPU model": string,
    "Hard disk size": string
  }
}

export type PostObjectResponse =  PostObjectRequest & {
  "id": string,
  "createdAt": string
}

export type GetObjectResponse = PostObjectRequest & {
}

export type PutObjectRequest = PostObjectRequest & {
    "data": {
        "color": string
    }
}

export type PutObjectResponse = PostObjectRequest & {
    "id": string,
    "data": {
        "color": string
    },
    "updatedAt": string
}

export type DeleteObjectResponse = {
  "message": string
}