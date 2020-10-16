import { any } from 'prop-types';
import React, { lazy, Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

const Index = lazy(() => import('./pages/Index'));
const MarkdownContent = lazy(() => import('./pages/content'));

interface Props {

}

export const App = (props: Props) => {

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/MarkdownContent/:id" component={MarkdownContent}/>
        </Switch>
      </HashRouter>
    </Suspense>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
