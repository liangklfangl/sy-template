import React from "react";
import MainContent from "./MainContent.jsx";
const locale = "zh-CN";
//通过Template.collect方法,因为这个组件会牵涉到页面的内容，所以我们要获取到demo部分
export function collect(nextProps,callback){ 
const pathname = nextProps.location.pathname+".zh-CN";
//因为我们的markdown文件后面都有语言后缀
//得到URL的pathname部分
const pageDataPath = pathname.split('/');
//得到获取到pageData的路径，然后获取到数据
let pageData = nextProps.pageData;
//获取到pageData
if(!pageData){
	pageData = nextProps.utils.get(nextProps.data,pageDataPath);
}
// console.log('collect中的pageData',pageData);
//根据URL得到当前页面对应的pageData
if(!pageData){
	callback(404,nextProps);
	return;
}
// console.log('collect中的nextProps.data',nextProps.data);
//如果根据URL还没有得到数据，那么直接返回
const demos = nextProps.utils.get(nextProps.data,[...pageDataPath,"demo"]);
// console.log('collect中的demos',demos);
//只有Components文件夹下才会有demos属性
callback(null,{
	...nextProps,
	pageData,
	demos
 }
);
  //必须调用才会真实实例化组件
}
//通过Template.default方法导入
export default (props)=>{
  return <MainContent {...props} />
}
