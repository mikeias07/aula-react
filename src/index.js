import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './Autor';
import LivroBox from './Livro';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


ReactDOM.render(
    (<Router>
        <App>
            <switch>
                <Route exact path="/" component={Home} />
                <Route path="/autor" component={AutorBox} />
                <Route path="/livro" component={LivroBox} />
            </switch>

        </App>

    </Router>),
    document.getElementById('root')
);