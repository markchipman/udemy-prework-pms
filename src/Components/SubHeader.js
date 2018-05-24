import React from 'react';

const SubHeader = (props) => {
    const style = {
      color: props.color || "blue"
    }
    return (
      <h3 className="app-title">{props.title}</h3>
    );
}

export default SubHeader;