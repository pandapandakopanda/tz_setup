import { inject, observer } from 'mobx-react'
import React from 'react'
import ST from './index.scss'

@inject('store')
@observer
class UserData extends React.Component {
    render(){
        const user = this.props.store.userStore.active
        return(
            <div>
                
            </div>
        )
    }
}

export default UserData