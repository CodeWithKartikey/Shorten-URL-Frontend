// Importing necessary components and libraries from React and react-router-dom
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Importing the Page Router component
import PageRouter from './routes/PageRouter.jsx';

// App component responsible for rendering the application
const App = () => {
  // Rendering the Home component
  return (
    <Router>
      <PageRouter />
    </Router>
  );
};

// Exporting the App component to make it available for other modules
export default App;
