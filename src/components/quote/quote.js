import React from 'react';

import './quote.css';

const Quote = (props) => {
  return (
    <div className="quote app__content-quotes-item">
      <div className="quote__title">{props.title}</div>

      <div className="quote__list">
        {props.list.map((verse, index) => {
          return (
            <div key={index} className="quote__verse">
              <div className="quote__verse-number">{}</div>
              <div className="quote__verse-text">{verse}</div>
            </div>
          );
        })}
      </div>

      <div className="quote__actions">
        <button onClick={(e) => {props.onRemove(e)}} className="btn btn-sm btn-danger">Удалить</button>
      </div>
    </div>
  );
};

export default Quote;
