import React from 'react';
import { Tooltip, Icon } from 'antd';

const branchUrl = 'https://github.com/ant-design/ant-design/blob/master/';


//实例化方式如下：
//<EditButton title={<FormattedMessage id="app.content.edit-page" />} filename={filename} />
export default function EditButton({ title, filename }) {
  return (
    <Tooltip title={title}>
      <a className="edit-button" href={`${branchUrl}${filename}`}>
        <Icon type="edit" />
      {/*这里的href可以直接定位到我们项目的具体位置*/}
      </a>
    </Tooltip>
  );
}
