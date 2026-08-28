# Frontend Mentor - Shortly URL Shortening API Solution

This project is a responsive URL shortening web application built as a solution to the [URL shortening API landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G).

It allows users to enter a valid URL, send it to a backend service, and receive a shortened version of the URL. The application also provides client-side validation, dynamically displays shortened links, allows users to copy generated links, prevents duplicate URLs, and preserves shortened links using browser local storage.

Frontend Mentor challenges help developers improve their coding skills by building realistic projects.

## Table of Contents

* [Overview](#overview)

  * [The Challenge](#the-challenge)
  * [Screenshot](#screenshot)
  * [Links]
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [My Process](#my-process)

  * [Built With](#built-with)
  * [What I Learned](#what-i-learned)
* [Author](#author)

## Overview

### The Challenge

Users should be able to:

* View the optimal layout depending on their device's screen size.
* Shorten a valid URL using the provided URL shortening API.
* Receive an error message when the input field is empty.
* Receive an error message when an invalid URL is entered.
* Display the shortened URL dynamically after a successful request.
* Copy the shortened URL to the clipboard by clicking the "Copy" button.
* Prevent the same URL from being shortened multiple times.
* Clear all previously generated shortened links.
* Preserve shortened links using the browser's local storage.
* Experience interactive hover, focus, and active states for interactive elements.

### Screenshot

![URL shortening API preview](./main/assets/design/image.jpg)

### Links

* Solution URL: [Frontend Mentor solution](https://www.frontendmentor.io/)
* Repository URL: [GitHub repository](https://github.com/bigmum0a-wq/url-shortening-api-master)
* Live Site URL: [URL Shortening API](https://bigmum0a-wq.github.io/url-shortening-api-master/)
* Backend API: [URL Shortening API Backend](https://url-shortening-api-master-1am6.onrender.com)

## Getting Started

### Run the Project Locally

To run this project locally:

1. Clone this repository:

```bash
git clone https://github.com/bigmum0a-wq/url-shortening-api-master.git
```

2. Navigate to the project directory:

```bash
cd url-shortening-api-master
```

3. Open the application.

The frontend is located in:

```text
main/index.html
```

You can open the file directly in your browser or use a local development server such as the VS Code Live Server extension.

### Backend

The project also includes a Node.js backend responsible for communicating with the URL shortening API.

The backend is located in:

```text
main/server/
```

To run the backend locally:

```bash
cd main/server
npm install
npm start
```

The backend will run on the port provided by the environment, or on port `3000` when running locally.

The deployed backend is hosted on Render.

## Project Structure

```text
url-shortening-api-master
│
├── README.md
│
└── main
    │
    ├── index.html
    │
    ├── assets
    │   │
    │   ├── css
    │   │   └── styles.css
    │   │
    │   ├── design
    │   │
    │   ├── fonts
    │   │   ├── OFL.txt
    │   │   ├── Poppins-Bold.ttf
    │   │   ├── Poppins-ExtraBoldItalic.ttf
    │   │   └── Poppins-Regular.ttf
    │   │
    │   ├── images
    │   │   ├── bg-boost-desktop.svg
    │   │   ├── bg-boost-mobile.svg
    │   │   ├── bg-shorten-desktop.svg
    │   │   ├── bg-shorten-mobile.svg
    │   │   ├── close-icon.svg
    │   │   ├── favicon-32x32.png
    │   │   ├── icon-brand-recognition.svg
    │   │   ├── icon-detailed-records.svg
    │   │   ├── icon-facebook.svg
    │   │   ├── icon-fully-customizable.svg
    │   │   ├── icon-instagram.svg
    │   │   ├── icon-menu.svg
    │   │   ├── icon-pinterest.svg
    │   │   ├── icon-twitter.svg
    │   │   ├── illustration-working.svg
    │   │   └── logo.svg
    │   │
    │   └── js
    │       └── script.js
    │
    └── server
        ├── package.json
        └── server.js
```
## My Process

### Built With

* Semantic HTML5 markup
* CSS custom properties
* CSS Flexbox
* Responsive design
* Pure JavaScript

  * DOM manipulation
  * Event listeners
  * Form validation
  * `URL` API
  * Fetch API
  * Clipboard API
  * Local Storage API
  * Dynamic DOM generation

* Node.js

  * Native HTTP server
  * HTTP request handling
  * JSON processing
  * CORS configuration
  * Fetching external API resources

* Clean URI API
* Render for backend deployment
* GitHub Pages for frontend deployment

### What I Learned

Building this project helped me strengthen my understanding of asynchronous JavaScript and the communication between a frontend application, a backend server, and an external API.

I practiced creating a complete request flow where the user's URL is validated on the client side, sent to a backend server, forwarded to the URL shortening API, and returned to the frontend as a shortened URL.

This project reinforced my knowledge of:

* Validating URLs using the JavaScript `URL` constructor
* Using `fetch()` with asynchronous functions and `async/await`
* Sending JSON data from the frontend to a Node.js backend
* Receiving and processing HTTP requests with Node.js
* Handling CORS between a frontend and backend hosted on different origins
* Communicating with an external URL shortening API from the backend
* Dynamically creating and updating DOM elements
* Adding event listeners to dynamically generated elements
* Using the Clipboard API to copy generated URLs
* Persisting application data with `localStorage`
* Preventing duplicate URLs from being submitted
* Deploying a Node.js backend to a cloud service
* Connecting a deployed frontend application to a deployed backend service

## Author

* Frontend Mentor - [@bigmum0a-wq](https://www.frontendmentor.io/profile/bigmum0a-wq)

