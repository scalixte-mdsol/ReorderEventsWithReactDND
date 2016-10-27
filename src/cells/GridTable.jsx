/* eslint-disable */
import _ from 'lodash';
import React from 'react';

import StudyCell from './StudyCell';

export default class GridTable extends React.Component {
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
    const { cols, rows } = this.props;
    const style = {...this.state.style, width: `${this.state.width}px`, display: 'block', textAlign: 'center' };
    const cells = _.map(
      _.range(rows), (row) => {
        return (
          <tr key={`row_${row}`}>
            {_.map(_.range(cols), (col) => {
              return (<td key={`${row}_${col}`}><StudyCell style={style} id={`${row}_${col}`} title={`${row}x${col}`} /></td>);
            })}
          </tr>
        );
      }
    );
    return(
      <div className={this.props.className} ref="cellContainer">
        <table style={{ ...this.state.style }}>
          <tbody>
            { cells }
          </tbody>
        </table>
      </div>
    );
  }
}
