import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import MakeSharedStateHookExample from './MakeSharedStateHookExample.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <MakeSharedStateHookExample />
  </React.StrictMode>
);
