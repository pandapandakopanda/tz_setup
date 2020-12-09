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
    @observable isFiltering = false
    @observable isEditing = false

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
        console.log('this.filterStatus: ', this.filterStatus);
    }

    @action setSearch = (data) => {
        this.searchData = data
    }

    @action setCurrentUser = (phone) => {
        this.findByPhone(phone)
    }

    getStatus = () => {
        const status = this.roles.find(el => el.id === this.status)
        return (status === undefined) ? '' : status.name
    }

    getUsersByStatusId = (id) => {
        const status = this.roles.filter(el => el.id === id )[0].name
        const users = this.getUsersList()
        const filteredUsers = Object.keys(users).filter(el => users[`${el}`][`status`] === status) 
        this.filteredUsers = filteredUsers.map(el => users[`${el}`])
    }

    @action createUser = () => {
        const {name, surname, lastname, email } = this
        const phone = (this.phone === null) ? null : `+7${this.phone.substring(1)}`
        console.log('phone: ', phone);
        const date = new Date
        const regdate = new Intl.DateTimeFormat().format(date)
        const status = this.getStatus()
        if(!this.emailValidate(email)) {
            this.error = 'Пожалуйста, введите корректный e-mail'
            return
        } else if (this.isEmailExist(email)) {
            this.error = 'Такой e-mail уже используется'
            return
        }
        if(!this.phoneValidate(phone)) {
            this.error = 'Пожалуйста, введите корректный номер телефона'
            return
        } else if (this.isPhoneExist(phone)) {
            this.error = 'Такой номер телефона уже используется'
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

    @action editUser = () => {
        console.log('this.searchingUser: ', this.searchingUser);
    }

    @action addUser = (user) => {
        const usersList = this.getUsersList()
        const { phone } = user
        usersList[`${phone}`] = user
        localStorage.setItem('users', JSON.stringify(usersList))

    }

    @action deleteUser = ( phone ) => {
        const users = this.getUsersList()
        delete users[phone]
        localStorage.setItem('users', JSON.stringify(users))
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
        const res = phone.replace(/[^+\d]/g, '')
        console.log('res: ', res);
        return res.length === 12 && (parseInt(res) >= 0 || parseInt(res) <= 0)
    }

    editPhone = (phone) => {
        if(phone.cahrAt(0)==='+' && phone.cahrAt(1)==='7') return phone
        else return `+7${this.phone.substring(1)}`
    }

    isEmailExist = (email) => {
        const users = this.getUsersList()
        return Object.keys(users).filter(el => users[`${el}`][`email`] === email).length
    }

    isPhoneExist = (phone) => {
        const users = this.getUsersList()
        return Object.keys(users).filter(el => users[`${el}`][`phone`] === phone).length
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
        const searchingUser = Object.keys(usersList).filter(el => usersList[`${el}`][`email`] === editedEmail)
        this.searchingUser = usersList[`${searchingUser[0]}`]
    }

}

const userStore = new UserStore
export default userStore