/**
 * 泛型
 * 
 * 泛型（Generics）是指在定义函数、接口或类的时候，
 * 不预先指定具体的类型，而在使用的时候再指定类型的一种特性
 */

function createArray(length: number, value: any): any[] {
    const result = []
    for (let i = 0; i < length; i++) result[i] = value
    return result
}
createArray(3, 'x') // ['x', 'x', 'x']

/**
 * 上述这段代码用来生成一个长度为 length 值为 value 的数组
 * 但是我们其实可以发现一个问题
 * 不管我们传入什么类型的 value 返回值的数组永远是 any 类型 
 * 如果我们想要的效果是 我们预先不知道会传入什么类型
 * 但是我们希望不管我们传入什么类型 
 * 我们的返回的数组的指里面的类型应该和参数保持一致 
 * 那么这时候 泛型就登场了
 */

/**
 * 1. 使用泛型改造 
 * 
 * 使用<>的写法 
 * 然后再面传入一个变量 T 用来表示后续函数需要用到的类型 
 * 当我们真正去调用函数的时候再传入 T 的类型就可以解决很多预先无法确定类型相关的问题
 */
function createGenArray<T>(length: number, value: T): T[] {
    const result = []
    for (let i = 0; i < length; i++) result[i] = value
    return result
}
createGenArray<string>(3, 'x')

/**
 * 2. 多个类型参数
 *
 * 如果我们需要有多个未知的类型占位
 * 那么我们可以定义任何的字母来表示不同的类型参数
 */
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
swap<string, number>(['1', 2])

/**
 * 3. 泛型约束
 * 
 * 在函数内部使用泛型变量的时候
 * 由于事先不知道它是哪种类型
 * 所以不能随意的操作它的属性或方法
 * 
 * 注意: 我们在泛型里面使用extends关键字代表的是泛型约束 需要和类的继承区分开
 */
// function logging<T>(arg: T): T { 
//     // 泛型 T 不一定包含属性 length，所以编译的时候报错了。
//     console.log(arg.length)
//     return arg
// }

/**
 * 这时，我们可以对泛型进行约束，
 * 只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束
 */
interface LengthWise {
    length: number
}
function logging<T extends LengthWise>(arg: T): T {
    console.log(arg.length)
    return arg
}

/**
 * 4. 泛型接口
 * 定义了接口传入的类型 T 之后返回的对象数组里面 T 就是当时传入的参数类型
 */
interface Cart<T> {
    list: T[]
}
const cart: Cart<{ name: string, age: number }> = {
    list: [{ name: '1', age: 2 }]
}

/**
 * 5. 泛型类
 * 一个在数组里面添加数字并且获取最大值的泛型类
 */
class MainArray<T>{
    private list: T[] = []
    add(value: T) {
        this.list.push(value)
    }
    getMax(): T {
        let result = this.list[0]
        for (let i = 0, len = this.list.length; i < len; i++) {
            if (this.list[i] > result) result = this.list[i]
        }
        return result
    }
}
let arr = new MainArray();
arr.add(1);
arr.add(2);
arr.add(3);
let ret = arr.getMax();
console.log(ret);

/**
 * 6. 泛型类型别名
 */
type CartType<T> = { list: T[] } | T[]
const t1: CartType<string> = {
    list: ['1']
}
const t2: CartType<number> = [1]

/**
 * 7. 泛型参数的默认类型
 * 
 * 可以为泛型中的类型参数指定默认类型
 * 当使用泛型时没有在代码中直接指定类型参数
 * 从实际值参数中也无法推测出时，这个默认类型就会起作用
 */
function createArr<T = string>(len: number, value: T): T[] {
    const result = []
    for (let i = 0; i < len; i++) result[i] = value
    return result
}
createArr(3, '2')
createArr<number>(3, 3)