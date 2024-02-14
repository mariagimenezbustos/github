# GitHub Repository Search App

## Description
This project is a React-based web application that allows users to search for a GitHub user and view a list of their repositories. The user can filter repositories by name and/or programming language. The interface utilizes the official GitHub API for fetching user repositories.

## Steps to Run the Project
1. Clone the repository to your local machine:
```
git clone https://github.com/mariagimenezbustos/github.git
cd github
```
2. Install the required dependencies:
```
npm install @octokit/rest
npm install react-router-dom
npm install moment
npm install @primer/octicons-react
```
3. Add a file for your environment (`.env`) in the project's root, and add your GitHub token.
4. Run the development server:
```
npm run dev
```

## Future Improvements
- **Improve Styling in the Home Page**: Enhance the visual appeal and user experience of the Home page.
- **Enhanced Username Filtering**: Allow the Home page input to filter users not only by the exact username but also by similar results, providing a more flexible search experience.
- **Expand User Information**: Extend the application to display not only a user's repositories but also their Overview and Projects pages.
- **Graph of GitHub Pushes/Commits**: Include a visual representation, such as a graph, to show the frequency of GitHub pushes/commits in the repository list.

## Deployed Version
Visit the deployed version of the app on [Netlify](https://marias-github.netlify.app/).
