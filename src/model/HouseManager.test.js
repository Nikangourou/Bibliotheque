import House from './House';
import HouseManager from './HouseManager';

jest.mock('./House');

let houseManager;

beforeEach(() => {
  houseManager = new HouseManager();
});

it('Le gestionnaire de maison devrait créer des instance de maisons', () => {
  houseManager.addHouse('idMaison', 'nomMaison', [10, 20, 30]);
  expect(House).toHaveBeenCalledTimes(1);
  expect(House.mock.calls[0][0]).toBe('idMaison');
  expect(House.mock.calls[0][1]).toBe('nomMaison');
  expect(House.mock.calls[0][2]).toHaveLength(3);
  expect(House.mock.calls[0][2]).toEqual(expect.arrayContaining([30, 20, 10]));
});
