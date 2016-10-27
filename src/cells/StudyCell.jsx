/* eslint-disable */
import _ from 'lodash';
import React from 'react';

export default class StudyCell extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      width: props.width || 100,
      style: props.style || {}
    }
  }
  render() {
    const { className, id, title } = this.props;
    const opacity = 1;

    return(
      <span style={{ ...this.state.style, opacity }} id={id} className={className}>{title}</span>
    );
  }
}
