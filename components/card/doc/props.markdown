# Card #  

## props ##  
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| title | 标题 | boolean | - | - |
| size | 尺寸 | string | medium / small / mini | - |
| collapse | 折叠状态 | boolean | - | true |
| buttons | 按钮配置 | array | [{ ... }] | - |

## events ##  
| 名称 | 说明 | 参数说明 |
| :---- | :---- | :---- |
| collapse | 折叠事件 | status: 折叠状态 `true` 表示即将展开 `false` 标识即将折叠 |

## slots ##  
| 名称 | 描述 | 参数说明 |
| :---- | :---- | :---- |
| default | 内容 | - |
| title | 标题栏 | title 标题 |
| title-bar | 标题栏右侧 <br/> :title / slot:title 将位于标题栏左侧 本 slot 位于右侧 | - |
