####  目前 TypeScript 的代码检查主要有两个方案：使用 TSLint 或使用 ESLint + typescript-eslint-parser。

![](https://ts.xcatliu.com/assets/typescript-eslint-tslint.png)

### 各种检测工具的优势和劣势

#### TSLint 的优点：
1. 专为 TypeScript 服务，bug 比 ESLint 少
2. 不受限于 ESLint 使用的语法树 ESTree
3. 能直接通过 tsconfig.json 中的配置编译整个项目，使得在一个文件中的类型定义能够联动到其他文件中的代码检查

#### ESLint 的优点：

1. 基础规则比 TSLint 多很多（249 : 151）
2. 社区繁荣，插件众多（50+ : 9）


```
vue 文档推荐配置
// tsconfig.json
{
  "compilerOptions": {
    // 与 Vue 的浏览器支持保持一致
    "target": "es5",
    // 这可以对 `this` 上的数据属性进行更严格的推断
    "strict": true,
    // 如果使用 webpack 2+ 或 rollup，可以利用 tree-shake:
    "module": "es2015",
    "moduleResolution": "node"
  }
}
```