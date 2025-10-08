📰 NovaTra News

NovaTra News is a dynamic, client-side news aggregation platform that delivers personalized and trending articles to users in real time. It provides intelligent recommendations based on stored preferences such as recent searches, applied filters, and saved news items. The application is built using modern JavaScript (ES Modules) with modular architecture and responsive front-end design.



🚀 Overview

The application interacts with a public news API to fetch and render data dynamically without page reloads. It supports client-side data persistence using localStorage, allowing users to save and revisit articles or maintain their preferred content categories. Its fully responsive layout ensures accessibility and consistent performance across all screen sizes.



✨ Core Features

Personalized Feed (“For You”) — Automatically curates content based on previously viewed, saved, or filtered topics.

Search and Filter System — Enables users to search by keywords and apply filters for precise article discovery.

Persistent Storage — Uses localStorage to remember user preferences, saved items, and filters even after refresh.

Dynamic Pagination — Implements a “Load More” system to fetch additional news results seamlessly.

Error Handling and Fallbacks — Safely handles invalid JSON data or empty localStorage without breaking the UI.

Mobile Responsiveness — Adapts all interface elements for smaller devices using CSS media queries and dynamic JS control.

Interactive UI Elements — Smooth navigation, animated menu transitions, and intuitive category browsing.



🧰 Tech Stack

Frontend: JavaScript (ES6+), HTML5, CSS3

Data Handling: Fetch API, JSON

Storage: LocalStorage

Deployment: Netlify (Static Hosting / JAMstack)



🧩 Architecture

The project is organized in modular JavaScript files:

fetch.js handles API requests and pagination state.

displayNews.js (or suggested.js) manages dynamic DOM rendering and event handling.

Data is cached and retrieved through localStorage keys for smooth UX continuity.



📈 Future Improvements

Integration with live News APIs such as NewsAPI or Mediastack for broader coverage

User authentication for cloud-based saved news synchronization

Theme customization (light/dark mode persistence)

Enhanced accessibility compliance (ARIA roles, semantic elements)



🌐 Live Demo

👉 https://novatra-news.netlify.app/
