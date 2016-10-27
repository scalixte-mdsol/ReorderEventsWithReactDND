/* eslint-disable */
import _ from 'lodash';
import React from 'react';

import VisitTable from './visits/VisitTable';
import GridTable from './cells/GridTable';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      standardWidth: 50,
      style: props.style || {}
    }
  }
  render() {
    const { cols, rows } = this.props;

    return(
      <div className={this.props.className} style={{ ...this.state.style }} ref="gridContainer">
        <table>
          <colgroup>
            <col width={this.state.standardWidth}></col>
          </colgroup>
          <tbody>
            <tr>
              <td><VisitTable standardWidth={this.state.standardWidth} cols={this.props.cols} style={{ ...this.state.style, width: '300px' }} /></td>
            </tr>
              <tr>
                <td><GridTable standardWidth={this.state.standardWidth} cols={this.props.cols} rows={this.props.rows} style={{ ...this.state.style, width: '300px' }} /></td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
