// cnpm install esprima estraverse escodegen -S

let esprima = require('esprima')
let estraverse = require('estraverse')
let escodegen = require('escodegen')

let code = 'function test() {}'

let ast = esprima.parse(code)

estraverse.traverse(ast, { // 每个节点进入两次，一次是进入，一次离开
  /**
   * 
   * @param {enter, leave} node 相当于两个生命函数
   */
  enter(node) {
    console.log(node.type)
  },
  leave(node) {
    console.log(node.type)
  }
})

escodegen.generate(ast) // 把 AST 转换成源码
console.log(ast)
