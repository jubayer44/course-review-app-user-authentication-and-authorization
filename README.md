# Course Review App
### Live base url: https://course-review-app.vercel.app/
- ### Application Summary
- #####  This is a Node.js Express application with TypeScript as the programming language and MongoDB with Mongoose for course and review management. It utilizes MongoDB through Mongoose for data storage, use incorporates Zod for input validation. The application includes eight routes for creating, retrieving, and updating courses and reviews.

- ### Local Setup Instructions
- Clone the repository
 ```https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-jubayer44.git```
- Navigate to the project directory
```cd your-folder```
- Install dependencies
```npm install```
- Create a```.env``` file in the root of the project and set the following environment variables
 ```
NODE_ENV = development
PORT = 5000
DB_URL = your mongodb_url
```
##### Running the application
- Development Mode
```npm run dev```
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
##### API Endpoints
- POST /api/course: Create a new course.
- GET /api/courses: Get all course.
- POST /api/categories: Create a category.
- GET /api/categories: Get all categories.
- POST /api/reviews: Create a review.
- PUT /api/courses/:courseId: Update a course.
- GET /api/courses/:courseId/reviews: Get Get single course with reviews.
- GET /api/course/best: Get the best course.

