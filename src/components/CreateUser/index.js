import React from 'react'
import ST from './index.scss'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Select from '../ui/Select'
import { inject, observer } from 'mobx-react'


@inject('store')
@observer
class CreateUser extends React.Component {

    render(){

        const {setName, setEmail, setPhone, setSurname, setLastname, createUser, roles, status, setStatus} = this.props.store.userStore


        return(
            <div className={ST.newuser}>
                <h1>Заполните данные формы:</h1>
                <Input title={'Имя'} placeholder={'Введите имя'} onChangeHandler={setName} />
                <Input title={'Фамилия'} placeholder={'Введите фамилию'} onChangeHandler={setSurname} />
                <Input title={'Отчество'} placeholder={'Введите отчество'} onChangeHandler={setLastname} />
                <Input title={'E-mail'} placeholder={'Введите e-mail'} onChangeHandler={setEmail} />
                <Input title={'Телефон'} placeholder={'Введите телефон'} onChangeHandler={setPhone} />
                <Select 
                    title={'Выберите роль'}
                    selected={status}
                    items={roles} 
                    placeholder={'Выберите роль'}
                    onSelect = {setStatus}
                />
                <Button mody={{submit: true}} title={'Отправить'} onClickHandler={createUser} />
            </div>
        )
    }
}

export default CreateUser