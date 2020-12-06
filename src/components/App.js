import React from 'react'
import ST from './index.scss'
import SideMenu from './SideMenu'
import UserList from '../components/UserList'
import CreateUser from './CreateUser'
import {Switch, Route} from 'react-router-dom'
import { inject } from 'mobx-react'


@inject('store')
class App extends React.Component {

    componentDidMount(){
        this.props.store.userStore.initStorage()
    }

    render(){
        return(
            <div className={ST.wrapper}>
                <SideMenu />
                <Switch>
                    <Route exact path='/' children={null}/>
                    <Route exact path='/userlist' children={<UserList />}/> 
                    <Route exact path='/newuser' children={<CreateUser />}/> 
                </Switch>
            </div>
        )
    }
}

export default App