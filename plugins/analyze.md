### 1.dora-plugin-description
所以对于dora-plugin-description只是获取content中`hr`以前的部分作为description,而以后的部分被当做真正的content而已

### 2.dora-plugin-highlight
(1)node部分

将每一个`pre`标签上添加一个属性为hightlighted，其是对pre标签中的code进行了高亮显示后的结果~~

(2)browser部分

其中就是获取pre标签，然后返回一个code元素，元素的内容是pre标签上已经highlighted的代码块~~
```js
module.exports = function() {
  return {
    converters: [
      [
        function(node) { return JsonML.isElement(node) && JsonML.getTagName(node) === 'pre'; },
        function(node, index) {
          var attr = JsonML.getAttributes(node);
          return React.createElement('pre', {
            key: index,
            className: 'language-' + attr.lang,
          }, React.createElement('code', {
            dangerouslySetInnerHTML: { __html: attr.highlighted },
            //If toReactComponent is invoked, we will construct pre and code Element, while attr of hightlighted
            //of pre Element will be given to code Element content
          }));
        },
      ],
    ],
  };
};
```

### 3.dora-plugin-antd

(1)node部分

根据URL是否含有demo部分作出不同的处理。
```js
module.exports = (markdownData, _, isBuild) => {
  const isDemo = /\/demo$/i.test(path.dirname(markdownData.meta.filename));
  if (isDemo) {
    //处理URL中含有Demo的markdown页面
    return processDemo(markdownData, isBuild);
  }
  //处理URL中不含有Demo的markdown页面
  return processDoc(markdownData);
};
```
如果是处理Doc那么，如我们的index.zh-CN.md(包括components下的index.zh-CN.md，也包括topLevel的说明文件)这种文件，那么我们根据API来分割，`API前面的部分是content，后面的部分是api`

如果是`处理Demo(如components/Alert/demo)`，因为每一个demo只会含有一个代码块(每一个Demo单独会有一个文件)，所以我们会根据`zh-CN`和`en-US`这个h2标签分割出来
我们的markdownData真正的content,其中content内容为:
```js
  markdownData.content = {
      'zh-CN': contentChildren.slice(chineseIntroStart + 1, englishIntroStart),
      'en-US': contentChildren.slice(englishIntroStart + 1, introEnd),
    };
```
同时，如果是jsx，那么我们还会将demo中的代码块内容放在markdownData对象的highlightedCode属性中返回。同时markdownData的preview也会被返回一个功能用于预览组件的实际效果，但是`必须要配置dora-plugin-preview`一起，因为后者会添加loader。
```js
if (sourceCodeObject.isES6) {
    //if we are in jsx syntax
    markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
    //codeIndex is pre tag with jsx attribute, so here we will get pre attribute and code tag
    markdownData.preview = utils.getPreview(sourceCodeObject.code);
    //change lib components reference to components folder
  }
```
同时，我们也会返回`style和highlightedStyle`两个属性,如果在demo中写入了style标签~~
```js
  const styleNode = getStyleNode(contentChildren);
  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0];
  } else if (styleNode) {
    const styleTag = contentChildren.filter(isStyleTag)[0];
    markdownData.style = getCode(styleNode) + (styleTag ? JsonML.getChildren(styleTag)[0] : '');
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }
```
如果指定了meta.iframe,那么我们会将编译成的html的src封装到`markdownData.src`上。
```js
if (meta.iframe) {
    const html = nunjucks.renderString(tmpl, {
      id: meta.id,//meta.filename.replace(/\.md$/, '').replace(/\//g, '-');
      style: markdownData.style,//css content
      script: babel.transform(getCode(markdownData.preview), babelrc).code,
      //transform our jsonml to code
    });
    const fileName = `demo-${Math.random()}.html`;
    fs.writeFile(path.join(process.cwd(), '_site', fileName), html);
    markdownData.src = path.join('/', fileName);
}
```

(2)browser部分
```js
module.exports = (_, props) =>
   ({
     converters: [
       [node => JsonML.isElement(node) && isHeading(node), (node, index) => {
         const children = JsonML.getChildren(node);
         const sluggedId = generateSluggedId(children);
         //生成ID
         return React.createElement(JsonML.getTagName(node), {
           key: index,
           id: sluggedId,
           ...JsonML.getAttributes(node),
         }, [
           <span key="title">{children.map(child => toReactElement(child))}</span>,
           <a href={`#${sluggedId}`} className="anchor" key="anchor">#</a>,
         ]);
         //childElement
       }],
       [node => JsonML.isElement(node) && JsonML.getTagName(node) === 'a' && !(
        //如果是a标签，我们转化为link
        JsonML.getAttributes(node).class ||
          (JsonML.getAttributes(node).href &&
           JsonML.getAttributes(node).href.indexOf('http') === 0) ||
          /^#/.test(JsonML.getAttributes(node).href)
       ), (node, index) => {
         const href = JsonML.getAttributes(node).href;
         return (
           <Link
             to={isZhCN(props.location.pathname) ? toZhCNPathname(href) : makeSureComonentsLink(href)}
             key={index}
           >
             {toReactElement(JsonML.getChildren(node)[0])}
           <\/Link>
         );
       }]
     ],
   })
;
```
