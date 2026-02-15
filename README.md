# Reddit-Client
A browser-based Reddit client that displays multiple subreddits in separate, customizable lanes. Built with React, this app fetches posts from Reddit’s JSON feed and allows you to add, refresh, and remove subreddit lanes. Your custom layout is saved in localStorage and restored on reload.

![App Screenshot](122742.png
)

## Features
- Add Subreddit Lanes – Enter any subreddit name to fetch its latest posts and display them in a new lane.

- Duplicate Check – Prevents adding the same subreddit twice.

- Lane Limit – Currently limited to 3 lanes .

- Refresh Individual Lane – Fetch the latest posts for a specific subreddit without reloading the whole page.

- Remove Lanes – Delete a lane with a single click.

- Persistent Layout – Your lanes are saved in localStorage and restored when you return.

- Loading & Error States – User-friendly feedback while fetching data.

## Tech Stack
- React
- Css
- LocalStorage
- Reddit Api

## Installation
1. Clone the repository:
  ```bash
  git clone https://github.com/slinkeres/Reddit-Client
  cd Reddit-Client
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Start the development server:
  ```bash
   npm run dev
  ```

## How to Use
1. Type a subreddit name (reactjs, programming) into the input field.
2. Click Add Subreddit or press Enter.
3. A new lane appears the subreddit's posts (title, author, score).
4. Use the X button to remove lane.
5. Use the ↻ button to refresh that lane's posts.
6. The app saves your lanes automatically - refresh the page and they'll still be there.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## ⭐️ Star Us
If you like this project, please give us a star on GitHub! Your support helps us grow and improve the project.

## Note
This project was created as a practice exercise for API integration, state management, and dynamic UI development.

https://roadmap.sh/projects/reddit-client

