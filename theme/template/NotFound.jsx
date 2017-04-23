import React from "react";
export default class NotFound extends React.Component{
  constructor(props){
  	super(props);
  	 this.state = {
  	  name:'qinliang',
  	  sex :'male'
     }
  }
  render(){
  	return(
  		   <div id="hello" style={{border:"1px solid red"}}>
              没有发现相关应该实例化的组件，NotFound被实例化了!
             <div>name:{this.state.name}</div>
             <div>sex:{this.state.name}</div>
           </div>
  		)
  }
} 
