import React from 'react';
import { Row, Col } from 'reactstrap';
import Navigation from './Navigation';
import MainView from './MainView';

class Root extends React.Component {

  render() {
    return (
      <div className="Root">
        <Row className="AppRow">
          <Col xs="1">
            <Navigation />
          </Col>
          <Col>
            <MainView />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Root;