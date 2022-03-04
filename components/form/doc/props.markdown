# Form #  

包括 `<form/>` 和 `<form-item>` 标记  

## props ##  
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| options | 表单字段配置 | array | [{ prop: "", disabled: "", type: "", props: {} }] | - |

## methods ##  
| 名称 | 描述 | 参数说明 | 返回值 |
| :---- | :---- | :---- | :---- |
| validate | 表单验证 | - | 返回 promise then 为表单 model catch 为验证失败信息 |