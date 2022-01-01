import HouseManager from './model/HouseManager';

const STORE = {
  houseManager: new HouseManager(),
  interrogator: null, // sera créé à la demande
};

// Quelques exemples de maisons
STORE.houseManager.addHouse('pm', 'Petite maison', [76]);
STORE.houseManager.addHouse('mm', 'Moyenne maison', [66, 44.5]);
STORE.houseManager.addHouse('gm', 'Grande maison', [80, 60, 60]);

export default STORE;
