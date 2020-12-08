import React from 'react'
import ST from './index.scss'
import Search from '../ui/Search'
import Button from '../ui/Button'
import Error from '../Error'
import Select from '../ui/Select'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class UserList extends React.Component {
       

    findByPhone = () => {
        const phone =  this.props.store.userStore.searchData
        console.log('phone: ', phone);
        this.props.store.userStore.findByPhone(phone)
        this.props.store.userStore.isSearching = true
    }

    findByEmail = () => {
        const email =  this.props.store.userStore.searchData
        console.log('email: ', email);
        this.props.store.userStore.findByEmail(email)
        this.props.store.userStore.isSearching = true
    }

    
    createList = (users) => {
        if(users === null) return null
        const list = Object.keys(users).map(el => {
            const {name, lastname, surname, phone, email, status, regdate} =  users[`${el}`]
            const onClickHandle = () => {
    
                }
            return (
                <div className={ST.user} key={phone} onClick={onClickHandle}>
                    <div className={ST.userName}>{`${surname} ${name} ${lastname}`}</div>
                    <div className={ST.email}>{email}</div>
                    <div className={ST.phone}>{phone}</div>
                    <div className={ST.regdate}>{regdate}</div>
                    <div className={ST.status}>{status}</div>
                </div>
            )
        })
        return list
    }

    showFoundUser = (user) =>{
        if(user === undefined || user === null) return (
            <Error error={'Пользователь не найден'} />
        )
        else{
            const {name, lastname, surname, phone, email, status, regdate} = user
            return(
                <div className={ST.user} key={phone} >
                    <div className={ST.userName}>{`${surname} ${name} ${lastname}`}</div>
                    <div className={ST.email}>{email}</div>
                    <div className={ST.phone}>{phone}</div>
                    <div className={ST.regdate}>{regdate}</div>
                    <div className={ST.status}>{status}</div>
                </div>
            )
        }
    }

    showFilteredUsers = (users) => {
        this.props.store.userStore.isFiltering = true
        const list = this.createList(users)
        return list
    }

    render(){

        const users = this.props.store.userStore.getUsersList()
        const {searchingUser,isFiltering , filteredUsers, isSearching, filterStatus, roles} = this.props.store.userStore

        return(
            <div className={ST.users}>
                <div className={ST.filter}>
                    <p> Отсортировать список пользователей по статусу: </p>
                    <Select 
                        selected={filterStatus}
                        items={roles} 
                        placeholder={'Выберите роль'}
                        onSelect = {this.props.store.userStore.getUsersByStatusId}
                    />
                </div>
                <div className={ST.search}>
                    <Search placeholder={'Search'} onChangeHandler={this.props.store.userStore.setSearch}/>
                    <Button mody={{search:true}} title={'найти по номеру'} onClickHandler={this.findByPhone}/>
                    <Button mody={{search:true}} title={'найти по почте'} onClickHandler={this.findByEmail}/>
                </div>
            {isSearching ? this.showFoundUser(searchingUser) : this.createList(users)}
            {isFiltering ? this.showFilteredUsers(filteredUsers) : this.createList(users)}
            </div>
        )
    }
}

export default UserList