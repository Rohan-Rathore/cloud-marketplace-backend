# Cloud Marketplace

Cloud Marketplace is a web application built using the MERN (MongoDB, Express, React, Node.js) stack that allows Cloud Service Providers (CSPs) to list their services and users to choose the services they require based on the appropriate parameters like required uptime, bandwidth, latency, etc.

### Features

- User authentication and authorization
- CRUD operations for users, CSPs, and services
- Filtering services based on various parameters
- Easy-to-use user interface

## Getting Started

### Prerequisites

- Node.js (v14.15.4 or later)
- npm (v7.5.4 or later)
- MongoDB (v4.4.4 or later)

### Installation

1. Clone the repository:
```
    git clone https://github.com/Rohan-Rathore/cloud-marketplace-backend.git
    cd cloud-marketplace-backend
```
2. Install dependencies:
```
npm install
```
3. Set up environment variables:
Create a `.env` file in the root directory of the project and add the following variables:
```
DATABASE=<your-mongodb-url>
SECRET=<your-secret-key>
```
4. Start the application:
```
npm start
```
This will start the server on the specified port (default is 8000) and connect to the MongoDB database.

### Usage
- Visit `http://localhost:<port-number>` to access the Cloud Marketplace web application.
- Use the provided API routes to perform CRUD operations on users, CSPs, and services.

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
[MIT](https://choosealicense.com/licenses/mit/ "MIT")
