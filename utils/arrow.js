// 箭头函数转换
let babel = require('babel-core')
let types = require('babel-types')

let code = 'let arrow = (a, b) => a + b'  

// visitor 相当于一个访问者模式
const visitor = {  // 这个访问者对特点的节点进行处理
  ArrowFunctionExpression(path) {
    let {id, params, body, generator, async} = path.node
    // 使用 types 来创建对应的源代码
    // let {left, right, operator} = body
    let block = types.blockStatement([
      types.returnStatement(body)
    ])
    let result =  types.functionExpression(id, params, block, generator, async)
    path.replaceWith(result)
  }
}
let arryPlugin = { visitor } 

// babel 内部先把代码转换成 AST，然后进行遍历
let result =  babel.transform(code, {
  plugins: [
    arryPlugin
  ]
})

console.log(result.code)