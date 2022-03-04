# Radio #  

包括 `<radio/>` `<radio-button>` 和 `<radio-group>` 标记  

## 使用 ##  
```html
<!--1. -->
<radio-group options="localOptions"/>
<radio-group>
    <radio :label="..." :value="...">选择</radio>
</radio-group>
<radio-group>
    <radio-button :label="..." :value="...">选择</radio>
</radio-group>
<ins-radio :label="..." :value="...">选择</radio>
```

## checkbox-group props ##  
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| options | 选项的列表 | array | [{ lable, value, disbaled, default }] | - |
| type | 选项类型 | string | - / button | - |