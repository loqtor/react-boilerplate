import React from 'react';
import { Link } from 'react-router-dom';

export const Example = () => (
  <>
    <h1>This is an example extra route.</h1>
    <Link to="home">Back to home</Link>
  </>
);