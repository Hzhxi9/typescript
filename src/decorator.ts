/**
 * TypeScript 装饰器
 * 
 * 装饰器是一种特殊类型的声明
 * 它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
 * 
 * 常见的装饰器
 *  1. 类装饰器
 *  2. 属性装饰器
 *  3. 方法装饰器
 *  4. 参数装饰器
 * 
 * 装饰器的写法
 *  1. 普通装饰器
 *  2. 装饰器工厂
 * 
 * 使用@装饰器的写法
 * 需要把 tsconfig.json 的 experimentalDecorators 字段设置为 true
 */


/**
 * 类装饰器
 * 类装饰器在类声明之前声明，用来监视、修改或替换类定义
 */
namespace A {
    /**当修饰器作为修饰类的时候, 用来监视、修改或替换类定义 */
    function addNameEat(constructor: Function) {
        constructor.prototype.name = "hello"
        constructor.prototype.eat = function () {
            console.log('eat')
        }
    }

    @addNameEat
    class Person {
        name!: string;
        eat!: Function;
        constructor() { }
    }

    const person: Person = new Person();
    console.log(person.name)
    person.eat()
}

namespace B {
    /**还可以使用装饰器工厂 这样可以传递额外参数 */
    function addNameEatFactory(name: string) {
        return function (constructor: Function) {
            constructor.prototype.name = name;
            constructor.prototype.eat = function () {
                console.log('eat')
            }
        }
    }
    @addNameEatFactory('Person')
    class Person {
        name!: string;
        eat!: Function;
        constructor() { }
    }
    const p: Person = new Person();
    console.log(p.name)
    p.eat()
}

namespace C {
    /**还可以替换类, 不过替换的类要与原类结构相同 */
    function enhancer(constructor: Function) {
        return class {
            name: string = 'c'
            eat() {
                console.log('eating')
            }
        }
    }
    @enhancer
    class Person {
        name!: string;
        eat!: Function;
        constructor() { }
    }
    const p: Person = new Person();
    console.log(p.name)
    p.eat()
}


/**
 * 属性装饰器
 * 属性装饰器表达式会在运行时当作函数被调用
 * 
 * 传入 2 个参数 
 * 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * 第二个参数是属性的名称
 */

/**修饰实例属性 */
function upperCase(target: any, propertyKey: string) {
    let value = target[propertyKey]
    /**用来读取的 getter */
    const getter = function () {
        return value
    }
    /**用来替换的 setter */
    const setter = function (newValue: string) {
        value = newValue.toUpperCase()
    }
    /**替换属性, 先删除原先的属性, 再重新定义属性 */
    if (delete target[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
}

class Word {
    @upperCase
    name!: string
}
const w: Word = new Word();
w.name = 'word'
console.log(w.name)

/**
 * 方法装饰器
 * 
 * 用来装饰类的方法
 * 它接收三个参数：
 * 1. target: Object - 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * 2. propertyKey: string | symbol - 方法名
 * 3. descriptor: TypePropertyDescriptor - 属性描述符
 */

/**修饰实例方法 */
function noEnumerable(target: any, property: string, descriptor: PropertyDescriptor) {
    console.log('target.getName', target.getName)
    console.log('target.getAge', target.getAge)
    descriptor.enumerable = false
}

/**重写方法 */
function toNumber(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const oldMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
        args = args.map(item => parseFloat(item))
        return oldMethod.apply(this, args)
    }
}

class En {
    name: string = 'hello'
    public static age: number = 10
    constructor() { }

    @noEnumerable
    getName() {
        console.log(this.name)
    }

    @toNumber
    sum(...args: any[]) {
        return args.reduce((acc: number, cur: number) => acc + cur, 0)
    }
}

const en: En = new En()

for (const attr in en) {
    console.log('attr=', attr)
}
en.getName()
console.log(en.sum('1', '2', '3'))


/**
 * 参数装饰器
 * 是用来装饰函数参数
 * 
 * 它接收三个参数：
 * 1. target: Object - 被装饰的类
 * 2. propertyKey: string | symbol - 方法名
 * 3. parameterIndex: number - 方法中参数的索引值
 */
function Log(target: Function, key: string, parameterIndex: number) {
    const functionLogged = key || target.prototype.constructor.name
    console.log(
        `The parameter in position ${parameterIndex} at ${functionLogged} has been decorated`
    )
}

class Greeter {
    greeter: string;
    constructor(@Log phrase: string) {
        this.greeter = phrase
    }
}

/**
 * 装饰器执行顺序
 * 
 * 有多个参数装饰器时：从最后一个参数依次向前执行
 * 
 * 方法和方法参数中参数装饰器先执行。
 * 
 * 方法和属性装饰器，谁在前面谁先执行。
 *      因为参数属于方法一部分，所以参数会一直紧紧挨着方法执行
 * 
 * 类装饰器总是最后执行
 */
function Class1Decorator() {
    return function (target: any) {
        console.log('类1 装饰器')
    }
}
function Class2Decorator() {
    return function (target: any) {
        console.log('类2 装饰器')
    }
}

function MethodDecorator() {
    return function (
        target: any,
        methodName: string,
        description: PropertyDescriptor
    ) {
        console.log('方法 装饰器')
    }
}

function Params1Decorator() {
    return function (target: any, methodName: string, parameterIndex: number) {
        console.log('参数1装饰器')
    }
}
function Params2Decorator() {
    return function (target: any, methodName: string, parameterIndex: number) {
        console.log('参数2装饰器')
    }
}

function PropertyDecorator(name: string) {
    return function (target: any, propertyName: string) {
        console.log(name + '属性装饰器')
    }
}

@Class1Decorator()
@Class2Decorator()
class C1 {
    @PropertyDecorator('name')
    name: string = 'hello'
    @PropertyDecorator('age')
    age: number = 10

    @MethodDecorator()
    get(@Params1Decorator() p1: string, @Params2Decorator() p2: string) { }
}

/**
 * name属性装饰器 => age属性装饰器 => 参数2 装饰器 => 参数1 装饰器 => 方法装饰器 => 类2 装饰器 => 类1 装饰器
 */