import React from 'react';
import { Row } from 'reactstrap';
import '../css/Output.css';

class Output extends React.Component {

  render() {
    const { sentence } = this.props;

    return (
      <div className="Output">
        <Row className="StrRow">
          { sentence }
        </Row>
      </div>
    )
  }
}

export default Output;