/* eslint-disable */
import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
// import { update } from 'immutability-helper';
import { findDOMNode } from 'react-dom';
// import HTML5Backend from 'react-dnd-html5-backend';
import visitData from './visitData';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const visitSource = {
  beginDrag(props) {
    console.log('visit source');
		return {
    	id: props.id,
      index: props.index,
      title: props.title
    };
  },
  isDragging(props, monitor) {
    const item = monitor.getItem();
    return props.id === item.id;
  }
};

/**
 * Specifies the props to inject into your component.
 */
// const collect = (connect, monitor) => {
//   return {
//     connectDragSource: connect.dragSource(),
//     connectDropTarget: connect.dropTarget(),
//     isDragging: monitor.isDragging()
//   };
// };


const visitTarget = {
	hover(props, monitor, component) {
  console.log('visit target');
  const dragIndex = monitor.getItem().index;
  const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveVisit(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

// @DropTarget(visitData.VISIT, visitTarget, (connect) => ({
// 	connectDropTarget: connect.dropTarget()
// }))
//
// @DragSource(visitData.VISIT, visitSource, (connect, monitor) => ({
//  	connectDragSource: connect.dragSource(),
// 	isDragging: monitor.isDragging()
// }))

const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};
class DragDropVisit extends React.Component {
	render() {
    console.log(this.props);
  	const {id, index, title, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    console.log(visitData.VISIT);
    console.log(connectDropTarget);

    return connectDragSource(connectDropTarget(
      <span style={{ ...style, opacity }} id={id} className="visit">{title}</span>
    ));
  }
 }

 DragDropVisit.propTypes = {
   id: PropTypes.string.isRequired,
   index: PropTypes.number,
   title: PropTypes.string.isRequired,
   isDragging: PropTypes.bool.isRequired,
   connectDragSource: PropTypes.func.isRequired,
   connectDropTarget: PropTypes.func.isRequired
 }

// @DragDropContext(HTML5Backend)
// export default DragSource(visitData.VISIT, visitSource, collect)(DragDropVisit);
// export DropTarget(visitData.VISIT, visitTarget, collect)(DragDropVisit);

export default flow(
  DragSource(visitData.VISIT, visitSource, collectSource),
  DropTarget(visitData.VISIT, visitTarget, collectTarget))(DragDropVisit);
