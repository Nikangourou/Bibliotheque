import React, { useContext } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Interrogator from '../model/Interrogator';
import RootStore from '../RootStore';

function InterrogatorView() {
  const store = useContext(RootStore);
  // Initialise l'interrogateur si celui-ci n'existe pas encore
  if (!store.interrogator) {
    store.interrogator = new Interrogator();
  }
  const { interrogator } = store;

  return (
    <Row className={classNames('justify-content-sm-center')}>
      <Col xs={12} sm={12} md={8} lg={6} xl={6}>
        <h1>Interrogateur</h1>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Ma question"
            aria-label="Question à poser"
            aria-describedby="basic-addon2"
            value={interrogator.pendingQuestion}
            onChange={(event) => { interrogator.pendingQuestion = event.target.value; }}
          />
          <Button
            id="btnAskQuestion"
            variant="primary"
            disabled={!interrogator.canAskQuestion}
            onClick={() => { interrogator.askQuestion(); }}
          >
            Poser la question
          </Button>
        </InputGroup>
        <ListGroup className="mb-3">
          {
            interrogator.answers.map(({ id, question, answer }) => (
              <ListGroup.Item key={id}>
                <small>{question}</small>
                <br />
                <strong>{answer}</strong>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
        <Button variant="danger" onClick={() => { interrogator.reset(); }}>Remise à zéro</Button>
      </Col>
    </Row>
  );
}

export default observer(InterrogatorView);
