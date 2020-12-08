import React from 'react'
import ST from './index.scss'


class Search extends React.Component {

  onChange = (ev) => {
    const {value} = ev.target
    this.props.onChangeHandler(value)
  }

  render(){
    const {placeholder} = this.props
    return(
      <div className={ST.search}>
        <input 
          className={ST.search_header} 
          onChange={this.onChange} 
          placeholder={placeholder}
        />
      </div>
    )
  }
}

export default Search