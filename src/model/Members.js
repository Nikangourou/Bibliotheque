import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx'
import MemberManager from './MemberManager';

class Member {
    _id;

    _name;

    _firstname;

    _birthday;

    _loans;

    constructor(id, name, firstname, birthday, loans = null) {
        makeAutoObservable(this);
        this._id = id;
        this._name = name;
        this._firstname = firstname;
        this._birthday = new Date(birthday);
        this._loans = loans;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name
    }

    get firstname() {
        return this._firstname
    }

    get birthday() {
        return this._birthday
    }

    get printableBirthday() {
        return this._birthday ? this._birthday.toString() : "date inconue"
    }

    get numLoans() {
        return this._loans ? this._loans.length : 0
    }

    get minor(){
        if(this.birthday){
            return(new Date() - this.birthday) / MS_IN_YEAR < MAJORITY_YEARS
        }
        return false
    }

    async refresh() {
        const url = `http://localhost:8080/api/v1/rest/members/${this._id}`
        const { data } = await axios.get(url)
        runInAction(() => {
            this._name = data.name
            this._firstname = data.firstname
            this._birthday = new Date(data.birthday)
            this._loans = data.loans
        })
    }

    async update({ name, firstname, birthday }) {
        const { data } = await axios.put(`http://localhost:8080/api/v1/rest/members/${this._id}`, {
            id: this._id, name, firstname, birthday,
        })
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            },2000)
        })

        runInAction(() => {
            this._name = data.name
            this._firstname = data.firstname
            this._birthday = data.birthday instanceof Date ?
                data.birthday : new Date(data.birthday)
        })
        return this;
    }

    static async create({ name, firstname, birthday }) {
        const { data } = await axios.post(`http://localhost:8080/api/v1/rest/members`, {
            name, firstname, birthday,
        })  
        return new Member(data.id, data.name, data.firstname, data.birthday);
    }
}

export default Member