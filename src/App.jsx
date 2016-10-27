import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <DragDropTable rows={5} cols={4} />
      </div>
    );
  }
}
