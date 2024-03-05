// Importing necessary components and hooks from React and react-router-dom
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing styles
import './Error.css';

// Error component handles 404 errors and redirects to the home page
const Error = () => {
  
  // State to track remaining seconds before redirection
  const [secondsRemaining, setSecondsRemaining] = useState(10);

  // Hook to access navigation functionality
  const navigate = useNavigate();

  // Function to redirect to the home page
  const redirectToHomePage = () => {
    navigate('/');
  };

  // Effect hook to initiate a countdown for redirection
  useEffect(() => {
    // Timer to decrement seconds remaining
    const redirectTimer = setInterval(() => {
      // Decrement seconds remaining if more than 0
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        // Clear interval and redirect when seconds reach 0
        clearInterval(redirectTimer);
        redirectToHomePage();
      }
    }, 1000);

    // Clean up function to clear interval when component unmounts or secondsRemaining changes
    return () => {
      clearInterval(redirectTimer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsRemaining]);

  // Rendering JSX for the error page
  return (
    <>
      <div className='error-container'>
        <div className='error-text'>
          <h1>404 - Page Not Found</h1>
          <h2>The page you are looking for does not exist.</h2>
        </div>
        {/* Display remaining seconds before redirection */}
        <p className='error-subtext'>You will be redirected to the home page in {secondsRemaining} seconds...</p>
      </div>
    </>
  );
};

// Exporting the Error component to make it available for other modules
export default Error;
