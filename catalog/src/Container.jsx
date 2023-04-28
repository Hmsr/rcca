import React from 'react';

function Container({ children }) {
  return (
    <div className="flex flex-row h-screen">
      {children}
    </div>
  );
}

export default Container;
