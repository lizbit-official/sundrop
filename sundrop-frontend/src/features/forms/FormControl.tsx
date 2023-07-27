import React from 'react';

interface FormControlProps {
  children: React.ReactNode;
}

const FormControl = (props: FormControlProps) => {
  return (
    <div className="FormControl">
      {props.children}
    </div>
  );
};

export default FormControl;
