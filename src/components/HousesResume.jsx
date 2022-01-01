import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import RootStore from '../RootStore';

function printSurface(surface) {
  const rSurface = Number(surface).toFixed(2);
  return (
    <span>
      {rSurface}
      m
      <sup>2</sup>
    </span>
  );
}

function HousesResume() {
  const { houseManager } = useContext(RootStore);
  return (
    <Row className={classNames('justify-content-sm-center')}>
      <Col xs={12} sm={8} md={6} lg={6} xl={4}>
        <h1>Résumé de maisons</h1>
        <Alert variant="info">
          Ceci est un composant chargé à la demande.
        </Alert>
        <ListGroup>
          <ListGroup.Item>
            Surface totale:&nbsp;
            {printSurface(houseManager.totalSurface)}
          </ListGroup.Item>
          <ListGroup.Item>
            Surface moyenne:&nbsp;
            {printSurface(houseManager.averageSurface)}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
}

export default observer(HousesResume);
