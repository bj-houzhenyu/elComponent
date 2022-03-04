# Translate #  

包括 `<tanslate/>` 和 `<datetime-translate>` 标记  

## props ##  
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| value | 值 | any | - | - |
| options | 选项 | array | [{ label, value }] | - |
| filter | 筛选方法 | function | - | (item, value) => item.value === value |
| formater | 值处理方法 | function | - | - |

## slots ##  
| 名称 | 描述 |
| :---- | :---- |
| default | 默认标签 |