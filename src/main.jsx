import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { ErrorBoundary } from './App';
import './styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><App /></ErrorBoundary>);
