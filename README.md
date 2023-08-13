# RESTful Web Service

This a web service that provides endpoints to retrieve and display information about tweets, users, and external links from a Twitter archive. 

## Getting Started

To run the application, follow these steps:

1. Make sure you have Node.js and npm installed.
2. Place your `data.json` file in the root directory of the project.
3. Open your terminal and navigate to the project directory.
4. Install the required dependencies by running: `npm install`
5. Start the server by running: `node server.js`
6. Open your web browser and visit: `http://localhost:3000`

## Functionality Details

### 1. Get User Profile

- Enter a Twitter user's screen name in the input field and click the "Search" button. Example: timoreilly
- The application will fetch and display the user's profile information, including name, description, location, followers count, friends count, and verified status.

### 2. Get Tweet Details

- Enter a tweet's ID in the input field and click the "Search" button. Example:311964132205268992
- The application will fetch and display the tweet's details, including text, creation date, retweet count, and favorited status.

### 3. Get All Users

- Click the "Get all Users" button.
- The application will fetch and display a list of all known Twitter users with their names, screen names, and IDs.

### 4. Get All External Links

- Click the "Get External Links" button.
- The application will fetch and display a list of all links that appear in any field of a tweet, which are  grouped based on tweet ids.

### 5. Get All Tweets

- Click the "Get all Tweets" button.
- The application will fetch and display a list of all known tweets along with their creation date, id, and text.

## Directory Structure

- `server.js`: The Node.js server implementation that handles API requests.
- `data.json`: A JSON file containing Twitter data.
- `public/`: Directory containing static assets for the frontend.
  - `index.html`: HTML file for the web application.
  - `index.js`: JavaScript file with client-side functionality.
  - `style.css`: CSS file

## Dependencies

- Express: Web framework for building the server.
- fs: File system module for reading the JSON data.
- CORS: Middleware for enabling cross-origin resource sharing.

## Author

[Ramon Delgadillo]
