import React, {Component} from 'react';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

// renders survey form
class SurveyNew extends Component {

  // create-react-app lets us initialize state like this
  state = {showFormReview: false};

  renderContent() {
    if(this.state.showFormReview) {
      return <SurveyFormReview />;
    };
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

export default SurveyNew;
