import React from 'react'
import ST from './index.scss'
import {calcClass} from '../../../core/help'



class Button extends React.Component {
  render(){

    const {mody, title, onClickHandler}=this.props

    const buttonClass = calcClass('button', ST, mody)
    return(
      <div 
        className={buttonClass}
        onClick={onClickHandler}
      >
        {title}
      </div>
    )
  }
}

export default Button