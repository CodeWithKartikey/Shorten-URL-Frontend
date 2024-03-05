// Importing necessary components and hooks from React
import React, { useState, useRef, useCallback } from 'react';

// Importing styles
import './Home.css';

// Define a functional component named Home
const Home = () => {

  // State variables for managing long url link and generated short url link
  const [longUrlLink, setLongUrlLink] = useState(''); 
  const [shortUrlLink, setShortUrlLink] = useState('');

  // Reference for the generated short url link input field
  const ShortenUrlLinkRef = useRef(null); 

  // Event handler for long url link input change
  const handleChange = (e) => {
    setLongUrlLink(e.target.value); 
  }

  // Function to generate a short url link from the long url link
  const generateShortUrlLink = async () => {
    if(longUrlLink.length > 0) {
      try {
        const response = await fetch('https://shorten-url-backend-kd1k.onrender.com/api/v1/shorten-url-link', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ longUrlLink })
        });
  
        if (!response.ok) {
          throw new Error("Failed to generate short url link.");
        }
  
        const data = await response.json();
        const fullShortUrlLink = `https://react-shorten-url-app.vercel.app/${data.shortUrlLink}`;
        setShortUrlLink(fullShortUrlLink);
        
        setLongUrlLink('');
      } catch (error) {
        console.log("Error in generating short url link.");
      }
    } else {
      alert("Please enter the long URL into the input field.");
    }
  };

  // Function to reset the long url link input field
  const resetLongUrlLink = () => {
    setLongUrlLink('');
  }

  // Function to copy the generated short url link to the clipboard
  const copyShortUrlLinkToClipboard = useCallback(() => {
    ShortenUrlLinkRef.current?.select();
    ShortenUrlLinkRef.current?.setSelectionRange(0, 999); 
    window.navigator.clipboard.writeText(shortUrlLink);
  }, [shortUrlLink]);

  // JSX for the component
  return (
    <>
      <div className='shorten-url'>
        <h1>Shorten-URL</h1>
        <div className='long-url-link-container'>
          <div className='long-url-link-form'>
            <label htmlFor="longUrlLink">Long URL :</label>
            <input 
              type='text' 
              id='longUrlLink' 
              name='longUrlLink' 
              placeholder='Enter your long URL here' 
              autoComplete='off' 
              autoCapitalize='off' 
              value={longUrlLink} 
              onChange={handleChange}
            />
          </div>
          <div className='btn'>
            <button className='input-btn' onClick={generateShortUrlLink}>Generate</button>
            <button className='reset-btn' onClick={resetLongUrlLink}>Reset</button>
          </div>
          
          <span className='line'></span>

          {
            // Render if a short URL link is generated
            shortUrlLink 
            ? 
            ( 
              <div className='short-url-link-form'>
                <label htmlFor='shortUrlLink'>Generated Short URL :</label>
                <div className='short-url-link-form-container'>
                  <input 
                    type='text'
                    id='shortUrlLink' 
                    name='shortUrlLink'
                    autoComplete='off' 
                    value={shortUrlLink} 
                    ref={ShortenUrlLinkRef} 
                    readOnly 
                  />
                  <button className='output-btn' onClick={copyShortUrlLinkToClipboard}>Copy</button>
                </div>
              </div>
            )
            :
            (
              <h3 className='display'>Please Generate Short URL - No Data To Display</h3>
            )
          }
        </div>
      </div>
    </>
  );
}

// Export the Home component as the default export
export default Home;
