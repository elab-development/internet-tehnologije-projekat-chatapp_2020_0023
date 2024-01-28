 
import React from 'react';

const InputField = ({ type, name, placeholder, value, onChange, ...rest }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}  
    />
  );
};

export default InputField;
