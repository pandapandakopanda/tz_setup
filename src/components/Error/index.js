import React from 'react'
import ST from './index.scss'


class Error extends React.Component{
  render(){
    return(
      <div className={ST.error}>
          {this.props.error}
      </div>
    )
  }
}

export default Error