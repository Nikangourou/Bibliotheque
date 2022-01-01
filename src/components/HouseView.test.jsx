import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import HouseView from './HouseView';

let houseAlike;
let houseViewComponent;

beforeAll(() => {

});

beforeEach(() => {
  houseAlike = {
    id: 'idMaison',
    name: 'une maison',
    surfaces: [62, 43, 32.336],
    totalSurface: 137.336,
    nbFloors: 3,
  };
  houseViewComponent = shallow(
    <HouseView
      house={houseAlike}
    />,
  );
});

it("Avec les même props, la vue d'une maison ne change pas.", () => {
  expect(toJson(houseViewComponent)).toMatchSnapshot();
});

it("La vue d'une maison expose les bonnes valeurs de surface totale et de nombre d'étages", () => {
  expect(houseViewComponent.find('ul > li').at(0).text()).toMatch(/37.34m2$/);
  expect(houseViewComponent.find('ul > li').at(1).text()).toMatch(/3$/);
});

it("La vue d'une maison expose les différentes surface", () => {
  houseViewComponent.find('ul').at(1).find('li').forEach((node, i) => {
    const prefix = i === 0 ? 'RDC' : `Étage ${i}`;
    expect(node).text().toBe(`${prefix}: ${houseAlike.surfaces[i].toFixed(2)}m2`);
  });
});
