# Table #  

包括 `<table/>` `<table-column>` `<data-table>` 和 `<search-table>` 标记  

## table props ##  
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| options | 传入配置 | array | [{ prop, filter, slot, props }] | - |

## table slot ##  
| 名称 | 描述 |
| :---- | :---- |
| default | 列表 |
| header | 列表外地步 |
| footer | 列表外底部 分页组件同行 分页组件左侧 不包含分页组件 |

## table events ##  
| 名称 | 描述 | 参数说明 |
| :---- | :---- | :---- |
| change | 分页或搜索参数变更 | type 类型如 header sort / params 变更后的值 |

## data-table props ##  
`<search-table>` 使用 `<table>` `slots` 实现  
需要支持 `<table>` 所有配置
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| pager | 分页信息 | bool / object | false 是不展示分页 / [{ page_number ... }] | [{ page_number: 1, page_size: 10 }] |

## search-table props ##  
`<search-table>` 使用 `<table>` `slots` 实现  
需要支持 `<table>` 所有配置
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| search | 传入搜索配置 | array | [{ label, value, disabled, default }] | - |