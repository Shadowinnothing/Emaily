import React, {Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component {

  renderContent(){
    switch(this.props.auth){
      case null:
        return; // <- dont show anything on right side of header if page is still loading
      case false:
        return ( // <- link to login page if not logged in
          <li><a href="/auth/google">Login With Google</a></li>
        );
      default:
        return <li><a href="/api/logout">Logout</a></li>; // <- just some weight, needs to be changed when billing is introduced
    }
  };

  render(){
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
