import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

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
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('От Матфея 5:1-12');
  const [hint, setHint] = useState(query);
  const links = parseUrl(props.match.params.path);
  const [quotes, setQuotes] = useState([]);

  const saveAsImage = () => {
    html2canvas(document.getElementById('content-for-image'))
      .then((canvas) => {
          var link = document.createElement('a');

          link.download = 'bible-quotes.png';
          link.href = canvas.toDataURL("image/png");

          link.click();
      });
  };

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

  const setSimilarHint = (query) => {
    const pattern = new RegExp(`^${query}`);
    let hint = query;

    for(let i = 0, l = books.length; i < l; i++) {
      if(pattern.test(books[i].name)) {
        hint = books[i].name;
        break;
      }
    }

    setHint(hint);
  };

  const onInputChange = (e) => {
    setSimilarHint(e.target.value);
    setQuery(e.target.value);
  }

  const onQuoteAdd = (data) => {
    setIsLoading(true);
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

          setIsLoading(false);

          return state.concat(quote);
        })
      });
  }

  const isEmptyQuotesList = quotes.length === 0;

  const useHint = (e) => {
    e.preventDefault();
    setQuery(hint);
  };

  const onQuoteRemove = (quote) => {
    setIsLoading(true);

    setQuotes(state => {
      if(quote.prev !== null) {
        quote.prev.next = quote.next;
      }

      if(quote.next !== null) {
        quote.next.prev = quote.prev;
      }

      setIsLoading(false);

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

  useEffect(() => {
    api.getBooks()
      .then((response) => {
        setBooks(books => {
          setIsLoading(false);

          return response.data.sort();
        });
      })
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <div className="container">
          <div className="row">
            <div className="col">
              <InputHint hint={hint} value={query} onUseHint={useHint} onEnter={onQuoteAdd} onChange={onInputChange}/>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={onQuoteAdd}>Добавить</button>
            </div>
          </div>
        </div>
      </div>

      <div className="app__content">
        <div className={`app__content-empty ${(!isEmptyQuotesList || isLoading) ? 'hidden' : ''}`}>
         Вы не добавили ни одной цитаты
        </div>

        <div className={`app__content-empty ${!isLoading ? 'hidden' : ''}`}>
         Загрузка ...
        </div>

        <div id="content-for-image">
          <div className={`app__content-title ${(isEmptyQuotesList || isLoading) ? 'hidden' : ''}`} >
          <div className="container-fluid">
            <div className="row">
              <div className="col"><h2>Синодальный перевод</h2></div>
            </div>
          </div>
        </div>

        <div className={`app__content-quotes ${(isEmptyQuotesList || isLoading) ? 'hidden' : ''}`}>
          {mapListBy(getFirstQuote(quotes), 'next', (quote, index) => {
            return <Quote onRemove={(e) => onQuoteRemove(quote)} key={index} {...quote} />;
          })}
        </div>
        </div>
      </div>

      <div className="app__footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <button className="btn btn-success btn-block" onClick={saveAsImage}>Сохранить как изображение</button>
            </div>
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
