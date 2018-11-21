import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

// renders survey form
class SurveyNew extends Component {

  // create-react-app lets us initialize state like this
  state = {showFormReview: false};

  renderContent() {
    if(this.state.showFormReview) {
      return <SurveyFormReview
        onCancel={() => this.setState({showFormReview: false})}
      />;
    }
    return <SurveyForm
      onSurveySubmit={() => this.setState({showFormReview: true})}
    />;
  };

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  };
};

// clears form values when user clicks cancel in new form
// dumps all values when component unmounts
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
