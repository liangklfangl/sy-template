import React from "react";
import MainContent from "./MainContent.jsx";
//通过Template.collect方法,因为这个组件会牵涉到页面的内容，所以我们要获取到demo部分
export function collect(nextProps,callback){
  callback(null,nextProps);
  //必须调用才会真实实例化组件
}
//通过Template.default方法导入
export default (props)=>{
  return <MainContent {...props} />
}
