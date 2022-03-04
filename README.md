# Insui Element #  

基于 ElementUI 的二次封装组件库  
依赖 `@insgeek/util` `vue@2.6` `element-ui@2.13`  

## 引用 ##  

### 设置 npm scope ###  

一般的 `npm` 或 `yarn` 会首先使用 `.mpmrc` 文件配置中的 `scope` 配置  
无 `.npmrc` 文件时使用 `npm` 配置中的 `scope` 配置  
以下配置中 有其中之一即可  

1. 设置 `npm config`  
    ```shell
    npm config set @insgeek:registry http://nexus.insgeek.cn/repository/npm-host/
    ```  
    此时 `npm config list` 中会有如下配置  
    ```shell
    @insgeek:registry = "http://nexus.insgeek.cn/repository/npm-host/"
    ```  

2. 项目中配置 `.npmrc`  
    在 `.npmrc` 文件中添加如下配置  
    ```shell
    @insgeek:registry = "http://nexus.insgeek.cn/repository/npm-host/"
    ```

### 引用 ###  

设置 `scope` 后即可引入  

1. 引入  
    项目中执行 `yarn add @insgeek/element` 引入此工具类  
  
2. 引用  
    导出组件 `import { Button } from "@insgeek/element"`  

3. 按需加载  
    暂无  

## 测试 ##  

目前项目中无测试用例 需要通过 `yarn link` 链接入业务项目进行测试

1. 执行 `yarn install` 安装依赖  
2. 执行 `yarn dev` 进行开发测试  
    此时会启动文件监视 `src` 和 `element` 目录中的文件 有修改时将自动重新打包  
3. 执行 `cd dist` 后执行 `yarn link` 关联库  
4. 在业务代码中执行 `yarn link @insgeek/element` 引入  

## 打包发板 ##  

目前项目只能使用 `yarn` 命令进行打包发板 `npm` 发板时报错且原因不明  

1. 登录私有 `npm`  
    此步骤在未登录时只需执行一次  
    执行 `yarn login http://nexus.insgeek.cn/repository/npm-host/` 登录本地源  
    `npm username` 为 `insgeek` 此条为必须  
    `npm email` 为 `wei.chen@insgeek.com` 此条为必须  
  
2. 发板  
    执行 `yarn build` 打包  
    执行 `cd dist/` 切换编译目录  
    执行 `yarn publish` 此时需要输入 `wei.chen@insgeek.com` 账号密码 详情咨询大喜哥(wei.chen@insgeek.com)  
    确认发布版本后即可  

    `http://nexus.insgeek.cn/#browse/search/npm` 搜索 insgeek scope 可查看历代版本发布包    

    **`yarn publish` 必须在 `/dist` 目录下执行**  
    **发板的编译包为 `/dist` 目录下的文件不是根目录**  
