import React, { useState } from 'react';

import InputHint from '../input-hint/input-hint';
import Quote from '../quote/quote';

import './app.scss';

// PATH FORMAT:
// STARTED FROM "/" and DELIMETED BY ";" PATTERN:
// /(\w+)\((\d+)\:(\d+)-(\d+)\)/
// EXAMPLE:
// /foo(1:2-3);bar(1:2-3);

const App = (props) => {

  const [query, setQuery] = useState('Ио');
  const links = parseUrl(props.match.params.path);
  const [quotes, setQuotes] = useState([{title: "Евангелие от Иоанна 12:1-3", order: 0, list: [
    {number: 1, text: "Использовать λ-функции для написания программы в функциональном стиле."},
    {number: 2, text: "Использовать λ-функции для написания программы в функциональном стиле."}
  ]}]);

  function parseUrl(url) {
    const links = url.split(';');

    if(links.length > 0) {
      links[0] = links[0].slice(1);

      delete links[links.length];
    }

    const pattern = /(\w+)\((\d+)\:(\d+)-(\d+)\)/;

    return links.map(link => link.match(pattern));
  }
  function onInputChange(e) {
    setQuery(e.target.value);
  }
  function createQuote(data) {
    setQuotes(state => {
      return state.concat({title: query, order: quotes[quotes.length - 1].order + 1, list: [
        {number: 1, text: "Использовать λ-функции для написания программы в функциональном стиле."}
      ]});
    });
  }

  return (
    <div className="app">
      <div className="app__header">
        <div className="container">
          <div className="row">
            <div className="col">
              <InputHint value={query} onChange={onInputChange}/>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={createQuote}>Добавить</button>
            </div>
          </div>
        </div>
      </div>

      <div className="app__content">
        <div className="app__content-title">
          <div className="container-fluid">
            <div className="row">
              <div className="col"><h2>Синодальный перевод</h2></div>
            </div>
          </div>
        </div>

        <div className="app__content-quotes">
          {quotes.map(quote => {
            return <Quote key={quote.order} {...quote} />
          })}
        </div>
      </div>

      <div className="app__footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col"><button className="btn btn-success btn-block">Сохранить как изображение</button></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// <!-- <div className="app__content-empty">
//   Вы не добавили ни одной цитаты
// </div> -->

// <!-- <div className="app__content-loading">
//  Загрузка ...
// </div> -->
