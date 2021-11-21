var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**boolean */
var flag = false;
/**number */
var num = 0;
/**string */
var str = 'hello';
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
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["PINK"] = 1] = "PINK";
    Color[Color["BLUE"] = 2] = "BLUE";
})(Color || (Color = {}));
var pink = Color.PINK;
console.log(pink); // 1
/**设置初始值 */
var ColorMap;
(function (ColorMap) {
    ColorMap[ColorMap["RED"] = 10] = "RED";
    ColorMap[ColorMap["PINK"] = 11] = "PINK";
    ColorMap[ColorMap["BLUE"] = 12] = "BLUE";
})(ColorMap || (ColorMap = {}));
var pink1 = ColorMap.PINK;
console.log(pink1); // 11
var colors = [0 /* RED */, 1 /* PINK */, 2 /* BLUE */];
console.log(colors); // [ 0, 1, 2 ]
/**数组类型(array) */
var array = [1, 2, 3];
var array1 = [1, 2, 3];
/**
 * 元祖类型(tuple)
 * 在 TypeScript 的基础类型中，
 * 元组（ Tuple ）表示一个已知数量和类型的数组
 * 其实可以理解为他是一种特殊的数组
 **/
var tuples = ['1', 2];
/**
 * Symbol
 * 我们在使用 Symbol 的时候，必须添加 es6 的编译辅助库
 * 需要在 tsconfig.json 的 libs 字段加上ES2015 Symbol 的值是唯一不变的
 */
var symbol1 = Symbol('hello');
var symbol2 = Symbol('hello');
console.log(Symbol("hello") === Symbol("hello")); // false
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
var u = undefined;
var un = void 0;
var n = null;
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
var value;
value = true; // pass
value = 42; // pass
value = 'hello'; // pass
value = []; // pass
value = {}; // pass
var value1 = value; // pass
var value2 = value; // pass
// let value3: boolean = value  // error
// let value4: number = value; // Error
// let value5: string = value; // Error
// let value6: object = value; // Error
/**
 * void
 * 表示没有任何类型
 * 当一个函数没有返回值时 TS 会认为它的返回值是 void 类型。
 */
function func(name) { }
/**
 * never
 * never 一般表示用户无法达到的类型
 * 例如 never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
 */
function errorFunc() {
    throw new Error('error');
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
var max1 = Number.MAX_SAFE_INTEGER; // 2**53-1
console.log(max1 + 1 === max1 + 2, 'BigInt==='); // true
/**
 * 我们在使用 BigInt 的时候
 * 必须添加 ESNext 的编译辅助库 需要在 tsconfig.json 的 libs 字段加上ESNext
 **/
var max2 = BigInt(Number.MAX_SAFE_INTEGER);
/**要使用1n需要 "target": "ESNext" */
console.log(max2 + 1n === max2 + 2n);
var foo;
var bar;
// foo = bar; // error
// bar = foo; // error
/**object 类型永远表示非原始类型*/
var obj;
// obj = 1 // error
// obj = '1' // error
// obj = true // error
// obj = null // error
// obj = undefined; // error
obj = {}; // pass
/**
 * Object 代表所有拥有 toString、hasOwnProperty 方法的类型
 * 所以所有原始类型、非原始类型都可以赋给
 **/
var object;
object = 1; // pass
object = '1'; // pass
object = false; // pass
// object = null; // error
// object = undefined; // error
object = {}; // pass
/**{} 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合 */
var object1;
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
var initAny; // 推断为any
var count = 123; // 为number类型
var string = 'hello'; // 为string类型
/**
 * 联合类型
 * 联合类型（Union Types）表示取值可以为多种类型中的一种
 * 未赋值时联合类型上只能访问两个类型共有的属性和方法
 */
var word;
// console.log(word.toString())
word = 1;
console.log(word.toFixed(2));
word = 'hello';
console.log(word.length);
/**
 * 类型断言
 * 有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。
 * 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型
 * 其实就是你需要手动告诉 ts 就按照你断言的那个类型通过编译
 * （这一招很关键 有时候可以帮助你解决很多编译报错）
 */
/**类型断言有两种形式： */
/**尖括号 */
var someValue = 'this is a string';
var stringOfLength = someValue.length;
/**as */
var anyValue = 'this is a string';
var anyOfLength = anyValue.length;
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
var is;
is.toString(); // pass
// is.toString() // error
/**
 * 字面量类型
 * 在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。
 * 目前，TypeScript 支持 3 种字面量类型：
 * 字符串字面量类型、数字字面量类型、布尔字面量类型
 * 对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型
 */
var f1 = "hello";
var f2 = 1;
var f3 = false;
function fun(value) { }
var flagOfThree = {
    x: 1,
    y: '2'
};
/**
 * 类型保护
 *
 * 类型保护就是一些表达式
 * 他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
 * 其主要思想是尝试检测属性、方法或原型，以确定如何处理值
 */
/**typeof 类型保护 */
function double(input) {
    if (typeof input === 'string')
        return input + input;
    else if (typeof input === 'number')
        return input * 2;
    else
        return !input;
}
function getNumber(value) {
    if ('fly' in value)
        return value.fly;
    return value.leg;
}
/**instanceof 类型保护 */
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bird;
}(Animal));
function getCount(animal) {
    if (animal instanceof Bird)
        console.log(animal.fly);
    else
        console.log(animal.name);
}
/**
 * 自定义类型保护
 * 通过 type is xxx这样的类型谓词来进行类型保护
 * 例如下面的例子 value is object就会认为如果函数返回 true
 * 那么定义的 value 就是 object 类型
 */
