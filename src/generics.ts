/**
 * 泛型
 * 
 * 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
 */

function createArray(length: number, value: any): any[] {
    const result = []
    for (let i = 0; i < length; i++) result[i] = value
    return result
}
createArray(3, 'x') // ['x', 'x', 'x']