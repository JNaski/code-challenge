import React from 'react';
import {  Spinner, Row, Col } from 'reactstrap';
import '../css/MainView.css';
import { caesarDecode } from '../util/Caesar';
import { FetchBullShit } from '../service/FetchBullShitService';
import Output from '../component/Output';

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bullshit: [],
      noBullshit: [],
      loading: false
    };
    this.handleMessages = this.handleMessages.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    FetchBullShit().then(result => this.handleMessages(result.bullshits))
  }

  handleMessages(messages) {
    let tmpNoBull = this.state.noBullshit;
    let tmpBull = this.state.bullshit;

    for(let i = 0; i<messages.length; i++) {
      let resp = caesarDecode(messages[i].message);
      if(resp !== '') {
        tmpNoBull.push(resp);
      } else {
        tmpBull.push(messages[i].message);
      }
    }
    this.setState({
      noBullshit: tmpNoBull,
      bullshit: tmpBull,
      loading: false
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="MainView">
        { loading &&
          <div className="SpinnerDiv">
            <Spinner animation="border">
              Loading!
            </Spinner>
            <h3>This might take a while!</h3>
          </div>
        }
        <Row>
        <Col>
        <h2>
          No bullshit
          { (this.state.noBullshit.length !== 0) ? '(' + this.state.noBullshit.length + ')' : '' }
        </h2>
        { (this.state.noBullshit) &&
          this.state.noBullshit.map(function(str, i) {
            return (
              <Output
                sentence={str}
                key={i}
              />
            )
          })
        }
        </Col>
        <Col>
        <h2>
          Bullshit
          { (this.state.bullshit.length !== 0) ? '(' + this.state.bullshit.length + ')' : '' }
        </h2>
        { (this.state.bullshit) &&
          this.state.bullshit.map(function(str, i) {
            return (
              <Output
                sentence={str}
                key={i}
              />
            )
          })
        }
        </Col>
        </Row>
      </div>
    )
  }
}

export default MainView;