# Enhanced User Authentication and Authorization System

### Live base url: https://authentication-and-authorization-system.vercel.app/

- ### Application Summary
- ##### This is a Node.js Express application with TypeScript as the programming language and MongoDB with Mongoose for course and review management. It utilizes MongoDB through Mongoose for data storage, use incorporates Zod for input validation and use jsonwebtoken for user authentication.

- ### Local Setup Instructions
- Clone the repository
  `https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-jubayer44.git`
- Navigate to the project directory
  `cd your-folder`
- Install dependencies
  `npm install`
- Create a`.env` file in the root of the project and set the following environment variables

```
NODE_ENV = development
PORT = 5000
JWT_ACCESS_SECRET = your secret
JWT_ACCESS_EXPIRES_IN = 1d
DB_URL = your mongodb_url
```

##### Running the application

- Development Mode
  `npm run dev`
- Production Mode

```
npm run build
npm start
```

##### Testing Application

- To run linting and prettier checks

```
npm run lint:check
npm run prettier:check
```

- To automatically fix linting and prettier issues

```
npm run lint:fix
npm run prettier:fix
```

#### **Models**

This Application has 4 models.

1. Course Model
2. Category Model
3. Review Model
4. User Model

#### **Login Credentials**

- User Login:

  - username: user1
  - Password: User@1

- Admin Login:
  - username: admin1
  - password: Admin@1

### API Endpoints

#### 1. User Registration

- **Route:** `/api/auth/register`
- **Method:** POST
- **Request Body:**
  ```json
  {
      "username": "user2",
      "email": "user2@gmail.com",
      "password": "User@2"
      "role": "user"
  }
  ```
