import {observable, action, computed} from 'mobx'
import UserList from '../../components/UserList'

class UserStore{
  
    @observable name =  null
    @observable surname = null
    @observable lastname = null
    @observable email = null
    @observable phone = null
    @observable status = null
    @observable changedate = null
    @observable error = ''
    @observable roles = [
        {id:'cl', name:'client'},
        {id:'ad', name:'admin'},
        {id:'pt', name:'partner'}
    ]

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

    @action setStatus = (status) => {
        this.status = status
    }

    
    getStatus = () => {
        const status = this.roles.find(el => el.id === this.status)
        return (status === undefined) ? '' : status.name
    }

    @action createUser = () => {
        const {name, surname, lastname, email, phone, status } = this
        const regdate = new Date
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

    getUser = (phone) => {
        if(phone === null) return null
        const usersList = this.getUsersList()
        return usersList[`${phone}`]
    }

    initStorage = () => {
        const users = this.getUsersList()
        if(users === null) {
            const users = new Object
            localStorage.setItem('users', JSON.stringify(users))
        }
        else return
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