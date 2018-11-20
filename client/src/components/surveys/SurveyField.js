import React from 'react';

// contains logic to render a single
// label and text input
export default ({input, label, meta: {error, touched}}) => {
  return (
      <div>
        <label>{label}</label>
        <input {...input} style={{marginottom: '5px'}}/>

        <div className="red-text" style={{marginBottom: '20px'}}>
          {touched && error}
        </div>
      </div>
  );
};
