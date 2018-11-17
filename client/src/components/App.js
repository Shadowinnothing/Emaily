import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import NotFoundPage from './NotFoundPage';

const Dashboard = () => (<h2>Dashboard</h2>);
const SurveyNew = () => (<h2>SurveyNew</h2>);

class App extends Component {
  componentDidMount(){
    // props comes from the connect method in the export default statement
    // connect()() turns the actions into props
    this.props.fetchUser();
  };

  render(){
    return (
      <div className="container"> {/* <- container Adds spacing on the left and right sides of the app */}
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/" component={Landing} exact />
              <Route path="/surveys" component={Dashboard} exact />
              <Route path="/surveys/new" component={SurveyNew} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  };
};

// connect()() turns the actions into props
export default connect(null, actions)(App);
