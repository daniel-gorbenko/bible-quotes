import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/app/app';

const Index = (props) => {
  return (
    <Router>
      <Route path="/:path?" component={App}></Route>
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));


      // <Switch>
        // <Route path="/:book\(:topic\::verseStart-:verseEnd\);" component={App}></Route>
        // <Route component={() => <h1>404 страница</h1>}></Route>
      // </Switch>
