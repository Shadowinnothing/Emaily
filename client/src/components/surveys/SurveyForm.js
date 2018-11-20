import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import SurveyField from './SurveyField'

// shows a form for a user to add input
class SurveyForm extends Component {

  renderFields(){
    return (
      <div>
        <Field
          type="text"
          label="Survey Title"
          name="title"
          component={SurveyField}
        />
        <Field
          type="text"
          label="Subject Line"
          name="subject"
          component={SurveyField}
        />
        <Field
          type="text"
          label="Email body"
          name="body"
          component={SurveyField}
        />
        <Field
          type="text"
          label="Recipients List"
          name="emails"
          component={SurveyField}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
};

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
