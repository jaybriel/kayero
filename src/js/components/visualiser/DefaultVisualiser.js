import React, { Component } from 'react'
import { typeString, getSpacing } from './Visualiser'

function buildCssClass (type, useHljs) {
  let cssSuffix
  switch (type) {
    case 'String':
      cssSuffix = 'string'; break
    case 'Number':
      cssSuffix = 'number'; break
    case 'Boolean':
      cssSuffix = 'literal'; break
    case 'Function':
      cssSuffix = 'keyword'; break
    default:
      cssSuffix = 'text'; break
  }
  let cssClass = 'visualiser-' + cssSuffix
  if (useHljs) {
    cssClass += ' hljs-' + cssSuffix
  }
  return cssClass
}

export default class DefaultVisualiser extends Component {

  render () {
    const { data, indent, name, useHljs, path, click = () => {} } = this.props
    const type = typeString(data)
    const repr = (type === 'String') ? "'" + String(data) + "'"
      : (type === 'Function') ? 'function()' : String(data)
    const cssClass = buildCssClass(type, useHljs)
    let key = <span className='visualiser-spacing'></span>
    if (name) {
      key = (
        <span className='visualiser-spacing'>
          <span className='visualiser-key' onClick={() => click(name, path)}>
            {name}
          </span>
          {':\u00a0'}
        </span>
      )
    }
    const spaces = getSpacing(indent)

    return (
      <div className='default-visualiser'>
        <span className='visualiser-row'>
          <span className='visualiser-spacing'>{spaces}</span>
            {key}
          <span className={cssClass}>{repr}</span>
        </span>
      </div>
    )
  }

}

DefaultVisualiser.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.func,
    React.PropTypes.instanceOf(Error),
    React.PropTypes.instanceOf(Date)
  ]),
  indent: React.PropTypes.number,
  useHljs: React.PropTypes.string,
  name: React.PropTypes.string,
  path: React.PropTypes.string,
  click: React.PropTypes.func
}
