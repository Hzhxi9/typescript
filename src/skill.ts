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

/**
 * 6.2 Extract<T,U> 
 * 从 T 可分配给的类型中提取 U 
 **/

/**
 * 6.3 NonNullable 
 * 从 T 中排除 null 和 undefined 
 **/

/**
 * 6.4 ReturnType infer 
 * 最早出现在此 PR 中，表示在 extends 条件语句中待推断的类型变量
 **/

/**
 * 6.5 Parameters 
 * 该工具类型主要是获取函数类型的参数类型 
 **/

/**
 * 6.6 Partial  
 * Partial可以将传入的属性由非可选变为可选 
 **/

/**
 * 6.7 Required Required 
 * 可以将传入的属性中的可选项变为必选项，
 * 这里用了 -? 修饰符来实现。 
 **/

/**
 * 6.8 Readonly  
 * Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现 
 **/

/**
 * 6.9 Pick<T,K> 
 * Pick 能够帮助我们从传入的属性中摘取某些返回 
 **/

/**
 * 6.10 Record<K,T> 
 * 构造一个类型，该类型具有一组属性 K，每个属性的类型为 T。
 * 可用于将一个类型的属性映射为另一个类型。
 * Record 后面的泛型就是对象键和值的类型。
 */

/**
 * 6.11 Omit<K,T> 
 * 基于已经声明的类型进行属性剔除获得新类型 
 **/