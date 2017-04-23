
/**
 * [getMenuItems We sort moduleData with meta.order, and each category will contains lots of types, details https://ant.design/docs/react/introduce-cn]
 * @param  {[type]} moduleData [description]
 * @param  {[type]} locale     [description]
 * @return {[type]}            [description]
 */
export function getMenuItems(moduleData, locale) {
  const menuMeta = moduleData.map(item => item.meta);
  //We get meta data from markdown files from props.picked, such as components, changelog or docs/react
  const menuItems = {};
  menuMeta.sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  ).forEach((meta) => {
    const category = (meta.category && meta.category[locale]) || meta.category || 'topLevel';
    //We get category from meta, default value is "topLevel"
    if (!menuItems[category]) {
      menuItems[category] = {};
    }
    const type = meta.type || 'topLevel'; 
    //type: Data Display
    if (!menuItems[category][type]) {
      menuItems[category][type] = [];
    }
    menuItems[category][type].push(meta);
  });
  return menuItems;
}

//判断路由中是否含有zh字段，判断是否是中文
export function isZhCN(pathname) {
  return /-cn\/?$/.test(pathname);
}


//getLocalizedPathname('/', isZhCN)获取点击Head中左侧的logo应该跳转的地址
export function getLocalizedPathname(path, zhCN) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  //获取具体的路径
  if (!zhCN) { // to enUS
    //英文版的地址为：http://localhost:8001/components/icon/
    //英文版的时候，如果是index-cn那么直接切换到主目录下，否则就是取消-cn部分就可以了
    return /\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
  } else if (pathname === '/') {
    return '/index-cn';
    //如果是中文，而且路径是'/'
  } else if (pathname.endsWith('/')) {
    //如果是中文，路径以'/'结尾，那么添加-cn
    return pathname.replace(/\/$/, '-cn/');
  }
  return `${pathname}-cn`;
}



export function ping(url, callback) {
  const img = new Image();
  let done;
  const finish = (status) => {
    if (!done) {
      done = true;
      img.src = '';
      callback(status);
    }
  };
  img.onload = () => finish('responded');
  img.onerror = () => finish('error');
  img.src = url;
  return setTimeout(() => finish('timeout'), 1500);
}
