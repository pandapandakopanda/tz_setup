import {observable, action, computed} from 'mobx'

class UserStore{
  
    @observable name =  null
    @observable surname = null
    @observable lastname = null
    @observable email = null
    @observable phone = null
    @observable status = null
    @observable filterStatus = null
    @observable changedate = null
    @observable searchData = null
    @observable error = ''
    @observable roles = [
        {id:'cl', name:'client'},
        {id:'ad', name:'admin'},
        {id:'pt', name:'partner'}
    ]
    @observable searchingUser = null
    @observable isSearching = false
    @observable filteredUsers = null
    @observable isFiltering = true

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
        this.email = email.toLowerCase()
    }

    @action setPhone = (phone) => {
        this.phone = phone
    }

    @action setStatus = (status) => {
        this.status = status
    }

    @action setFilterStatus = (status) => {
        this.filterStatus = status
    }

    @action setSearch = (data) => {
        this.searchData = data
    }

    getStatus = () => {
        const status = this.roles.find(el => el.id === this.status)
        return (status === undefined) ? '' : status.name
    }

    getUsersByStatusId = (id) => {
        const status = this.roles.filter(el => el.id === id )[0].name
        const users = this.getUsersList()
        const filteredUsers = Object.keys(users).filter(el => users[`${el}`][`status`] === status) 
        this.filteredUsers = filteredUsers
    }

    @action createUser = () => {
        const {name, surname, lastname, email, phone } = this

        const date = new Date
        const regdate = new Intl.DateTimeFormat().format(date)
        const status = this.getStatus()
        if(!this.emailValidate(email)) {
            this.error = 'Пожалуйста, введите корректный e-mail'
            return
        }
        const user = {
            name, surname, lastname, email, phone, status, regdate
        }
        if(!this.checkFill(user)) {
            this.addUser(user)
            this.error = ''
        } else {
            this.error = 'Пожалуйста, заполните все поля'
            return
        }
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


    checkFill = (obj) => {
        const errors = Object.keys(obj).filter(el =>  obj[`${el}`] === null || obj[`${el}`] === '')
        return errors.length
    }

    emailValidate = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    phoneValidate = (phone) => {
        const res = phone.str.replace(/[^+\d]/g, '')
        return res.length === 12
    }

    findByPhone = (phone) => {
        if(phone === null || phone === undefined) return null
        const usersList = this.getUsersList()
        this.searchingUser = usersList[`${phone}`]
    }

    findByEmail = (email) => {
        if(email === null || email === undefined) return null
        const editedEmail = email.toLowerCase().trim()
        const usersList = this.getUsersList()
        const searchingUser = Object.keys(usersList).filter(el => {
            return usersList[`${el}`][`email`] === editedEmail
        })
        this.searchingUser = usersList[`${searchingUser[0]}`]
    }

}

const userStore = new UserStore
export default userStore