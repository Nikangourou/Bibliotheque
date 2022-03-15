import { runInAction, makeAutoObservable } from 'mobx';
import axios from 'axios';
import Member from './Members';

class MemberManager {
    _members = []
    _dataLoading = false;

    constructor() {
        makeAutoObservable(this)
        this.loadMembers()
    }

    get members() {
        if (this._members.length === 0) {
            this.loadMembers()
            return []
        }
        return this._members
    }


    // Changer le create du composant par createMember
    async createMember({ name, firstname, birthday }) {
        const m = await Member.create({ name, firstname, birthday })
        runInAction(() => {
            this._members.push(m)
        })
    }

    async loadMembers() {
        if (this._dataLoading) {
            return
        }
        const url = 'http://localhost:8080/api/v1/rest/members'
        this._dataLoading = true
        try {
            const { data } = await axios.get(url)
            runInAction(() => {
                this._members = data.map(({ id, name, firstname, birthday }) => new Member(id, name, firstname, birthday));
            })
        } catch (error) {
            console.error(error)
        } finally {
            this._dataLoading = false
        }
    }
}

export default MemberManager