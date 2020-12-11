import React from 'react'
import ST from './index.scss'
import Button from '../ui/Button'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

@inject('store')
@observer
class SideMenu extends React.Component {

  onClick = () => {
    this.props.store.userStore.clear()
    this.props.store.userStore.isSearching = false
    this.props.store.userStore.isFiltering = false
    this.props.store.userStore.isEditing = false
  }

  render(){
    return(
      <div className={ST.sideMenu}>
        <div className={ST.sideMenu_battonblock}>
          <Link to='/userlist'>
            <Button 
              title='Список пользователей' 
              onClickHandler={this.onClick} 
            />
            </Link>
          <Link to='/newuser'>
            <Button 
            title='Добавить нового пользователя'
            onClickHandler={this.onClick}
            />
          </Link>
        </div>
      </div>
    )
  }
}

export default SideMenu
