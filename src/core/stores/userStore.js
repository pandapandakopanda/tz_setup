import {observable, action} from 'mobx'

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
    prevPhone = null

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

    @action setCurrentUserData = (phone) => {
        const currentUser = this.findByPhone(phone)
        this.setName(currentUser.name)
        this.setSurname(currentUser.surname)
        this.setLastname(currentUser.lastname)
        this.setPhone(currentUser.phone)
        this.setEmail(currentUser.email)
        this.setStatus(currentUser.status)
    }

    getStatus = () => {
        const status = this.roles.find(el => el.id === this.status)
        return (status === undefined) ? '' : status.name
    }

    getUsersByStatusId = (id) => {
        const status = this.roles.filter(el => el.id === id )[0].name
        const users = this.getUsersList()
        const filteredUsers = Object.keys(users).filter(el => users[el][`status`] === status) 
        this.filteredUsers = filteredUsers.map(el => users[el])
    }

    @action createUser = () => {
        const {name, surname, lastname, email } = this
        console.log('this.phone: ', this.phone);
        const phone = (this.editPhone(this.phone) === null) ? null : this.editPhone(this.phone)
        const date = new Date()
        const regdate = new Intl.DateTimeFormat().format(date)
        const status = this.getStatus()
        if(!this.emailValidate(email)) {
            this.error = 'Пожалуйста, введите корректный e-mail'
            return
        } else if (this.isEmailExist(email)) {
            this.error = `'Такой e-mail уже используется'`
            return
        }
        if(!this.phoneValidate(phone)) {
            this.error = 'Пожалуйста, введите корректный номер телефона'
            return
        } else if (!this.isPhoneExist(phone)) {
            this.error = `Такой номер телефона уже используется`
            return
        }
        return {
            name, surname, lastname, email, phone, status, regdate
        }
    }

    setItemToLS = (item) => {
        localStorage.setItem('users', JSON.stringify(item))
    }

    @action editedUser = () => {
        const {name, surname, lastname, email } = this
        const phone = (this.editPhone(this.phone) === null) ? null : this.editPhone(this.phone)
        const {regdate, status} = this.searchingUser
        if(!this.emailValidate(email)) {
            this.error = 'Пожалуйста, введите корректный e-mail'
            return
        } else if (this.isEmailExist(email) && email === this.searchingUser.email) {
            this.error = `'Такой e-mail уже используется'`
            return
        }
        if(!this.phoneValidate(phone)) {
            this.error = 'Пожалуйста, введите корректный номер телефона'
            return
        } else if (this.isPhoneExist(phone) && phone === this.searchingUser.phone) {
            this.error = `'Такой телефон уже используется'`
            return
        }
        const changedate = new Intl.DateTimeFormat().format(new Date())
        return {
            name, surname, lastname, email, phone, status, regdate, changedate
        }
    }
    
    @action editUser = () => {
        const prevPhone = this.searchingUser.phone
        const phone = this.editPhone(this.phone)
        const usersList = this.getUsersList()
        let newUser = {}
        if (phone === prevPhone){
            usersList[phone] = this.editedUser()
            this.setItemToLS(usersList)
        } else {
            console.log('prevPhone: ', prevPhone);
            console.log('phone: ', phone);
            usersList[phone] = this.editedUser()
            console.log('newUser: ', newUser);
            this.setItemToLS(usersList)
            this.deleteUser(prevPhone)
        }
    }

    @action addUser = (user) => {
        if(!this.checkFill(user)) {
            const usersList = this.getUsersList()
            const { phone } = user
            usersList[phone] = user
            this.setItemToLS(usersList)
            this.error = ''
            this.clear()
        } else {
            this.error = 'Пожалуйста, заполните все поля'
            return
        }
    }

    @action deleteUser = ( phone ) => {
        const users = this.getUsersList()
        delete users[phone]
        this.setItemToLS(users)
    }

    getUsersList = () => {
        const userslist = JSON.parse(localStorage.getItem('users'))
        return userslist
    }

    initStorage = () => {
        const users = this.getUsersList()
        console.log('users: ', users);
        if(users === null) {
            const users = {}
            this.setItemToLS(users)
        }
    }


    checkFill = (obj) => {
        if(obj === undefined || obj === null) return false
        const errors = Object.keys(obj).filter(el =>  obj[el] === null || obj[el] === '')
        return errors.length
    }

    emailValidate = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    phoneValidate = (phone) => {
        const res = phone.replace(/[^+\d]/g, '')
        return res.length === 12 && (parseInt(res) >= 0 || parseInt(res) <= 0)
    }

    editPhone = (phone) => {
        if(phone.charAt(0)==='+' && phone.charAt(1)==='7') return phone
        else return `+7${phone.toString().substring(1)}`
    }

    isEmailExist = (email) => {
        const users = this.getUsersList()
        return Object.keys(users).filter(el => users[el][`email`] === email).length
    }

    isPhoneExist = (phone) => {
        const users = this.getUsersList()
        return 0 === Object.keys(users).filter(el => users[el][`phone`] === phone).length
    }

    findByPhone = (phone) => {
        if(phone === null || phone === undefined) return null
        const usersList = this.getUsersList()
        this.searchingUser = usersList[phone]
        return this.searchingUser
    }

    findByEmail = (email) => {
        if(email === null || email === undefined) return null
        const editedEmail = email.toLowerCase().trim()
        const usersList = this.getUsersList()
        const searchingUser = Object.keys(usersList).filter(el => usersList[el][`email`] === editedEmail)
        this.searchingUser = usersList[searchingUser[0]]
    }

    @action clear = () => {
        console.log('clearing');
        this.name=null
        this.surname=null
        this.lastname=null
        this.email = null
        this.phone = null
        this.regdate = null
        this.searchingUser = null
    }

}

const userStore = new UserStore
export default userStore