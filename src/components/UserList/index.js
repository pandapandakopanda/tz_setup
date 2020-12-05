import React from 'react'
import ST from './index.scss'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class UserList extends React.Component {
    
    createList = (users) => {
        if(users === null) return null
        const list = Object.keys(users).map(el => {
            const {name, lastname, surname, phone} =  users[`${el}`]
            const onClickHandle = () => {
                    this.props.store.userStore.setActiveUser(phone)
                }
            return (
                <div className={ST.user} key={phone} onClick={onClickHandle}>
                    <p className={ST.userName}>{`${surname} ${name} ${lastname}`}</p>
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