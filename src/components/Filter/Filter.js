import React, { Component } from 'react'
import Checkbox from '../Checkbox/Checkbox'

import './style.scss';

const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

const Filter = props => {

  const createCheckbox = item => <Checkbox key={item} size={item} toggleFilter={props.toggleFilter}/>
  const createCheckboxes = () =>  availableSizes.map(createCheckbox) 

  return (
    <div className="filters">
      <h4 className="title">Sizes:</h4>
      {createCheckboxes()}
    </div>
  );

}

export default Filter;