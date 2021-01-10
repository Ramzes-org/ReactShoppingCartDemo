import React from 'react';
import PropTypes, {string, func, arrayOf} from 'prop-types';

const Sort = ({value, handleChange, fields}) => {
  const createOptions = fields => (
    fields.map(o => (
      <option value={o.value} key={o.value}>
        {o.label}
      </option>
    ))
  );

  return (
    <div className="sort">
      Order by
      <select value={value} onChange={handleChange}>
        {createOptions(fields)}
      </select>
    </div>
  )
}

Sort.propTypes = {
  value: string.isRequired,
  handleChange: func.isRequired,
  fields: arrayOf(PropTypes.object).isRequired
}

export default Sort;
