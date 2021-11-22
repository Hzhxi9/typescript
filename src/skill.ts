/**使用技巧 */

/**
 * 1. typeof 关键词
 * 除了做类型保护 还可以从实现推出类型
 */

// 先定义变量, 在定义类型
const p = {
    name: 'hello',
    age: 10,
    gender: 'male'
}
type PeopleType = typeof p
function getName(p: PeopleType): string {
    return p.name
}
getName(p)

/**
 * 2. keyof 关键词
 * 可以用来取得一个对象接口的所有 key 值
 */
interface PeopleKeyType {
    name: string;
    age: number;
    gender: 'male' | 'female'
}
/**type PeopleKey = "name" | "age" | "gender" */
type PeopleKey = keyof PeopleKeyType
function getValueByKey(p: PeopleKeyType, key: PeopleKey) {
    return p[key]
}
const val = getValueByKey({ name: "hello", age: 10, gender: "male" }, 'name')


/**
 * 3. 索引访问操作符
 * 使用 [] 操作符可以进行索引访问
 */
interface Person {
    name: string;
    age: number
}
type x = Person['name'] // x is string

/**
 * 4. 映射类型 in
 * 在定义的时候用 in 操作符去批量定义类型中的属性
 */
interface PersonUseIN {
    name: string;
    age: number;
    gender: 'male' | 'female';
}
// 批量把一个接口中的属性都变成可选的
type PartPerson = {
    [key in keyof PersonUseIN]?: PersonUseIN[key]
}
const p2: PartPerson = {}

/**
 * 5. infer 关键字
 * 在条件类型语句中
 * 可以用 infer 声明一个类型变量并且对它进行使用。
 */

// infer R 就是声明一个变量来承载传入函数签名的返回值类型，
// 简单说就是用它取到函数返回值的类型方便之后使用
type ReturnTypes<T> = T extends (...args: any[]) => infer R ? R : any


/**6. 内置工具类型 */

/**
 * 6.1 Exclude<T,U>
 * 从 T 可分配给的类型中排除 U 
 **/

//  原理
// type Exclude<T, U> = T extends U ? never : T;

// 应用
type E = Exclude<string | number, string>
const e: E = 1

/**
 * 6.2 Extract<T,U>
 * 从 T 可分配给的类型中提取 U
 **/

// 原理
// type Extract<T, U> = T extends U ? T : never

// 应用
type Ex = Extract<string | number, string>;
const ex: Ex = '1'

/**
 * 6.3 NonNullable
 * 从 T 中排除 null 和 undefined
 **/

// 原理
// type NonNullable<T> = T extends null | undefined ? never : T

// 应用
type No = NonNullable<string | number | null | undefined>
const no: No = '1'

/**
 * 6.4 ReturnType infer
 * 最早出现在此 PR 中，表示在 extends 条件语句中待推断的类型变量
 * 该工具类型主要是获取函数类型的返回类型
 **/

// 原理
// type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any

// 应用
function getUserInfo() {
    return { name: 'hello', age: 10 }
}
// 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
type UserInfo = ReturnType<typeof getUserInfo>
const users: UserInfo = { name: 'hello', age: 10 }

/**
 * 6.5 Parameters
 * 该工具类型主要是获取函数类型的参数类型
 **/

// 原理
// type Parameters<T> = T extends (...args: infer R) => any ? R : any

// 应用
type T0 = Parameters<() => string>; // []
type T1 = Parameters<(s: string) => void>; // [string]
type T2 = Parameters<<T>(args: T) => T>; // [unknown]

/**
 * 6.6 Partial
 * Partial可以将传入的属性由非可选变为可选
 **/

// 原理
// type Partial<T> = { [P in keyof T]? : T[P]}

// 应用
interface A{
    a1: string;
    a2: number;
    a3: boolean;
}

type aPartial = Partial<A>

const a1: aPartial= {}

/**
 * 6.7 Required 
 * Required 可以将传入的属性中的可选项变为必选项，
 * 这里用了 -? 修饰符来实现。
 **/

// 原理
// type Required<T> = { [P in keyof T]-? : T[P] }

// 应用
interface R {
    name: string;
    age: number;
    gender?: 'male' | 'female'
}
const r1: Required<R> = {
    name: '1',
    age: 1,
    gender: 'male'
}


/**
 * 6.8 Readonly
 * Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现
 **/

// 原理
// type Readonly<T> = { readonly [P in keyof T] : T[P] } 

// 应用
interface Re{
    name: string;
    age: number;
    gender?: 'male' | 'female'
}
const re: Readonly<Re> = {
    name: '1',
    age: 1,
    gender: 'male'
} 
// re.name = '2' // error

/**
 * 6.9 Pick<T,K>
 * Pick 能够帮助我们从传入的属性中摘取某些返回
 **/

// 原理
// type Pick<T, K extends keyof T> = { [P in K] : T[P] }

// 应用
interface Todo {
    title: string;
    description: string;
    done: boolean
}
type TodoBase = Pick<Todo, 'title' | 'done'> // { title: string; done: boolean }



/**
 * 6.10 Record<K,T>
 * 构造一个类型，该类型具有一组属性 K，每个属性的类型为 T。
 * 可用于将一个类型的属性映射为另一个类型。
 * Record 后面的泛型就是对象键和值的类型。
 * 
 * 简单理解: 
 * K 对应对应的 key，T 对应对象的 value
 * 返回的就是一个声明好的对象 
 * 但是 K 对应的泛型约束是keyof any 也就意味着只能传入 string|number|symbol
 */

// 原理
// type Record<K extends keyof any, T> = { [P in K] : T}

// 应用
type PointType = "x" | "y"

type PointList = Record<PointType, {value: number}>

const cars: PointList = { x: {value: 1}, y: {value: 2} }

/**
 * 6.11 Omit<K,T>
 * 基于已经声明的类型进行属性剔除获得新类型
 **/

// 原理
// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// 应用
type Users = {
    id: string,
    name: string;
    email: string
}
type UsersWithoutEmail = Omit<Users, 'email'>; // { id: string; name: string }

