import {observable, action, computed} from 'mobx'
import UserList from '../../components/UserList'

class UserStore{
  
    @observable name =  null
    @observable surname = null
    @observable lastname = null
    @observable email = null
    @observable phone = null
    @observable status = false
    @observable changedate = null
    @observable active = null
    @observable error = ''


    @action setName = (name) => {
        this.name = name
    }

    @action setSurname = (surname) => {
        this.surname = surname
    }

    @action setLastname = (lastname) => {
        this.lastname = lastname
    }

    @action setEmail = (email) => {
        this.email = email
    }

    @action setPhone = (phone) => {
        this.phone = phone
    }

    @action createUser = () => {
        const {name, surname, lastname, email, phone } = this
        const regdate = new Date
        const status = this.status ? 'online' : 'offline'
        const user = {
            name, surname, lastname, email, phone, status, regdate
        }
        console.log('checkFill(user): ', this.checkFill(user));
        if(!this.checkFill(user)) {
            this.addUser(user)
        } else return
    }

    @action addUser = (user) => {
        const usersList = this.getUsersList()
        const { phone } = user
        usersList[`${phone}`] = user
        localStorage.setItem('users', JSON.stringify(usersList))

    }

    getUsersList = () => {
        const userslist = JSON.parse(localStorage.getItem('users'))
        return userslist
    }

    initStorage = () => {
        const users = this.getUsersList()
        if(users === null) {
            const users = new Object
            localStorage.setItem('users', JSON.stringify(users))
        }
        else return
    }

    @action setActiveUser = (phone) => {
        this.active = phone
        console.log('this.active: ', this.active);
    }

    checkFill = (obj) => {
        const errors = Object.keys(obj).filter(el =>  obj[`${el}`] === null || obj[`${el}`] === '')
        return errors.length
    }

    checkEmail = (email) => {

    }

    checkPhone = (phone) => {

    }

}

const userStore = new UserStore
export default userStore