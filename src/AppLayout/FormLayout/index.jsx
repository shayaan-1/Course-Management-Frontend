import React from 'react';

const FormLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
