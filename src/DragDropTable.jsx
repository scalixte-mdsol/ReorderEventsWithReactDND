/* eslint-disable */
import _ from 'lodash';
import React from 'react';
import update from 'immutability-helper';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import DragDropVisit from './DragDropVisit';

// @DragDropContext(HTML5Backend)
class DragDropTable extends React.Component {
  constructor(props) {
    	super(props);
    	// const {rows, cols} = this.props;
      // this.state = {
      // 	headers: _.map(_.range(cols), (col) => { return (<th key={col + 1}><DragDropVisit id={`visit_${col + 1}`} index={col} moveVisit={this.moveVisit} title={`Visit ${col + 1}`} /></th>);})
      // };
      // this.state = { headers: null };
      // console.log('....constructor', this.state);
      this.moveVisit = this.moveVisit.bind(this);
      const {rows, cols} = this.props;
      this.state = {
      	headers: _.map(_.range(cols), (col) => { return (<th key={col + 1}><DragDropVisit id={`visit_${col + 1}`} index={col} moveVisit={this.moveVisit} title={`Visit ${col + 1}`} /></th>);})
      };
      console.log('....constructor', this.state);
    }

  // componentWillReceiveProps(props) {
  //   const {rows, cols} = props;
  //   this.setState({
  //     ...this.state, headers: _.map(_.range(cols), (col) => { return (<th key={col + 1}><DragDropVisit id={`visit_${col + 1}`} index={col} moveVisit={this.moveVisit} title={`Visit ${col + 1}`} /></th>);})
  //   });
  // }

  moveVisit(dragIndex, hoverIndex) {
    console.log('dragIndex', dragIndex);
    console.log('hoverIndex', hoverIndex);
    console.log('....moving', this.state);
    console.log('fynctionn', this);
  	const { headers } = this.state;
  	const dragVisit = headers[dragIndex];

  	this.setState(update(this.state, {
    	headers: {
      	$splice: [
        	[dragIndex, 1],
        	[hoverIndex, 0, dragVisit]
      	]
    	}
  	}));
  }

 	render() {
    return(
    	<table>
    	  <thead><tr>{this.state.headers}</tr></thead>
        <tbody><tr></tr></tbody>
    	</table>
    );
  }
 }
export default DragDropContext(HTML5Backend)(DragDropTable);
