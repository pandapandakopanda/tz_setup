import React from 'react'
import ST from './index.scss'


class Input extends React.Component {

  onChange = (ev) => {
    const {value} = ev.target
    this.props.onChangeHandler(value)
  }

  render(){
    const {title, placeholder, value} = this.props
    return(
      <div className={ST.input}>
        <p className={ST.input_title}>{title}</p>
        <input 
          className={ST.input_header} 
          onChange={this.onChange} 
          placeholder={placeholder}
          value={value}
        />
      </div>
    )
  }
}

export default Input