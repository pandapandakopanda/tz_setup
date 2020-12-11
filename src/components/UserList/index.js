import React from 'react'
import ST from './index.scss'
import Search from '../ui/Search'
import Button from '../ui/Button'
import Error from '../Error'
import Select from '../ui/Select'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('store')
@observer
class UserList extends React.Component {    
    sate = {
        update: true
    }
       
    findByPhone = () => {
        const phone =  this.props.store.userStore.searchData
        this.props.store.userStore.findByPhone(phone)
        this.props.store.userStore.isFiltering = false
        this.props.store.userStore.isSearching = true
    }

    findByEmail = () => {
        const email =  this.props.store.userStore.searchData
        this.props.store.userStore.findByEmail(email)
        this.props.store.userStore.isFiltering = false
        this.props.store.userStore.isSearching = true
    }

    sortById = () => {
        const id = this.props.store.userStore.filterStatus
        this.props.store.userStore.getUsersByStatusId(id)
        this.props.store.userStore.isFiltering = true
        this.props.store.userStore.isSearching = false
    }

    
    createList = (users) => {
        if(users === null) return null
        console.log('users: ', users);
        const list = Object.keys(users).map(el => {
            const {name, lastname, surname, phone, email, status, regdate} =  users[`${el}`]
            const editUser = () => {
                this.props.store.userStore.isEditing = true
                this.props.store.userStore.setCurrentUserData(phone)
            }
            const deleteUser = () =>{
                this.props.store.userStore.deleteUser(phone)
                console.log(this.state);
                this.setState({update:true})
            }

            return (
                <div className={ST.user} key={phone}>
                    <div className={ST.data}>
                        <div className={ST.userName}>{`${surname} ${name} ${lastname}`}</div>
                        <div className={ST.email}>{email}</div>
                        <div className={ST.phone}>{phone}</div>
                        <div className={ST.regdate}>{regdate}</div>
                        <div className={ST.status}>{status}</div>
                    </div>
                    <div className={ST.button_block}>
                        <Link to='/newuser'>
                            <Button title={`edit`} mody={{edit:true}} onClickHandler={editUser}/>
                        </Link>
                        <Button title={`delete`} mody={{edit:true}} onClickHandler={deleteUser}/>
                    </div>
                </div>
            )
        })
        return list
    }

    showFoundUser = (user) =>{
        console.log('user: ', user);
        if(user === undefined || user === null) return (
            <Error error={'Пользователь не найден'} />
            )
            else{
            const userObj = new Object
            userObj[`${user.phone}`]=user
            return this.createList(userObj)
        }
    }

    showFilteredUsers = (users) => {
        const list = this.createList(users)
        console.log('list: ', list);
        return list
    }

    render(){

        const users = this.props.store.userStore.getUsersList()
        const {searchingUser,isFiltering , filteredUsers, isSearching, filterStatus, roles} = this.props.store.userStore
        
        const view = (searchingUser, filteredUsers, users) => {
            if(isSearching) return this.showFoundUser(searchingUser)
            else if (isFiltering) return this.showFilteredUsers(filteredUsers)
            else return this.createList(users)
        }

        return(
            <div className={ST.wrapper}>
            <div className={ST.users}>
                <div className={ST.filter}>
                    <p> Отсортировать список пользователей по статусу: </p>
                    <Select 
                        selected={filterStatus}
                        items={roles} 
                        placeholder={'Выберите роль'}
                        onSelect = {this.props.store.userStore.setFilterStatus}
                    />
                    <Button mody={{search:true}} title={'сортировать'} onClickHandler={this.sortById}/>
                </div>
                <div className={ST.search}>
                    <Search placeholder={'Search'} onChangeHandler={this.props.store.userStore.setSearch}/>
                    <Button mody={{search:true}} title={'найти по номеру'} onClickHandler={this.findByPhone}/>
                    <Button mody={{search:true}} title={'найти по почте'} onClickHandler={this.findByEmail}/>
                </div>
                {view(searchingUser, filteredUsers, users)}
            </div>
            </div>
        )
    }
}

export default UserList