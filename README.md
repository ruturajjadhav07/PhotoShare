# Social Media App

This is a simple social media application built with Spring Boot (backend) and MySQL for managing users, posts, comments, and likes. The application allows users to create posts, comment on them, and like posts (one like per user-post combination).

## Features
- **User Management**: Users can register and log in to the application.
- **Posts**: Users can create and view posts.
- **Comments**: Users can comment on posts.
- **Likes**: Users can like posts (only once per post).

## Technologies Used
- **Backend**: Spring Boot
- **Database**: MySQL
- **JPA**: Hibernate for ORM
- **Lombok**: To reduce boilerplate code (getters and setters)

## Project Setup

### Prerequisites
- Java 17 or later
- MySQL Server installed locally or a remote database
- Maven

### Clone the Repository
```bash
git clone https://github.com/your-username/social-media-app.git
cd social-media-app
```
## Configure the Application
- Make sure you have MySQL running locally or use a remote database.
- Update your application.properties with your MySQL connection details:
properties
```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/socialmedia
spring.datasource.username=password
spring.datasource.password=rutu@1602
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```
Create a MySQL database called socialmedia if you haven't already.

## Build and Run
Build the application using Maven:

```
mvn clean install
```
Run the application:
```
mvn spring-boot:run
```
The application will be running on http://localhost:8080