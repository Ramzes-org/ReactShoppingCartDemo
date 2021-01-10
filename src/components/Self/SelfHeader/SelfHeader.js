import React from 'react'
import Sort from './Sort/Sort'
import { number } from 'prop-types';
const FIELDS = [
  { label: 'Select', value: 'select' },
  { label: 'Lowest to highest', value: 'lowest' },
  { label: 'Highest to lowest', value: 'highest' },
]

const SelfHeader = props => {
  return (
    <div className="shelf-container-header">
      <small className="products-found">
        <span>{`${props.foundQuantity} Product(s) found.`}</span>
      </small>
      <Sort
        value={props.sort}
        handleChange={props.handleChange}
        fields={FIELDS}
      />
    </div>
  )
}

SelfHeader.propTypes = {
  foundQuantity: number.isRequired
}

export default SelfHeader;