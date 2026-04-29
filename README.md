# 📚 Nova Library

Nova Library is a full-stack bookstore management application built using **Java 17, Spring Boot, and React.js**. It is designed with a **production-oriented architecture** and deployed on **AWS** to demonstrate real-world cloud deployment practices.

---

## 🚀 Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Web (REST APIs)
* Spring Data JPA
* PostgreSQL

### Frontend

* React.js
* TypeScript
* Axios
* Vite

### Cloud & Deployment

* AWS EC2 / Elastic Beanstalk
* AWS RDS (PostgreSQL)
* Environment-based configuration
* CORS configuration for secure client-server communication

---

## ✨ Features

* 📖 View all books in the catalog
* ➕ Add new books
* ✏️ Edit existing books
* ❌ Delete books
* 🔍 Search books by title or author
* 🌐 RESTful API integration
* ☁️ Cloud-deployed backend with managed database

---

## 🏗️ Architecture

* Backend follows layered architecture:
  **Controller → Service → Repository**
* Frontend uses component-based architecture
* Communication via REST APIs (JSON)
* Backend and database deployed on AWS

---

## ☁️ Deployment Overview

The application is deployed on AWS to simulate a real-world environment:

* Backend hosted on **EC2 / Elastic Beanstalk**
* Database managed using **AWS RDS (PostgreSQL)**
* Frontend communicates with backend via public API endpoints
* Environment variables used for configuration across environments

---

## 🔐 Configuration & Secrets Handling

Sensitive configuration (e.g., database credentials) is externalized using environment variables.

* For **local development**, `.env` files are used
* For **production environments**, the application is designed to integrate with secure secret management solutions such as **AWS Secrets Manager** or **Vault**

This approach avoids hardcoding secrets and supports secure, flexible deployments across environments.

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository

```bash id="6d7r9s"
git clone https://github.com/your-username/nova-library.git
cd nova-library
```

---

### 2️⃣ Backend Setup

```bash id="3mf8zk"
cd backend
```

#### Configure environment variables:

```env id="0pk8cx"
DB_URL=jdbc:postgresql://localhost:5432/bookstore
DB_USERNAME=postgres
DB_PASSWORD=your_password
FRONTEND_URL=http://localhost:3000
```

#### Run backend:

```bash id="u3x7mt"
./mvnw spring-boot:run
```

Backend runs at:

```id="o9zq7m"
http://localhost:8080
```

---

### 3️⃣ Frontend Setup

```bash id="f3m2qn"
cd ui
npm install
npm run dev
```

Frontend runs at:

```id="z2h8rp"
http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | /api/books      | Get all books  |
| GET    | /api/books/{id} | Get book by ID |
| POST   | /api/books      | Add new book   |
| PUT    | /api/books/{id} | Update book    |
| DELETE | /api/books/{id} | Delete book    |

---

## ⚠️ Common Issues

### CORS Error

If you encounter:

```id="4y0qpl"
No 'Access-Control-Allow-Origin' header
```

Ensure:

* Backend allows the exact frontend origin
* No mismatch between `localhost` and network IP

---

## 📈 Future Enhancements

* JWT Authentication & Authorization
* Pagination & Sorting
* Role-based access control
* CI/CD pipeline integration
* Docker containerization

---

## 👨‍💻 Author

Shubham Raskar

---
