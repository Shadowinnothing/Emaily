import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import _ from 'lodash';

import SurveyField from './SurveyField'

const FIELDS = [
  {label: 'Survey Title', name: 'title'},
  {label: "Subject Line", name: 'subject'},
  {label: 'Email Body', name: 'body'},
  {label: 'Recipients List', name: 'emails'}
];

// shows a form for a user to add input
class SurveyForm extends Component {

  renderFields(){
    return _.map(FIELDS, ({label, name, key}) => {
      return <Field component={SurveyField} type="text" label={label} name={name} key={name} />
    });
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
