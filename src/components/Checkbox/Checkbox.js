import React, { Component } from 'react'

const Checkbox = props => {
  return (
    <div className="filters-available-size">
      <label>
        <input type="checkbox" value={props.size} onChange={props.toggleFilter} />
        <span className="checkmark">{props.size}</span>
      </label>
    </div>
  );
}




// class Checkbox extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className="filters-available-size">
//         <label>
//           <input type="checkbox" value={this.props.size} />
//           <span className="checkmark">{this.props.size}</span>
//         </label>
//       </div>
//     );
//   }
// }

export default Checkbox;