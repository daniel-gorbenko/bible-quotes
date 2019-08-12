let fs = require('fs');
let ruSynodal = require('../assets/ru_synodal_updated.json');

const getBible = () => {
  return new Promise((resolve, reject) => {
    resolve(ruSynodal);
  });
};

const getBooks = (bible) => {
  return bible.then((data) => {
    return data.map(book => {
      return {abbrev: book.abbrev, name: book.name};
    });
  });
};

const getBookByAbbrev = (bible, bookAbbrev) => {
  return bible.filter(book => {
    return book.abbrev === bookAbbrev;
  })[0];
};

class BooksRepository {
  constructor() {
    this.bible = getBible();
    this.books = getBooks(this.bible);
  }

  getBooks() {
    return this.books;
  }

  getVerses({bookAbbrev, topic, verseStart, verseEnd}) {
    return this.bible
      .then((bible) => {
        const bookTopic = getBookByAbbrev(bible, bookAbbrev).chapters[topic - 1];
        const verses = [];

        for(let i = verseStart - 1; i < verseEnd; i++) {
          verses.push({index: i + 1, text: bookTopic[i]});
        }

        return verses;
      });
  }
}

module.exports = new BooksRepository();
