import React from "react";
import Header from "./Header";
import PropTypes from 'prop-types';
import Footer from "./Footer";
const styles = require("../../static/page.less");
export default class Page extends React.Component{
 
 render(){
   const { children, ...restProps} = this.props;
   //我们采用了解构，直接将restProps除了children传入到子组件中，而且
   //restProps必须前面有点,而且在传入到子组件中也是有`...`的。前面表示
   //将剩余的属性放在该变量中，而后者是解构将属性传入到子属性中
 	 return (
         <div className="page">
               <Header {...restProps}/>
               {this.props.children}
              <Footer/>
         </div>
 	 	)
  }
}

Page.PropTypes = {
	children: PropTypes.element.isRequired
}
