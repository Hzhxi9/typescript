/**boolean */
const flag: boolean = false;

/**number */
const num: number = 0;

/**string */
const str: string = 'hello';

/**
 * 枚举类型
 * 使用枚举我们可以很好的描述一些特定的业务场景
 * 比如一年中的春、夏、秋、冬，还有每周的周一到周天，还有各种颜色
 * 以及可以用它来描述一些状态信息，比如错误码等
 **/

/**
 * 普通枚举 
 * 初始值默认为 0 
 * 其余的成员会会按顺序自动增长 可以理解为数组下标
 */
enum Color {
    RED,
    PINK,
    BLUE
}
const pink: Color = Color.PINK
console.log(pink) // 1

/**设置初始值 */
enum ColorMap {
    RED = 10,
    PINK,
    BLUE
}
const pink1: ColorMap = ColorMap.PINK
console.log(pink1) // 11

/**
 * 常量枚举 
 * 它是使用 const 关键字修饰的枚举，
 * 常量枚举与普通枚举的区别是，整个枚举会在编译阶段被删除
 */
const enum ColorEnum {
    RED,
    PINK,
    BLUE
}
const colors: ColorEnum[] = [ColorEnum.RED, ColorEnum.PINK, ColorEnum.BLUE]
console.log(colors) // [ 0, 1, 2 ]

/**数组类型(array) */
const array: number[] = [1, 2, 3]
const array1: Array<number> = [1, 2, 3]

/**
 * 元祖类型(tuple)
 * 在 TypeScript 的基础类型中，
 * 元组（ Tuple ）表示一个已知数量和类型的数组 
 * 其实可以理解为他是一种特殊的数组
 **/
const tuples: [string, number] = ['1', 2]

/**
 * Symbol
 * 我们在使用 Symbol 的时候，必须添加 es6 的编译辅助库 
 * 需要在 tsconfig.json 的 libs 字段加上ES2015 Symbol 的值是唯一不变的
 */
const symbol1 = Symbol('hello')
const symbol2 = Symbol('hello')
console.log(Symbol("hello") === Symbol("hello")) // false

/**
 * 任意类型(any)
 * 任何类型都可以被归为 any 类型 
 * 这让 any 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型) 
 * TypeScript 允许我们对 any 类型的值执行任何操作,而无需事先执行任何形式的检查
 * 
 * 一般使用场景： 
 * 第三方库没有提供类型文件时可以使用 any 类型转换遇到困难或者数据结构太复杂难以定义 
 * 不过不要太依赖 any 否则就失去了 ts 的意义了
 */
// const any: any = document.getElementById('root')

/**null and undefined */
const u: undefined = undefined
const un: undefined = void 0;
const n: null = null

/**
 * Unknown
 * 
 * Unknown 和 any的 主要区别是
 *      Unknown 类型会更加严格, 在对 unknown 类型的值执行大多数操作之前
 *      我们必须进行某种形式的检查,
 *      而对any类型的值执行操作之前, 我们不必进行任何检查, 所有类型都可以被归为
 *      unknown, 
 *      但 unknown 类型只能被赋值给 any 类型和 unknown 类型本身
 *      而 any 啥都能分配和被分配
 */
let value: unknown;

value = true; // pass
value = 42; // pass
value = 'hello'; // pass
value = []; // pass
value = {}; // pass

let value1: unknown = value; // pass
let value2: any = value; // pass

// let value3: boolean = value  // error
// let value4: number = value; // Error
// let value5: string = value; // Error
// let value6: object = value; // Error

/**
 * void
 * 表示没有任何类型 
 * 当一个函数没有返回值时 TS 会认为它的返回值是 void 类型。
 */
function func(name: string): void { }

/**
 * never
 * never 一般表示用户无法达到的类型 
 * 例如 never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
 */
function errorFunc(): never {
    throw new Error('error')
}

