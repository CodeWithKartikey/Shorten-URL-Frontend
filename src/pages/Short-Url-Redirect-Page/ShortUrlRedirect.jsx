// Importing necessary components and hooks from React
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Importing styles
import './ShortUrlRedirect.css';

// Component for redirecting short URLs to long URLs
const ShortUrlRedirect = () => {
  
  // Extracting short URL link from the URL parameters
  const { shortUrlLink } = useParams();

  useEffect(() => {
    // Function to get the long url link from the database
    const fetchLongUrlLink = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/${shortUrlLink}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // Check if the response is successful
        if (response.ok) {
          const data = await response.json();
          // If short URL is found, redirect to the original URL
          window.location.href = data.longUrlLink;
        } else if (response.status === 404) {
          // If short URL is not found, handle the error
          console.log('Short URL link not found');
        } else {
          // Handle other errors
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    // Call the fetchLongUrlLink method
    fetchLongUrlLink();
  }, [shortUrlLink]);

  return (
    <div className='short-url-redirect'>
      {/* Displaying a message while redirecting */}
      <h1>Redirecting...</h1>
    </div>
  );
};

export default ShortUrlRedirect;
