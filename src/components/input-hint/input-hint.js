import React, {useState} from 'react';

import './input-hint.css';

const InputHint = (props) => {
  const onKeyPress = (e) => {
    if(e.key === 'Tab') {
      props.onUseHint(e);
    }

    if(e.key === 'Enter') {
      props.onEnter(e);
    }
  };

  return (
    <div className="input-hint">
      <input className="form-control" type="text" value={props.hint} readOnly />
      <input onKeyDown={onKeyPress} onChange={props.onChange} className="form-control" type="text" value={props.value} />
    </div>
  );
};

export default InputHint;
