#### 1.find-files需要一个traverse来得到文件名
```js
exports.traverse = function traverse(filesTree, fn) {
  Object.keys(filesTree).forEach((key) => {
    const value = filesTree[key];
    if (typeof value === 'string') {
      fn(value);
      return;
    }

    traverse(value, fn);
  });
};
```
