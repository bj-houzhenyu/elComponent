# Checkbox #  

包括 `<checkbox>` `<checkbox-button>` 和 `<checkbox-group>` 标记  

## 使用 ##  
```html
<ins-checkbox-group options="localOptions"/>
<ins-checkbox-group>
    <ins-checkbox :label="..." :value="...">选择</ins-checkbox>
</ins-checkbox-group>
<radio-group>
    <checkbox-button :label="..." :value="...">选择</radio>
</radio-group>
<ins-checkbox :label="..." :value="...">选择</ins-checkbox>
```

## checkbox-group props ##  
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :---- | :---- | :---- | :---- |
| options | 选项的列表 | array | [{ lable, value, disbaled, default }] | - |
| type | 选项类型 | string | - / button | - |