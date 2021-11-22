/**
 * 函数的定义 
 * 可以指定参数的类型和返回值的类型
 **/
function hello(name: string): void {
    console.log('hello', name)
}
hello('hh')

/**
 * 函数表达式
 * 定义函数类型
 */
type SumFunc = (x: number, y: number) => number
const countNumber: SumFunc = function (a, b) { return a + b }

/**
 * 可选参数
 * 在 TS 中函数的形参和实参必须一样
 * 不一样就要配置可选参数,而且必须是最后一个参数
 */
function print(name: string, age?: number): void {
    console.log(name, age)
}
print("hhhh")

/**
 * 默认参数
 */
function ajax(url: string, method: string = "GET") {
    console.log(url, method)
}
ajax('/user')

/**
 * 剩余参数
 */
function sum(...num: number[]) {
    return num.reduce((acc, cur) => acc += cur, 0)
}
console.log(sum(1, 2, 3))

/**
 * 函数重载
 * 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。
 * 在 TypeScript 中，表现为给同一个函数提供多个函数类型定义
 * 
 * 函数重载真正执行的是同名函数最后定义的函数体
 * 在最后一个函数体定义之前全都属于函数类型定义 
 * 不能写具体的函数实现方法 只能定义类型
 */
const obj2: any = {}
function attr(val: string): void;
function attr(val: number): void;
function attr(val: any): void {
    if (typeof val === 'string') obj2.name = val
    else obj2.age = val
}
attr('hello')
attr(9)
// attr(true); 
console.log(obj2);