import React from 'react'
import ST from './index.scss'
import {calcClass} from '../../core/help'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class UserList extends React.Component {
    
    createList = (users) => {
        if(users === null) return null
        const list = Object.keys(users).map(el => {
            const {name, lastname, surname, phone, email, status} =  users[`${el}`]
            const onClickHandle = () => {
    
                }
            return (
                <div className={ST.user} key={phone} onClick={onClickHandle}>
                    <div className={ST.userName}>{`${surname} ${name} ${lastname}`}</div>
                    <div className={ST.email}>{email}</div>
                    <div className={ST.phone}>{phone}</div>
                    <div className={ST.status}>{status}</div>
                </div>
            )
        })
        console.log('users: ', users);
        return list
    }

    render(){

        const users = this.props.store.userStore.getUsersList()

        return(
            <div className={ST.users}>
                {this.createList(users)}
            </div>
        )
    }
}

export default UserList