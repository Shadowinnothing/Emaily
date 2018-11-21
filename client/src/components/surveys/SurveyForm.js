import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails';

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
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>
          </button>
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">cancel</i>
          </Link>
        </form>
      </div>
    );
  };
};

// error handling to make sure the form is valid
// object contains values of survey body, title, emails, subjects
function validate(values) {
  const errors = {};

  // return array of invalid arrays
  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, ({name}) => {
    if(!values[name]){
      errors[name] = `You must provide the ${name}`;
    }
  });

  return errors; // empty objects pass!
};

export default reduxForm({
  form: 'surveyForm',
  validate
})(SurveyForm);
