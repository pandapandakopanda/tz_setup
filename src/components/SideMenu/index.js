import React from 'react'
import ST from './index.scss'
import Button from '../ui/Button'
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

@inject('store')
@observer
class SideMenu extends React.Component {

  onClickHandler = () => {
    this.props.store.userStore.isSearching = false
    this.props.store.userStore.isFiltering = false
    this.props.store.userStore.isEditing = false
  }

  render(){
    return(
      <div className={ST.sideMenu}>
        <div className={ST.sideMenu_battonblock}>
          <Link to='/userlist'><Button title='Список пользователей' onClickHandler={this.onClickHandler} /></Link>
          <Link to='/newuser'><Button title='Добавить нового пользователя'/></Link>
        </div>
      </div>
    )
  }
}

export default SideMenu
