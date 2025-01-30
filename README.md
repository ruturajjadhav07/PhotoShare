# Social Media App

This is a simple social media application built with Spring Boot (backend) and MySQL for managing users, posts, comments, and likes. The application allows users to create posts, comment on them, and like posts (one like per user-post combination).

## Features
- **User Management**: Users can register and log in to the application.
- **Posts**: Users can create and view posts.
- **Comments**: Users can comment on posts.
- **Likes**: Users can like posts (only once per post).

## Technologies Used
- **Frontend:** React, Axios, React Router
- **Backend:** Spring Boot, MySQL, JPA (Hibernate)
- **Database:** MySQL
- **API:** RESTful APIs
- **Tools:** Postman, Git, Docker (optional for deployment)

## Features
- **User Authentication:**
  - Registration and login functionality.

- **Posts:**
  - CRUD operations to create, read, update, and delete posts.
  - Each post is associated with a specific user.

- **Likes:**
  - Users can like posts, and only one like is allowed per user per post.

- **Comments:**
  - Users can comment on posts, with each comment linked to a post and user.
  
- **Post Ownership Validation:**
  - Posts can only be deleted by the user who created them.
- **Comment Ownership Validation:**
  - A comment can be deleted by either the comment owner or the post owner, where the comment is associated with the post

## Project Structure

### Backend

The backend is built using **Spring Boot** and interacts with a **MySQL** database to store user, post, comment, and like data.

### 1. **Spring Boot Dependencies**
Here are the key Spring Boot dependencies used in this project:

- **Spring Boot Starter Data JPA**  
- **Spring Boot Starter Web**
- **Spring Boot Starter WebFlux**
- **MySQL Connector**  
- **PostgreSQL**
- **Lombok** (to reduce boilerplate code)
- **Spring Boot Starter Test** (for testing)
- **Reactor Test** (for reactive testing)

### 2. **API Endpoints**

#### User Endpoints
- **POST** `/app/register`: Register a new user.
- **POST** `/app/login`: Login with user credentials.
- **GET** `/app/all`: Retrieve all users.
- **GET** `/app/user/{userId}`: Retrieve user details by ID.
- **POST** `/app/edituser`: Edit user details.
- **DELETE** `/app/delete/{userId}`: Delete a user by ID.

#### Post Endpoints
- **GET** `/app/posts/all`: Retrieve all posts.
- **POST** `/app/posts/create`: Create a new post.
- **DELETE** `/app/posts/delete/{postId}`: Delete a post by owner.

#### Like Endpoints
- **POST** `/app/like/addlike`: Like a post.
- **GET** `/app/like/all/{postId}`: Retrieve all likes for a post.
- **DELETE** `/app/like/removelike`: Remove a like from a post.

#### Comment Endpoints
- **POST** `/app/comment/addcomment`: Add a comment to a post.
- **GET** `/app/comment/all/{postId}`: Retrieve all comments for a post.
- **DELETE** `/app/comment/deletecomment/{commentId}`: Delete a comment by owner.

---

## Frontend

The frontend is built using **React** for a responsive and dynamic user interface, with several additional libraries to enhance functionality.

### 1. **React Dependencies**

Here are the key React dependencies used in the project:

- **React**: Core library for building user interfaces.
- **React DOM**: DOM-specific methods for rendering React components.
- **React Router DOM**: Client-side routing library for navigation.
- **Axios**: HTTP client to make API calls from frontend to backend.
- **React Scripts**: Provides build, start, and test scripts for React.
  
#### Optional Dependencies:
- **React Bootstrap**: UI components based on Bootstrap (for quicker styling).
- **Bootstrap**: CSS framework for responsive UI.
- **React Icons**: Icons that can be easily used in React components.
- **Font Awesome**: Icon library for scalable vector icons.
- **React-Redux**: State management tool for handling global state.
- **Redux**: State management library used with React.
- **React Hook Form**: Lightweight library to handle forms with minimal re-renders.
- **React-Toastify**: For displaying notifications and toasts.


## How to Run

### Prerequisites
- **Java 17 or above**
- **Node.js** and **npm** (for React frontend)
- **MySQL** database setup

### Backend Setup
1. Clone the repository:
```bash
https://github.com/ruturajjadhav07/Social-Media-App.git
```
2. Navigate to the backend directory and set up your application.properties with your MySQL database credentials:
```
spring.application.name=backend

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
<<<<<< MyBranch
spring.datasource.url=jdbc:mysql://localhost:3306/databasename
spring.datasource.username=your useername
spring.datasource.password=your password

spring.datasource.url=jdbc:mysql://localhost:3306/socialmedia
spring.datasource.username=
spring.datasource.password=
>>>>>> main
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.properties.hibernate.format_sql=true


spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=10MB // you can change thi on your own
spring.servlet.multipart.max-request-size=10MB

spring.web.resources.static-locations=file:// give path of ypur directory for eg- ///C:/Users/

```
3. Build the Spring Boot application:
```
mvn clean install
```
4. Run the Spring Boot application:
```
mvn spring-boot:run
```
<<<<<< MyBranch

### Frontend Setup
1. Navigate to the frontend directory:
```
cd frontend
```
2. Install dependencies:
```
npm install
```
3. Start the React development server:
```
npm start
```

## How to use

- **Register:** Register a new user.
- **Login:** Log in with your credentials to receive a JWT token.
- **Create a Post:** After logging in, create a post.
- **Like a Post:** Like a post.
- **Comment on a Post:** Comment on a post.
- **Delete a Post/Comment:** Delete posts or comments using the respective DELETE requests.

## Future Enhancements
- Implement pagination for posts.
- Add real-time chat functionality.
- Improve UI/UX with advanced features and design elements.
- Add file upload support for profile pictures and posts.

## Acknowledgements
- Spring Boot: Used to create RESTful APIs.
- React: Used to create the frontend of the application.
- MySQL: Used for relational database management.
- Postman: Used for API testing.
- Axios: Used for API communication in React.

# Resources for Learning
**[Spring Boot Documentation](https://docs.spring.io/spring-boot/index.html)**

**[React Official Docs](https://legacy.reactjs.org/docs/getting-started.html)**

**[Postman API Testing](https://learning.postman.com/docs/introduction/overview/)**

**[MySQL Documentation](https://dev.mysql.com/doc/)**


=======
The application will be running on http://localhost:8080
>>>>>> main
