// Import necessary components and libraries from React and react-router-dom
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import page components
import Home from '../pages/Home.jsx';
import Error from '../pages/Error.jsx';
import ShortUrlRedirect from '../pages/ShortUrlRedirect.jsx';

// Define PageRouter component responsible for routing within the application
const PageRouter = () => {

  // API base URL for fetching GET requests
  const pageUrl = import.meta.env.VITE_API_BASE_URL;

  // State to track if the short URL exists
  const [shortUrlExists, setShortUrlExists] = useState(false);

  // useEffect to perform actions on component mount
  useEffect(() => {
    // Extract the short URL link from the window location
    const shortUrlLink = window.location.pathname.substring(1);
    // Function to asynchronously check if the short URL exists in the database
    const checkShortUrl = async () => {
      try {
        // Make a request to the backend to check the short URL existence
        const response = await fetch(`${pageUrl}${shortUrlLink}`);
        const data = await response.json();
        // Update state based on the response from the backend
        setShortUrlExists(data.success);
      } catch (error) {
        console.log('There is no short URL link with this id.');
      }
    };

    // Check the short URL if it exists
    if (shortUrlLink) {
      checkShortUrl();
    }
  }, []);

  // Define routes using Routes and Route components
  return (
    <Routes>
      {/* Route for the Home page */}
      <Route path='/' element={<Home />} />
      {/* Conditional rendering based on the state of shortUrlExists */}
      <Route path='/:shortUrlLink' element={shortUrlExists ? <ShortUrlRedirect /> : <Error />} />
    </Routes>
  );
};

// Export the PageRouter component to make it available for other modules
export default PageRouter;
