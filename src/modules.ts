/**模块 and 声明文件 */

/**
 * 全局模块
 *
 * 在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中
 *
 * 使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。
 * 
 * 我们推荐使用下文中将要提到的文件模块
 */

/**foo.ts */
const foo1 = 123;

/**bar.ts */
const bar1 = foo1


/**
 * 文件模块
 * 
 * 1. 文件模块也被称为外部模块。如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域
 * 2. 模块是 TS 中外部模块的简称，侧重于代码和复用
 * 3. 一个模块里的变量、函数、类等在外部是不可见的，除非你把它导出
 * 4. 如果想要使用一个模块里导出的变量，则需要导入
 */

/**foo.ts */
const foo2 = 123;
export { }

/**bar.ts */
const bar2 = foo2 // error


/**
 * 声明文件
 * 
 * 1. 我们可以把类型声明放在一个单独的类型声明文件中
 * 2. 文件命名规范为*.d.ts
 * 3. 查看类型声明文件有助于了解库的使用方式
 */

/**typings\jquery.d.ts */
declare const $:(selector: string) => {
    click() :void;
    width(length: number): void
}


/**
 * 第三方声明文件
 * 
 * 1. 可以安装使用第三方的声明文件
 * 2. @types 是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
 * 3. JavaScript 中有很多内置对象，它们可以在 TypeScript 中被当做声明好了的类型
 * 4. 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准
 * 5. 这些内置对象的类型声明文件，就包含在 TypeScript 核心库的类型声明文件中,具体可以查看ts 核心声明文件
 * @url ts 核心声明文件: https://github.com/Microsoft/TypeScript/tree/main/src/lib
 */

/**
 * 查找声明文件
 * 
 * 1. 如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别
 * 2. 给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
 * 3. 在项目根目录下，编写一个 index.d.ts 文件
 * 4. 针对入口文件（package.json 中的 main 字段指定的入口文件），编写一个同名不同后缀的 .d.ts 文件
 * 
 * 查找过程如下
 * 
 *  1. 先找 myLib.d.ts
 *  2. 没有就再找 index.d.ts
 *  3. 还没有再找 lib/index.d.js
 *  4. 还找不到就认为没有类型声明了
 */