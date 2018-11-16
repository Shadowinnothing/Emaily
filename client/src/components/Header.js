import React, {Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component {

  renderContent(){
    console.log('auth', this.props.auth)
    switch(this.props.auth){
      case null:
        return 'Still deciding'
      case false:
        return 'User Logged Out'
      default:
        return 'User Logged in'
    }
  };

  render(){
    console.log('props', this.props)
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo" href="/">
            Emaily
          </a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  };
};

// pulls auth off of the state
function mapStateToProps({auth}){
  return {auth};
};

export default connect(mapStateToProps)(Header);
