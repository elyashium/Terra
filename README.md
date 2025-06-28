# Terra - Full Stack Carbon Emission Tracker

This document provides a detailed, step-by-step guide to integrating a Node.js backend with a React frontend, containerizing the application using Docker, and setting up a CI/CD pipeline for automated deployment. It is intended to be a comprehensive resource, including explanations of concepts and best practices.

## Project Overview

Terra is a web application that helps users track and analyze carbon emissions. The current version is a standalone React frontend. This guide will walk you through the process of adding a backend service, connecting it to a database, and automating the entire build and deployment process.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js and npm:** [Download Node.js](https://nodejs.org/)
*   **Docker and Docker Compose:** [Install Docker](https://docs.docker.com/get-docker/)
*   **Git:** [Install Git](https://git-scm.com/downloads)
*   **A code editor:** We recommend [Visual Studio Code](https://code.visualstudio.com/)
*   **A GitHub account:** [Sign up for GitHub](https://github.com/)
*   **A Docker Hub account:** [Sign up for Docker Hub](https://hub.docker.com/)

## 1. Backend Integration (Node.js, Express, MongoDB)

### 1.1. Folder Structure

To maintain a clean and organized monorepo, we'll create a `server` directory for all backend-related code. The updated folder structure will look like this:

```
Terra/
├── client/
│   ├── public/
│   ├── src/
│   └── ... (all existing React app files)
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
├── .gitignore
├── docker-compose.yml
├── Dockerfile.client
├── Dockerfile.server
└── README.md
```

**Action:**

1.  Create a `client` directory and move all the existing React application files and folders into it.
2.  Create a `server` directory for the backend code.

### 1.2. Setting up the Express Server

**Inside the `server` directory:**

1.  **Initialize a new Node.js project:**
    ```bash
    npm init -y
    ```

2.  **Install necessary dependencies:**
    *   `express`: A minimal and flexible Node.js web application framework.
    *   `mongoose`: An Object Data Modeling (ODM) library for MongoDB and Node.js.
    *   `cors`: A package for providing a Connect/Express middleware that can be used to enable CORS with various options.
    *   `dotenv`: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
    *   `nodemon`: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

    ```bash
    npm install express mongoose cors dotenv
    npm install -D nodemon
    ```

3.  **Create the main server file (`index.js`):**

    ```javascript
    // server/index.js
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    require('dotenv').config();

    const app = express();
    const port = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    // Define a simple route
    app.get('/api', (req, res) => {
      res.send('Hello from the backend!');
    });

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
    ```

4.  **Create a `.env` file** in the `server` directory to store your environment variables:

    ```
    # .env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

5.  **Add a `start` script** to your `server/package.json`:

    ```json
    "scripts": {
      "start": "nodemon index.js"
    }
    ```

### 1.3. Creating API Endpoints

We'll follow a simple Model-View-Controller (MVC) pattern to structure our API.

1.  **Models (`server/models/`):** Define the schema for your data. For example, a `CarbonData` model.

    ```javascript
    // server/models/CarbonData.js
    const mongoose = require('mongoose');

    const CarbonDataSchema = new mongoose.Schema({
      country: { type: String, required: true, trim: true },
      emission: { type: Number, required: true, min: 0 },
      year: { type: Number, required: true },
    }, { timestamps: true });

    module.exports = mongoose.model('CarbonData', CarbonDataSchema);
    ```

2.  **Controllers (`server/controllers/`):** Implement the logic for handling requests.

    ```javascript
    // server/controllers/carbonController.js
    const CarbonData = require('../models/CarbonData');

    exports.getCarbonData = async (req, res) => {
      try {
        const data = await CarbonData.find();
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching carbon data', error: err.message });
      }
    };

    exports.createCarbonData = async (req, res) => {
      const { country, emission, year } = req.body;

      if (!country || !emission || !year) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const newData = new CarbonData({
        country,
        emission,
        year,
      });

      try {
        const savedData = await newData.save();
        res.status(201).json(savedData);
      } catch (err) {
        res.status(400).json({ message: 'Error saving carbon data', error: err.message });
      }
    };
    ```

3.  **Routes (`server/routes/`):** Define the API routes and map them to the controller functions.

    ```javascript
    // server/routes/carbon.js
    const express = require('express');
    const router = express.Router();
    const carbonController = require('../controllers/carbonController');

    router.get('/', carbonController.getCarbonData);
    router.post('/', carbonController.createCarbonData);

    module.exports = router;
    ```

4.  **Update `server/index.js` to use the new routes:**

    ```javascript
    // server/index.js
    // ... (other code)

    const carbonRoutes = require('./routes/carbon');
    app.use('/api/carbon', carbonRoutes);

    // ... (other code)
    ```

## 2. Containerization with Docker

Containerization allows us to package our application and its dependencies into a single, isolated unit called a container. This ensures consistency across different environments.

### 2.1. Dockerfile for the Client (React App)

Create a file named `Dockerfile.client` in the root directory.

```dockerfile
# Dockerfile.client

# Stage 1: Build the React application
FROM node:18-alpine as builder
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2.2. Dockerfile for the Server (Node.js App)

Create a file named `Dockerfile.server` in the root directory.

```dockerfile
# Dockerfile.server

FROM node:18-alpine
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ ./
EXPOSE 5000
CMD [ "npm", "start" ]
```

### 2.3. Docker Compose for Multi-Container Management

`docker-compose` is a tool for defining and running multi-container Docker applications. Create a `docker-compose.yml` file in the root directory.

```yaml
# docker-compose.yml

version: '3.8'
services:
  client:
    build:
      context: .
      dockerfile: Dockerfile.client
    ports:
      - "3000:80"
    depends_on:
      - server

  server:
    build:
      context: .
      dockerfile: Dockerfile.server
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=${MONGO_URI}
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

**To run the application with Docker:**

1.  Make sure you have Docker and Docker Compose installed.
2.  Create a `.env` file in the root directory with your `MONGO_URI`.
3.  Run the following command from the root directory:

    ```bash
    docker-compose up --build
    ```

Your application should now be accessible at `http://localhost:3000`.

## 3. CI/CD Pipeline with GitHub Actions

A CI/CD pipeline automates the process of building, testing, and deploying your application. We'll use GitHub Actions to create a simple workflow.

### 3.1. Workflow for Building and Pushing Docker Images

1.  **Create a `.github/workflows` directory** in your project root.
2.  **Create a `main.yml` file** inside the workflows directory.

```yaml
# .github/workflows/main.yml

name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push client image
      uses: docker/build-push-action@v4
      with:
        context: .
        dockerfile: Dockerfile.client
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/terra-client:latest

    - name: Build and push server image
      uses: docker/build-push-action@v4
      with:
        context: .
        dockerfile: Dockerfile.server
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/terra-server:latest
```

### 3.2. Setting up Secrets

In your GitHub repository, go to `Settings > Secrets and variables > Actions` and add the following secrets:

*   `DOCKER_USERNAME`: Your Docker Hub username.
*   `DOCKER_PASSWORD`: Your Docker Hub password or access token.

### 3.3. Deployment

This workflow builds and pushes the Docker images to Docker Hub. The next step would be to add a deployment job to this workflow. The deployment strategy will depend on your cloud provider (e.g., AWS, Heroku, DigitalOcean).

**Example Deployment to a VPS (e.g., DigitalOcean, AWS EC2):**

You can add a deployment job that uses SSH to connect to your server and run `docker-compose up`.

```yaml
# ... (previous jobs)

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
    - name: SSH and deploy
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SSH_HOST }}
        username: ${{ secrets.SSH_USERNAME }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /path/to/your/app
          docker-compose pull
          docker-compose up -d --build
```

**Additional Secrets for Deployment:**

*   `SSH_HOST`: The IP address of your server.
*   `SSH_USERNAME`: The username for your server.
*   `SSH_PRIVATE_KEY`: The private SSH key to access your server.

## 4. Best Practices and Further Improvements

### 4.1. Security

*   **Environment Variables:** Never hardcode sensitive information like API keys or database credentials in your code. Use environment variables (`.env` file) and access them via `process.env`.
*   **Input Validation:** Always validate and sanitize user input on the backend to prevent common vulnerabilities like XSS and NoSQL injection.
*   **Error Handling:** Implement robust error handling to avoid leaking sensitive information in error messages.
*   **Rate Limiting:** Protect your API from brute-force attacks by implementing rate limiting.

### 4.2. Testing

*   **Unit Tests:** Write unit tests for your backend controllers and models to ensure they function correctly.
*   **Integration Tests:** Test the interaction between your client and server to catch bugs in the API integration.
*   **End-to-End (E2E) Tests:** Use a framework like Cypress or Puppeteer to simulate user interactions and test the entire application flow.

### 4.3. API Documentation

*   **Swagger/OpenAPI:** Use a tool like Swagger to generate interactive API documentation from your code. This makes it easier for frontend developers to understand and consume your API.

### 4.4. Scalability

*   **Load Balancing:** If your application experiences high traffic, consider using a load balancer to distribute requests across multiple server instances.
*   **Database Indexing:** Use database indexes to improve the performance of your queries.

## Conclusion

This guide provides a comprehensive roadmap for transforming your React frontend into a full-stack application with a robust backend, containerization, and a CI/CD pipeline. By following these steps, you'll gain valuable experience in modern web development practices and DevOps principles.
