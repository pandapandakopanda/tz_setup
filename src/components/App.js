import React from 'react'
import ST from './index.scss'
import SideMenu from './SideMenu'
import UserList from '../components/UserList'
import CreateUser from './CreateUser'
import {Switch, Route} from 'react-router-dom'

class App extends React.Component {
    render(){
        return(
            <div className={ST.wrapper}>
                <SideMenu />
                <div className={ST.main}> 
                    <Switch>
                        <Route exact path='/' children={null}/>
                        <Route exact path='/userlist' children={<UserList />}/> 
                        <Route exact path='/newuser' children={<CreateUser />}/> 
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App