- **Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "_id": "658be37be29f5033aaaafa87",
    "username": "user2",
    "email": "user2@gmail.com",
    "role": "user",
    "createdAt": "2023-12-27T08:42:35.763Z",
    "updatedAt": "2023-12-27T08:42:35.763Z"
  }
}
```

#### 2. User Login

- **Route:** `/api/auth/login`
- **Method:** POST
- **Request Body:**

```json
{
  "username": "user2",
  "password": "User@2"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User login successfully",
  "data": {
    "user": {
      "_id": "658afe48b8fcaff38963520e",
      "username": "user2",
      "role": "user",
      "email": "user2@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhZmU0OGI4ZmNhZmYzODk2MzUyMGUiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIiwiaWF0IjoxNzAzNjYwNTczLCJleHAiOjE3MDM3NDY5NzN9.psMIqlmI69hp0wgrU0fXV2vvtS0Hd15g5o45xwF8PVg"
  }
}
```

#### 3. Change Password

- **Route:** `/api/auth/change-password`
- **Method:** POST
- **Request Body:**

```json
{
  "currentPassword": "user2",
  "newPassword": "User@2"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password changed successfully",
  "data": {
    "_id": "658afe48b8fcaff38963520e",
    "username": "user2",
    "email": "user2@gmail.com",
    "role": "user",
    "createdAt": "2023-12-26T16:24:40.465Z",
    "updatedAt": "2023-12-26T16:24:40.465Z"
  }
}
```

#### 4. Create a Course (Only Admin can do this)

- **Route:** `/api/courses`
- **Method:** POST
- **Request Body:**

```json
{
  "title": "JavaScript Backend Course",
  "instructor": "Shakib Islam",
  "categoryId": "658b02a3078c1c47b2bbc7d4",
  "price": 100.0,
  "tags": [
    {
      "name": "Backend JavaScript",
      "isDeleted": false
    },
    {
      "name": "Smart JavaScript",
      "isDeleted": false
    }
  ],
  "startDate": "2024-5-15",
  "endDate": "2024-12-15",
  "language": "Bangla",
  "provider": "PH Hero",
  "details": {
    "level": "Advanced",
    "description": "Detailed description of the course"
  }
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Course created successfully",
  "data": {
    "title": "JavaScript Backend Course",
    "instructor": "Shakib Islam",
    "categoryId": "658b02a3078c1c47b2bbc7d4",
    "price": 100,
    "tags": [
      {
        "name": "Backend JavaScript",
        "isDeleted": false
      },
      {
        "name": "Smart JavaScript",
        "isDeleted": false
      }
    ],
    "startDate": "2024-5-15",
    "endDate": "2024-12-15",
    "language": "Bangla",
    "provider": "PH Hero",
    "durationInWeeks": 31,
    "details": {
      "level": "Advanced",
      "description": "Detailed description of the course"
    },
    "createdBy": "658afea3b8fcaff389635211",
    "_id": "658bf28ae29f5033aaaafa8f",
    "createdAt": "2023-12-27T09:46:50.809Z",
    "updatedAt": "2023-12-27T09:46:50.809Z"
  }
}
```

#### 5. Get Paginated and Filtered Courses.

- **Route:** `/api/courses`
- **Method:** GET
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Courses retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 4
  },
  "data": {
    "courses": [
      {
        "_id": "658b00d9078c1c47b2bbc7a9",
        "title": "Basic English",
        "instructor": "Jubayer Ahmed",
        "categoryId": "658b0071078c1c47b2bbc7a4",
        "price": 50,
        "tags": [
          {
            "name": "Basic English",
            "isDeleted": false
          },
          {
            "name": "Smart English",
            "isDeleted": false
          }
        ],
        "startDate": "2024-01-15",
        "endDate": "2024-03-15",
        "language": "Bangla",
        "provider": "Smart Academy",
        "durationInWeeks": 9,
        "details": {
          "level": "Basic",
          "description": "Detailed description of the course"
        },
        "createdBy": {
          "_id": "658afea3b8fcaff389635211",
          "username": "admin1",
          "email": "admin1@gmail.com",
          "role": "admin",
          "createdAt": "2023-12-26T16:26:11.371Z",
          "updatedAt": "2023-12-26T16:26:11.371Z"
        },
        "createdAt": "2023-12-26T16:35:37.029Z",
        "updatedAt": "2023-12-26T16:35:37.029Z"
      }
      // others course
    ]
  }
}
```

#### 6. Create a Category (Only Admin can do this)

- **Route:** `/api/categories`
- **Method:** POST
- **Request Body:**

```json
{
  "name": "Backend Development"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Category created successfully",
  "data": {
    "name": "Backend Development",
    "createdBy": "658afea3b8fcaff389635211",
    "_id": "658bf4dee29f5033aaaafaa2",
    "createdAt": "2023-12-27T09:56:46.647Z",
    "updatedAt": "2023-12-27T09:56:46.647Z"
  }
}
```

#### 7. Get All Categories

- **Route:** `/api/categories`
- **Method:** GET
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      {
        "_id": "658b0071078c1c47b2bbc7a4",
        "name": "English",
        "createdBy": {
          "_id": "658afea3b8fcaff389635211",
          "username": "admin1",
          "email": "admin1@gmail.com",
          "role": "admin",
          "createdAt": "2023-12-26T16:26:11.371Z",
          "updatedAt": "2023-12-26T16:26:11.371Z"
        },
        "createdAt": "2023-12-26T16:33:53.753Z",
        "updatedAt": "2023-12-26T16:33:53.753Z"
      }
      // ...Others Categories
    ]
  }
}
```

#### 8. Create a Review (Only the user can do this)

- **Route:** `/api/reviews`
- **Method:** POST
- **Request Body:**

```json
{
  "courseId": "658b02fe078c1c47b2bbc7d8",
  "rating": 5,
  "review": "average course!"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Review created successfully",
  "data": {
    "courseId": "658b02fe078c1c47b2bbc7d8",
    "rating": 5,
    "review": "average course!",
    "createdBy": {
      "_id": "658afe48b8fcaff38963520e",
      "username": "user1",
      "email": "user1@gmail.com",
      "role": "user",
      "createdAt": "2023-12-26T16:24:40.465Z",
      "updatedAt": "2023-12-26T16:24:40.465Z"
    },
    "_id": "658bcbeb4a1d8c149f88c0a2",
    "createdAt": "2023-12-27T07:02:03.524Z",
    "updatedAt": "2023-12-27T07:02:03.524Z"
  }
}
```

#### 9. Update a Course (Only Admin can do this)

- **Route:** `/api/courses/:courseId`
- **Method:** PUT
- **Request Body:**

```json
{
  "price": 80,
  "tags": [
    {
      "name": "Basic English",
      "isDeleted": false
    },
    {
      "name": "Smart English",
      "isDeleted": false
    },
    {
      "name": "Smart English 2",
      "isDeleted": true
    }
  ],
  "details": {
    "level": "Advanced"
  }
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Course updated successfully",
  "data": {
    "_id": "658b00d9078c1c47b2bbc7a9",
    "title": "Basic English",
    "instructor": "Jubayer Ahmed",
    "categoryId": "658b0071078c1c47b2bbc7a4",
    "price": 80,
    "tags": [
      {
        "name": "Basic English",
        "isDeleted": false
      },
      {
        "name": "Smart English",
        "isDeleted": false
      }
    ],
    "startDate": "2024-01-15",
    "endDate": "2024-03-15",
    "language": "Bangla",
    "provider": "Smart Academy",
    "durationInWeeks": 9,
    "details": {
      "level": "Advanced",
      "description": "Detailed description of the course"
    },
    "createdBy": {
      "_id": "658afea3b8fcaff389635211",
      "username": "admin1",
      "email": "admin1@gmail.com",
      "role": "admin",
      "createdAt": "2023-12-26T16:26:11.371Z",
      "updatedAt": "2023-12-26T16:26:11.371Z"
    },
    "createdAt": "2023-12-26T16:35:37.029Z",
    "updatedAt": "2023-12-27T10:07:34.752Z"
  }
}
```

#### 10. Get Course by ID with Reviews

- **Route:** `/api/courses/:courseId/reviews`
- **Method:** GET
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Course with Reviews retrieved successfully",
  "data": {
    "course": {
      "_id": "658b00d9078c1c47b2bbc7a9",
      "title": "Basic English",
      "instructor": "Jubayer Ahmed",
      "categoryId": "658b0071078c1c47b2bbc7a4",
      "price": 80,
      "tags": [
        {
          "name": "Basic English",
          "isDeleted": false
        },
        {
          "name": "Smart English",
          "isDeleted": false
        }
      ],
      "startDate": "2024-01-15",
      "endDate": "2024-03-15",
      "language": "Bangla",
      "provider": "Smart Academy",
      "durationInWeeks": 9,
      "details": {
        "level": "Advanced",
        "description": "Detailed description of the course"
      },
      "createdBy": {
        "_id": "658afea3b8fcaff389635211",
        "username": "admin1",
        "email": "admin1@gmail.com",
        "role": "admin"
      },
      "createdAt": "2023-12-26T16:35:37.029Z",
      "updatedAt": "2023-12-27T10:10:57.366Z"
    },
    "reviews": [
      {
        "_id": "658b0157078c1c47b2bbc7ad",
        "courseId": "658b00d9078c1c47b2bbc7a9",
        "rating": 5,
        "review": "this is a good course!",
        "createdBy": {
          "_id": "658afe48b8fcaff38963520e",
          "username": "user1",
          "email": "user1@gmail.com",
          "role": "user"
        },
        "createdAt": "2023-12-26T16:37:43.580Z",
        "updatedAt": "2023-12-26T16:37:43.580Z"
      }
      // ...Others Reviews
    ]
  }
}
```

#### 11. Get the Best Course Based on Average Review (Rating)

- **Route:** `/api/course/best`
- **Method:** GET
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Best course retrieved successfully",
  "data": {
    "course": {
      "_id": "658b02fe078c1c47b2bbc7d8",
      "title": "JavaScript Forntend Course",
      "instructor": "Shakib Islam",
      "categoryId": "658b02a3078c1c47b2bbc7d4",
      "price": 90,
      "tags": [
        {
          "name": "Frontend JavaScript",
          "isDeleted": false
        },
        {
          "name": "Smart JavaScript",
          "isDeleted": false
        }
      ],
      "startDate": "2024-5-15",
      "endDate": "2024-12-15",
      "language": "Bangla",
      "provider": "PH Hero",
      "durationInWeeks": 31,
      "details": {
        "level": "Basic",
        "description": "Detailed description of the course"
      },
      "createdBy": {
        "_id": "658afea3b8fcaff389635211",
        "username": "admin1",
        "email": "admin1@gmail.com",
        "role": "admin"
      },
      "createdAt": "2023-12-26T16:44:46.783Z",
      "updatedAt": "2023-12-26T16:44:46.783Z"
    },
    "averageRating": "3.9",
    "reviewCount": 8
  }
}
```

### **_Thank You_**