function isObject(value) {
    return typeof value === 'object' && value !== null;
}
function fn(x) {
    if (isObject(x)) {
        //...
    }
    else {
        // ...
    }
}
/**
 * 函数的定义
 * 可以指定参数的类型和返回值的类型
 **/
function hello(name) {
    console.log('hello', name);
}
hello('hh');
var countNumber = function (a, b) { return a + b; };
/**
 * 可选参数
 * 在 TS 中函数的形参和实参必须一样
 * 不一样就要配置可选参数,而且必须是最后一个参数
 */
function print(name, age) {
    console.log(name, age);
}
print("hhhh");
/**
 * 默认参数
 */
function ajax(url, method) {
    if (method === void 0) { method = "GET"; }
    console.log(url, method);
}
ajax('/user');
/**
 * 剩余参数
 */
function sum() {
    var num = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        num[_i] = arguments[_i];
    }
    return num.reduce(function (acc, cur) { return acc += cur; }, 0);
}
console.log(sum(1, 2, 3));
/**
 * 函数重载
 * 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。
 * 在 TypeScript 中，表现为给同一个函数提供多个函数类型定义
 *
 * 函数重载真正执行的是同名函数最后定义的函数体
 * 在最后一个函数体定义之前全都属于函数类型定义
 * 不能写具体的函数实现方法 只能定义类型
 */
var obj2 = {};
function attr(val) {
    if (typeof val === 'string')
        obj2.name = val;
    else
        obj2.age = val;
}
attr('hello');
attr(9);
// attr(true); 
console.log(obj2);
/**
 * 类
 * 在 TypeScript 中，我们可以通过 Class 关键字来定义一个类
 */
var Person = /** @class */ (function () {
    function Person(_name) {
        this.name = _name;
    }
    Person.prototype.getName = function () {
        console.log(this.name);
    };
    return Person;
}());
var p1 = new Person('hello');
p1.getName();
/**
 * 当我们定义一个类的时候,会得到 2 个类型
 * 一个是构造函数类型的函数类型(当做普通构造函数的类型)
 * 另一个是类的实例类型（代表实例）
 */
var Component = /** @class */ (function () {
    function Component() {
        this.myName = "实例名称";
    }
    Component.myName = "静态名称";
    return Component;
}());
/**
 * ts 一个类型 一个叫值
 */
/**放在=后面的是值 */
var comp = Component; /**这里是代表构造函数 */
/**冒号后面的是类型 */
var c = new Component(); /**这里是代表实例类型 */
var f = comp;
/**
 * 存取器
 * 在 TypeScript 中
 * 我们可以通过存取器来改变一个类中属性的读取和赋值行为
 */
var User = /** @class */ (function () {
    function User(myName) {
        this.myName = myName;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.myName;
        },
        set: function (value) {
            this.myName = value;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
var user = new User('home');
user.name = 'world';
/**
 * readonly 只读属性
 * readonly 修饰的变量只能在构造函数中初始化
 * TypeScript 的类型系统同样也允许将 interface、type、 class 上的属性标识为 readonly
 * readonly 实际上只是在编译阶段进行代码检查。
 */
var Animal1 = /** @class */ (function () {
    function Animal1(name) {
        this.name = name;
    }
    Animal1.prototype.changeName = function (name) {
        // this.name = name // error
    };
    return Animal1;
}());
var a = new Animal1('dog');
/**
 * 继承
 * 子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性
 * 将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
 * super 可以调用父类上的方法和属性
 * 在 TypeScript 中，我们可以通过 extends 关键字来实现继承
 */
var Father = /** @class */ (function () {
    function Father(name, age) {
        /**构造函数 */
        this.name = name;
        this.age = age;
    }
    Father.prototype.getName = function () {
        return this.name;
    };
    Father.prototype.setName = function (name) {
        this.name = name;
    };
    return Father;
}());
var Son = /** @class */ (function (_super) {
    __extends(Son, _super);
    function Son(name, age, no) {
        var _this = _super.call(this, name, age) || this;
        _this.no = no;
        return _this;
    }
    Son.prototype.getNo = function () {
        return this.no;
    };
    return Son;
}(Father));
var s1 = new Son('hello', 10, 1);
console.log(s1);
/**
 * 类里面的修饰符
 * public 类里面 子类 其它任何地方外边都可以访问
 * protected 类里面 子类 都可以访问,其它任何地方不能访问
 * private 类里面可以访问，子类和其它任何地方都不可以访问
 */
var Father1 = /** @class */ (function () {
    function Father1(name, age, car) {
        /**构造函数 */
        this.name = name;
        this.age = age;
        this.car = car;
    }
    Father1.prototype.getName = function () {
        return this.name;
    };
    Father1.prototype.setName = function (name) {
        this.name = name;
    };
    return Father1;
}());
var Son1 = /** @class */ (function (_super) {
    __extends(Son1, _super);
    function Son1(name, age, car) {
        return _super.call(this, name, age, car) || this;
    }
    Son1.prototype.desc = function () {
        console.log(this.name + " " + this.age + " " + this.car); //car访问不到 会报错
    };
    return Son1;
}(Father1));
var c1 = new Son1('hello', 10, 1000);
console.log(c1.name);
console.log(c1.age); //age访问不到 会报错
console.log(c1.car); //car访问不到 会报错
