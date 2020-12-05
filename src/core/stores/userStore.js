import {observable, action, computed} from 'mobx'

class UserStore{
  
    @observable name =  null
    @observable surname = null
    @observable lastname = null
    @observable email = null
    @observable phone = null
    @observable status = false
    @observable regdate = null
    @observable changedate = null

    @computed get newUser() {
        const {
            name, surname, lastname, email, phone, status, regdate, changedate
        } = this
        return {
            name, surname, lastname, email, phone, status, regdate, changedate
        }
    }

    @action setName = (name) => {
        this.name = name
    }

    @action setSurname = (surname) => {
        this.name = name
    }

    @action setLastname = (lastname) => {
        this.name = name
    }

    @action setEmail = (email) => {
        this.name = name
    }

    @action setPhone = (phone) => {
        this.name = name
    }

    @action createUser = () => {
        const user = this.newUser
        console.log('user: ', user);
    }

}

const userStore = new UserStore
export default userStore