import React from "react";
const footer = require("../../static/footer.less");
import PropTypes from 'prop-types';
export default class Footer extends React.Component{
 render(){
 	 return (
         <div className="footer">
              This is footer part 
         </div>
 	 	)
  }
}
Footer.PropTypes = {
  company:"Alibaba"
}