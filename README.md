# EXZI_Case Backend Case

This project is a Node.js application designed to work in both development and production environments using Docker. The application is built with modern JavaScript frameworks.
## Prerequisites

   - Node.js version 18 or higher: Make sure your Node.js version is compatible. You can verify your version with:

    node -v

   - Docker: Ensure Docker is installed and running on your system. This project uses Docker for both development and production environments.

## Getting Started
### Installation

1- Clone the repository:

    git clone https://github.com/ErimTuzcuoglu/EXZI_Case.git
    cd EXZI_Case

2- Install dependencies:

    yarn

## Running the Application
### Local Development

To run the application locally using Docker in development mode (Recommended):

    yarn docker:dev

Or with Node.js (You also need run run mongoDB before execute the below command):

    set NODE_ENV=development && yarn dev

### Production Mode

For running the application in production mode using Docker:

    yarn docker:production


### Docs 
#### Development
In Development, it redirects to /docs on default route (/).

    http://localhost:3000/docs/

#### Production
    http://localhost:5000/docs/


## Testing

To run tests:

    yarn test