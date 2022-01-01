import React from 'react';
import classNames from 'classnames';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Welcome() {
  return (
    <Row className={classNames('justify-content-sm-center')}>
      <Col xs={12} sm={8} md={6} lg={6} xl={4}>
        <h1>
          Bienvenue dans cette application de base &lsquo;
          {APP_ENV.APP_TITLE}
          &rsquo; !
        </h1>
        <Alert variant="info">
          Ceci est un composant basique.
        </Alert>
      </Col>
    </Row>
  );
}

export default Welcome;
