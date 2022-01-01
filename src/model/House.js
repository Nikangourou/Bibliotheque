import { makeAutoObservable } from 'mobx';

class House {
  _id;

  _name;

  _surfaces;

  constructor(id, name, surfaces = []) {
    makeAutoObservable(this);
    this._id = id;
    this._name = name;
    this._surfaces = surfaces;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get surfaces() {
    return this._surfaces;
  }

  get totalSurface() {
    return this._surfaces.reduce((s1, s2) => s1 + s2, 0);
  }

  get nbFloors() {
    return this._surfaces.length;
  }
}

export default House;
