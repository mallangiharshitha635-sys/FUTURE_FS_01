# Personal Professional Portfolio Website

A modern, responsive, and beautifully designed personal portfolio website built with HTML5, CSS3, and Vanilla JavaScript. It features glassmorphism effects, smooth animations, and a responsive layout designed to look premium on both mobile and desktop screens.

## Features

- **Responsive Design**: Works perfectly on mobile, tablet, and desktop viewports.
- **Glassmorphism Theme**: Uses a dark, modern aesthetic with glassmorphism effects and vibrant neon accents.
- **Smooth Animations**: Includes intersection observers to trigger fade and slide animations as the user scrolls.
- **Dynamic Navbar**: Changes background opacity on scroll and highlights the active section via ScrollSpy.
- **Contact Form Simulation**: A fully styled contact form that simulates a submission to a backend API visually.

## File Structure

```
c:/Users/Student/Desktop/portfolio/
├── index.html      # Main HTML structure
├── styles.css      # Custom CSS utilizing Grid, Flexbox, and CSS Variables
├── script.js       # Logic for scroll spy, animations, mobile menu, and form submission
└── README.md       # Project documentation
```

## How to Run Locally

Since this is a static website and the environment does not have Node.js installed, you do not need to install any dependencies or start a server.

1. Open the `portfolio` directory on your machine: `c:/Users/Student/Desktop/portfolio/`
2. Double click `index.html` to open it in your default web browser (or right-click and choose "Open with Chrome/Edge/etc").

## How to Deploy

To deploy this static site:

1. **GitHub Pages (Free)**
   - Create a new repository on GitHub.
   - Upload all files (`index.html`, `styles.css`, `script.js`, `README.md`) to the repository.
   - Go to Settings > Pages, select the `main` branch, and click Save.
   - Your site will be live at `https://[your-username].github.io/[repo-name]`.

2. **Vercel or Netlify (Free)**
   - Create an account on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
   - Drag and drop your `portfolio` folder into the deployment section.
   - The platform will automatically deploy your static site and give you a live URL.
