import React, { useState, useEffect } from 'react';

import InputHint from '../input-hint/input-hint';
import Quote from '../quote/quote';

import api from '../../api';

import './app.scss';

// PATH FORMAT:
// STARTED FROM "/" and DELIMETED BY ";" PATTERN:
// /(\w+)\((\d+)\:(\d+)-(\d+)\)/
// EXAMPLE:
// /foo(1:2-3);bar(1:2-3);

const App = (props) => {
  const [books, setBooks] = useState();
  const [query, setQuery] = useState('Исход 4:5-8');
  const [hint, setHint] = useState('Исход 4:5-8');
  const links = parseUrl(props.match.params.path);
  const [quotes, setQuotes] = useState([{title: "Евангелие от Иоанна 12:1-2", prev: null, next: null,
    list: [
      {index: 1, text: "Использовать λ-функции для написания программы в функциональном стиле"},
      {index: 2, text: "Использовать λ-функции для написания программы в функциональном стиле."},
  ]}]);

  useEffect(() => {
    api.getBooks()
      .then((response) => {
        setBooks(response.data);
      });
  }, []);

  function parseQuery(query) {
    const pattern = /((\d?[а-яА-Я]*\s)?[а-яА-Я]+)\s+(\d+)\:(\d+)\-(\d+)/;

    const matched = query.match(pattern);

    return {
      bookName: matched[1],
      topic: matched[3],
      verseStart: matched[4],
      verseEnd: matched[5],
    };
  }

  function match(url) {
    const pattern = /(\w+)\((\d+)\:(\d+)-(\d+)\)/;

    return url.match(pattern);
  }

  function parseUrl(url) {
    const emptyArray = [];

    if(!url) return emptyArray;

    const links = url.split(';');

    if(links.length > 0) {
      links[0] = links[0].slice(1);

      delete links[links.length];
    }

    return links.map(link => match(link));
  }

  const getAbbrevByName = (bookName) => {
    return books.filter(book => {
      return book.name === bookName;
    })[0].abbrev;
  };

  const onInputChange = (e) => {
    setQuery(e.target.value);
  }

  const onQuoteAdd = (data) => {
    const parsedQuery = parseQuery(query);

    api.getVerses({
      bookAbbrev: getAbbrevByName(parsedQuery.bookName),
      topic: parsedQuery.topic,
      verseStart: parsedQuery.verseStart,
      verseEnd: parsedQuery.verseEnd
    })
      .then((response) => {
        setQuotes(state => {
          const lastQuote = getLastQuote(state);
          const quote = {title: query, prev: lastQuote, next: null,
            list: response.data
          };

          if(lastQuote !== null) {
             lastQuote.next = quote;
          }

          return state.concat(quote);
        })
      });
  }

  const useHint = (e) => {
    e.preventDefault();
    setQuery(hint);
  };

  const onQuoteRemove = (quote) => {
    setQuotes(state => {
      if(quote.prev !== null) {
        quote.prev.next = quote.next;
      }

      if(quote.next !== null) {
        quote.next.prev = quote.prev;
      }

      return [].concat(
        state.slice(0, state.indexOf(quote)),
        state.slice(state.indexOf(quote) + 1)
      );
    });
  };

  const getFirstQuote = (quotes) => {
    const filteredQuotes = quotes.filter((quote) => {
      return quote.prev === null;
    });

    return (filteredQuotes.length === 1) ? filteredQuotes[0] : null;
  };

  const getLastQuote = (quotes) => {
    const filteredQuotes = quotes.filter((quote) => {
      return quote.next === null;
    });

    return (filteredQuotes.length === 1) ? filteredQuotes[0] : null;
  };

  const mapListBy = (startItem, prop, fn) => {
    if(startItem === null) return null;

    const returnItems = [];
    let currentItem = startItem;

    for(let i = 0; currentItem !== null; i++) {
      returnItems.push(fn(currentItem, i));

      currentItem = currentItem[prop];
    }

    return returnItems;
  };

  return (
    <div className="app">
      <div className="app__header">
        <div className="container">
          <div className="row">
            <div className="col">
              <InputHint hint={hint} value={query} onUseHint={useHint} onChange={onInputChange}/>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={onQuoteAdd}>Добавить</button>
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
          {mapListBy(getFirstQuote(quotes), 'next', (quote, index) => {
            return <Quote onRemove={(e) => onQuoteRemove(quote)} key={index} {...quote} />;
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
