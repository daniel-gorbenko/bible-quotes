const base = 'http://localhost:8080';

class Api {
  constructor() {

  }

  getBooks() {
    return fetch(`${base}/books`)
      .then((response) => {
        return response.json();
      });
  }

  getVerses({bookAbbrev, topic, verseStart, verseEnd}) {
    return fetch(`${base}/books/${bookAbbrev}/${topic}/${verseStart}-${verseEnd}`)
      .then((response) => {
        return response.json();
      });
  }
}

export default new Api();
