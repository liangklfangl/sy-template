### 1.去掉noParse，不然无法通过expose-loader引入jquery

### 2.对于我们的resolve也要智能合并
```js
 resolve: {
      alias: {
        "expose" :"antd"
      },
      extensions: ['.js', '.jsx', '.json', '.less', '.scss', '.css', '.png', '*']
    }
```
