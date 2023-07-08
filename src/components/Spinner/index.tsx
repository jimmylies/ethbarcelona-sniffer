import React from 'react';
import { SpinnerCircular } from 'spinners-react';
import './index.css';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Spinner = ({ size = 50, ...props }: SpinnerProps) => {
  return (
    <div className='Spinner' {...props}>
      <SpinnerCircular
        color='#57dca3'
        secondaryColor='transparent'
        size={size}
        speed={150}
      />
    </div>
  );
};

export default Spinner;
