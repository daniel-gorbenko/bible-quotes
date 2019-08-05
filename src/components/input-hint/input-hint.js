import React from 'react';

import './input-hint.css';

const InputHint = (props) => {
  return (
    <div className="input-hint">
      <input className="form-control" type="text" value="Иоанна" />
      <input onChange={props.onChange} className="form-control" type="text" value={props.value} />
    </div>
  );
};

export default InputHint;
