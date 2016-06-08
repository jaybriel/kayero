import React, { Component } from 'react'
import { connect } from 'react-redux'
import { exportToCSV } from '../../actions'
import { selectComponent, getSpacing } from './Visualiser'

class ArrayVisualiser extends Component {

  constructor (props) {
    super(props)
    this.collapse = this.collapse.bind(this)
    this.state = {open: false}
  }

  collapse () {
    this.setState({open: !this.state.open})
  }

  render () {
    const { data, indent, useHljs, name, path, click = () => {} } = this.props
    let items = []
    for (let i = 0; this.state.open && i < data.length; i++) {
      var item = data[i]
      var VisualiserComponent = selectComponent(item)
      items.push(
        <VisualiserComponent
          key={String(i)}
          data={item}
          name={String(i)}
          indent={indent === 0 ? indent + 2 : indent + 1}
          useHljs={useHljs}
          click={click}
          path={path + '[' + i + ']'} />
      )
    }

    let arrow
    let spaces = getSpacing(indent)
    if (data.length > 0) {
      arrow = this.state.open ? '\u25bc' : '\u25b6'
      if (spaces.length >= 2) {
        // Space for arrow
        spaces = spaces.slice(2)
      }
    }
    let key = <span className='visualiser-spacing'>{'\u00a0'}</span>
    if (name) {
      key = (
        <span className='visualiser-spacing'>
          {'\u00a0'}
          <span className='visualiser-key' onClick={() => click(name, path)}>
            {name}
          </span>
          {':\u00a0'}
        </span>
      )
    }

    return (
      <div className='array-visualiser'>
        <i className='fa fa-share export-to-csv'
          onClick={() => this.props.dispatch(exportToCSV(data))} title='Export to CSV'>
        </i>
        <span className='visualiser-row'>
          <span className='visualiser-spacing'>{spaces}</span>
          <span className='visualiser-arrow' onClick={this.collapse}>{arrow}</span>
          {key}
          <span className={useHljs ? 'hljs-keyword' : ''}>Array</span>
          <span>{'[' + data.length + ']'}</span>
        </span>
        {items}
      </div>
    )
  }
}

ArrayVisualiser.propTypes = {
  data: React.PropTypes.object,
  indent: React.PropTypes.number,
  useHljs: React.PropTypes.bool,
  name: React.PropTypes.string,
  path: React.PropTypes.string,
  click: React.PropTypes.func,
  dispatch: React.PropTypes.func
}

export default connect()(ArrayVisualiser)
