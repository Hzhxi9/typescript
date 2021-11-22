/**
 * 接口
 * 
 * 接口既可以在面向对象编程中表示为行为的抽象，也可以用来描述对象的形状
 * 我们用 interface 关键字来定义接口 在接口中可以用分号或者逗号分割每一项，也可以什么都不加
 */

/**对象的形状 */
interface Speakable {
    speak(): void;
    readonly lng: string;  //readonly表示只读属性 后续不可以更改
    name?: string; // ? 表示可选属性
}
const speakMan: Speakable = {
    speak() { },
    name: 'home',
    lng: 'en'
}

/**
 * 行为的抽象 
 * 
 * 接口可以把一些类中共有的属性和方法抽象出来
 * 可以用来约束实现此接口的类
 * 
 * 一个类可以实现多个接口，一个接口也可以被多个类实现
 * 
 * 用 implements关键字来代表 实现
 **/

// 接口可以在面向对象编程中表示为行为的抽象
interface Walker {
    walk(): void;
}
interface Eatable {
    eat(): void
}
// 一个类可以实现多个接口
class Person2 implements Eatable, Walker {
    // 需要实现的接口包含eat方法 不实现会报错
    walk() {
        console.log('walking')
    }
    eat() {
        console.log('eating')
    }
}

/**
 * 定义任意属性
 *  
 * 如果在定义接口的是无法预先知道有哪些属性的时候, 可以用
 * [propName: string]: any, propName 名字是任意的
 */
interface Props {
    /**
     * 这个接口表示 
     * 必须要有 id 和 name 这两个字段 
     * 然后还可以新加其余的未知字段
     */
    id: number;
    name: string;
    [key: string]: any
}
const props: Props = {
    id: 1,
    name: '',
    age: 10,
    last: '',
}

/**
 * 接口的继承
 * 接口也可以继承 
 * 同样的使用 extends关键字
 */
interface FatherType {
    speak(): void
}
interface ChildType extends FatherType {
    speakChinese(): void
}
class Father4 implements ChildType {
    speak() {
        console.log('implements')
    }
    speakChinese() {
        console.log('===')
    }
}

/**
 * 函数类型接口
 * 可以用接口来定义函数类型
 */
interface discount {
    (price: number): number
}
const cost: discount = function (price: number): number {
    return price * 0.8
}

/**
 * 构造函数的类型接口
 * 使用特殊的 new()关键字来描述类的构造函数类型
 * 
 * 其实这样的用法一般出现在 
 * 当我们需要把一个类作为参数的时候 
 * 我们需要对传入的类的构造函数类型进行约束 
 * 所以需要使用 new 关键字代表是类的构造函数类型 用以和普通函数进行区分
 */
class NewAnimal {
    public name: string;
    constructor(name: string) {
        this.name = name
    }
}
/**
 * 不加new是修饰函数的
 * 加new是修饰类的
 */
interface WithNewClass {
    new(name: string): NewAnimal
}
function createAnimal(clazz: WithNewClass, name: string) {
    return new clazz(name)
}
const ani = createAnimal(NewAnimal, 'hello')
console.log(ani.name)

/**
 * 接口(interface) 和类型别名(type) 的区别
 * 
 * 在大多数的情况下使用接口类型和类型别名的效果等价
 * 但是在某些特定的场景下这两者还是存在很大区别
 */

/**
 * 1. 基础数据类型与接口不同
 * 
 * 类型别名还可以用于其他类型
 * 如基本类型（原始值）、联合类型、元组
 */

/**primitive 基本类型 */
type Name = string;

/**union 联合类型 */
type PartialPointX = { x: number }
type PartialPointY = { y: number }
type point = PartialPointX | PartialPointY;

/**tuple 元组*/
type DataType = [number, string]

/**dom 元素节点类型 */
const div = document.getElementById('div')
type Dom = typeof div

/**
 * 2.重复定义
 * 
 * 接口可以定义多次 会被自动合并为单个接口 
 * 类型别名不可以重复定义
 */
interface Point {
    x: number
}
interface Point {
    y: number
}
const point: Point = { x: 1, y: 1 }

/**
 * 3. 扩展
 * 
 * 接口可以扩展类型别名
 * 类型别名也可以扩展接口
 * 但是两者实现扩展的方式不同
 * 
 * 接口的扩展就是继承, 通过 extends 来实现
 * 类型别名通过交叉类型 & 来实现
 */
// 接口扩展接口
interface PointInterX { x: number }
interface PointInterY extends PointInterX { y: number }


// 类型别名扩展类型别名
type PointTypeX = { x: number }
type PointTypeY = PointTypeX & { y: number }

// 接口扩展类型别名
interface PointInter2X { x: number }
type PointType2Y = PointInter2X & { y: number }

// 类型别名扩展接口
type PointType2X = { x: number }
interface PointInter2Y extends PointType2X {
    y: number
}

/**
 * 4. 实现
 * 这里有一个特殊情况
 * 类无法实现定义了联合类型的类型别名
 */
type PartialPoint = { x: number } | { y: number }
// error: 类只能实现具有静态已知成员的对象类型或对象类型的交集
// class SomePartialPoint implements PartialPoint {
//     x = 1
//     y = 2
// }