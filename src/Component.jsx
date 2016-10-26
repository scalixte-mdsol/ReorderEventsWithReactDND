import React from 'react';
import DragDropTable from './DragDropTable';

export default class Component extends React.Component {
  render() {
    return (
      <div>
        <DragDropTable rows={5} cols={4} />
      </div>
    );
  }
}
