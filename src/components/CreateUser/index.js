import React from 'react'
import ST from './index.scss'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Select from '../ui/Select'
import Error from '../Error'
import { inject, observer } from 'mobx-react'


@inject('store')
@observer
class CreateUser extends React.Component {

    isEditing = this.props.store.userStore.isEditing

    componentDidMount(){
        this.isEditing = this.props.store.userStore.error = ''
        this.isEditing = this.props.store.userStore.isEditing
        console.log('this.isEditing: ', this.isEditing);
    }

    render(){
        
        const {error, 
                setName, setEmail, setPhone, setSurname, setLastname, setStatus,
                createUser,editUser,
                roles, status, searchingUser
             } = this.props.store.userStore
            
        const onClick = () => {
            console.log('isEditing: ', this.isEditing);
            this.isEditing ? editUser() : createUser() 
        }

        return(
            <div className={ST.wrapper}>
                <div className={ST.newuser}>
                    <h1>{!this.isEditing?`Заполните данные формы`: `Редактирование` }</h1>
                    <Input title={'Фамилия'} placeholder={'Введите фамилию'} onChangeHandler={setSurname} />
                    <Input title={'Имя'} placeholder={'Введите имя'} onChangeHandler={setName} />
                    <Input title={'Отчество'} placeholder={'Введите отчество'} onChangeHandler={setLastname} />
                    <Input title={'E-mail'} placeholder={'Введите e-mail'} onChangeHandler={setEmail} />
                    <Input title={'Телефон'} placeholder={'Введите телефон'} onChangeHandler={setPhone} />
                    <div className={ST.newuser_bottom}>
                        <Select 
                            selected={status}
                            items={roles} 
                            placeholder={'Выберите роль'}
                            onSelect = {setStatus}
                        />
                        <Button mody={{submit: true}} title={'Отправить'} onClickHandler={onClick} />
                    </div>
                </div>
                <Error error={error} />
            </div>
        )
    }
}

export default CreateUser