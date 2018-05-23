import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
      return (
        <React.Fragment>
          <h1>{this.props.title}</h1>
          {this.props.children}
        </React.Fragment>
     );  
    }
}

export default Header;