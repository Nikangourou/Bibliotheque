import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import ListGroup from 'react-bootstrap/ListGroup';

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

function HouseView({ house }) {
  return (
    <>
      <h2 className={classNames('mb-2', 'text-info')}>{house.name}</h2>
      <ul>
        <li>
          <small>
            Surface totale:&nbsp;
            {printSurface(house.totalSurface)}
          </small>
        </li>
        <li>
          <small>
            Nombre d&lsquo;étages:
            {house.nbFloors}
          </small>
        </li>
      </ul>
      <ListGroup>
        {
          house.surfaces.map((surface, floorIdx) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListGroup.Item key={floorIdx}>
              {floorIdx > 0 ? `Étage ${floorIdx}` : 'RDC'}
              {' '}
              :&nbsp;
              {printSurface(surface)}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </>
  );
}

HouseView.propTypes = {
  house: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surfaces: PropTypes.arrayOf(PropTypes.number).isRequired,
    totalSurface: PropTypes.number.isRequired,
    nbFloors: PropTypes.number.isRequired,
  }).isRequired,
};

export default observer(HouseView);