/**
 * never 和 void 的区别:
 * void 可以被赋值为 null 和 undefined 的类型
 * never 则是一个不包含值的类型。
 * 拥有 void 返回值类型的函数能正常运行
 * 拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
 */

/**
 * BigInt 大数类型
 * 
 * 使用 BigInt 可以安全地存储和操作大整数
 * number 和 BigInt 类型不一样 不兼容
 */
const max1 = Number.MAX_SAFE_INTEGER; // 2**53-1
console.log(max1 + 1 === max1 + 2, 'BigInt===') // true

/**
 * 我们在使用 BigInt 的时候 
 * 必须添加 ESNext 的编译辅助库 需要在 tsconfig.json 的 libs 字段加上ESNext
 **/
const max2 = BigInt(Number.MAX_SAFE_INTEGER);
/**要使用1n需要 "target": "ESNext" */
console.log(max2 + 1n === max2 + 2n);

let foo: number;
let bar: bigint;
// foo = bar; // error
// bar = foo; // error


/**object 类型永远表示非原始类型*/
let obj: object;
// obj = 1 // error
// obj = '1' // error
// obj = true // error
// obj = null // error
// obj = undefined; // error
obj = {} // pass

/**
 * Object 代表所有拥有 toString、hasOwnProperty 方法的类型 
 * 所以所有原始类型、非原始类型都可以赋给
 **/
let object: Object;
object = 1; // pass
object = '1'; // pass
object = false; // pass
// object = null; // error
// object = undefined; // error
object = {}; // pass

/**{} 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合 */
let object1: {};
object1 = 1; // pass
object1 = '1'; // pass
object1 = false; // pass
// object1 = null; // error
// object1 = undefined; // error
object1 = {}; // pass

/**
 * 类型推论
 * 指编程语言中能够自动推导出值的类型的能力 
 * 它是一些强静态类型语言中出现的特性
 * 定义时未赋值就会推论成 any 类型
 * 如果定义的时候就赋值就能利用到类型推论
 */
let initAny; // 推断为any
let count = 123; // 为number类型
let string = 'hello'; // 为string类型

/**
 * 联合类型
 * 联合类型（Union Types）表示取值可以为多种类型中的一种 
 * 未赋值时联合类型上只能访问两个类型共有的属性和方法
 */
let word: string | number;
// console.log(word.toString())
word = 1
console.log(word.toFixed(2));
word = 'hello';
console.log(word.length)


/**
 * 类型断言
 * 有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。
 * 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型
 * 其实就是你需要手动告诉 ts 就按照你断言的那个类型通过编译
 * （这一招很关键 有时候可以帮助你解决很多编译报错）
 */

/**类型断言有两种形式： */

/**尖括号 */
let someValue: any = 'this is a string';
let stringOfLength: number = (<string>someValue).length

/**as */
let anyValue: any = 'this is a string';
let anyOfLength: number = (anyValue as string).length

/**
 * 以上两种方式虽然没有任何区别，
 * 但是尖括号格式会与 react 中 JSX 产生语法冲突
 * 因此我们更推荐使用 as 语法。
 */

/**
 * 非空断言
 * 在上下文中当类型检查器无法断定类型时 
 * 一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型
 */
let is: null | undefined | string;
is!.toString() // pass
// is.toString() // error

/**
 * 字面量类型
 * 在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。 
 * 目前，TypeScript 支持 3 种字面量类型：
 * 字符串字面量类型、数字字面量类型、布尔字面量类型
 * 对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型
 */
const f1: 'hello' = "hello"
const f2: 1 = 1
const f3: false = false

/**
 * 类型别名: 用来给一个类型起个新名字
 */
type types = string | number;
function fun(value: types) { }

/**
 * 交叉类型
 * 交叉类型是将多个类型合并为一个类型。
 * 通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，
 * 包含了所需的所有类型的特性
 */
type typeOfOne = { x: number }
type typeOfTwo = typeOfOne & { y: string }
const flagOfThree: typeOfTwo = {
    x: 1,
    y: '2'
}