/* eslint-disable */
import _ from 'lodash';
import React from 'react';

import VisitHeader from './VisitHeader';

export default class VisitTable extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      width: props.standardWidth || 100,
      style: props.style || {}
    };

    this.moveVisit = this.moveVisit.bind(this);
  }

  moveVisit() {}

  render() {
    const { cols } = this.props;
    const headers = _.map(_.range(cols), (col) => { return (<th key={col + 1}><VisitHeader style={{width: `${this.state.width}px`}} id={`visit_${col + 1}`} index={col} moveVisit={this.moveVisit} title={`Visit ${col + 1}`} /></th>);})

    return(
      <div className={this.props.className} ref="visitContainer">
        <table style={{ ...this.state.style }}>
          <thead>
            <tr>{ headers }</tr>
          </thead>
        </table>
      </div>
    );
  }
}
