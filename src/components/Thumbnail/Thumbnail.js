import React from 'react';
import PropTypes from 'prop-types';

const Thumbnail = props => (
  <div className={props.classNames}>
    <img
      src={props.src}
      alt={props.alt}
      title={props.title}
    />
  </div>
)

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  classNames: PropTypes.string.isRequired
}

export default Thumbnail;