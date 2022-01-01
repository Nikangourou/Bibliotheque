import { makeAutoObservable } from 'mobx';
import House from './House';

class HouseManager {
  _houses = [];

  constructor() {
    makeAutoObservable(this);
  }

  get houses() {
    return this._houses;
  }

  get nbHouses() {
    return this._houses.length;
  }

  addHouse(id, name, surfaces = []) {
    if (this._houses.some((h) => h.id === id)) {
      throw new Error('La maison existe déjà');
    }
    const house = new House(id, name, surfaces);
    this._houses.push(house);
    return house;
  }

  removeHouse(house) {
    const houseIdx = this._houses.findIndex((h) => h === house);
    if (houseIdx >= 0) {
      return this._houses.splice(houseIdx, 1)[0];
    }
    throw new Error("La maison n'existe pas");
  }

  get totalSurface() {
    return this._houses.map((house) => house.totalSurface).reduce((s1, s2) => s1 + s2, 0);
  }

  get totalNbFloors() {
    return this._houses.map((house) => house.nbFloors).reduce((nf1, nf2) => nf1 + nf2, 0);
  }

  get averageSurface() {
    return this.totalNbFloors > 0 ? this.totalSurface / this.totalNbFloors : 0.0;
  }
}

export default HouseManager;
