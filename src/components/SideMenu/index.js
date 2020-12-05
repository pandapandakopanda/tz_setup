import React from 'react'
import ST from './index.scss'
import Button from '../ui/Button'
import {Link} from 'react-router-dom'


class SideMenu extends React.Component {
  render(){
    return(
      <div className={ST.sideMenu}>
        <div className={ST.sideMenu_battonblock}>
          <Link to='/userlist'><Button title='Список пользователей'/></Link>
          <Link to='/newuser'><Button title='Добавить нового пользователя'/></Link>
        </div>
      </div>
    )
  }
}

export default SideMenu
