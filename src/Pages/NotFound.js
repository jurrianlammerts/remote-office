import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Oops!</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
