import * as React from "react";
import './styles.css';

class Selection extends React.Component {
  stopDropdown = false;
  
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }
  
  select = (value) => {
    this.setState({
      toggle: false
    }, () => {
      this.stopDropdown = false;
    });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
  
  render() {
    const selectedOption = (this.props.options &&
      Object.keys(this.props.options) &&
      Object.keys(this.props.options).length &&
      this.props.options[this.props.value]) || {};
    return (
      <div
        className={`selectionComp ${this.props.className}`}
        tabIndex={0}
        role={'button'}
        onClick={(e) => {
          if (!this.stopDropdown) {
            this.setState({
              toggle: true
            });
          }
          e.preventDefault();
        }
        }
        onBlur={() => this.setState({
          toggle: false
        })}>
        <div
          className={'value'}
          style={
            (selectedOption.icon && {backgroundImage: `url(${this.props.options[this.props.value].icon})`})
            || {}}>
          {
            selectedOption.label || 'loading...'
          }
        </div>
        <ul className={(this.state.toggle && 'toggle') || 'hidden'}>
          {
            (
              this.props.options &&
              Object.keys(this.props.options) &&
              Object.keys(this.props.options).length &&
              Object.keys(this.props.options).map(key => {
                  let option = this.props.options[key];
                  return (
                    <li
                      key={key}
                      style={(option.icon && {backgroundImage: `url(${option.icon})`}) || {}}
                      onClick={() => {
                        this.stopDropdown = true;
                        this.select(key);
                      }}>
                      {option.label}
                    </li>
                  )
                }
              )
            ) || ''}
        </ul>
      </div>
    )
  }
}

export default Selection;