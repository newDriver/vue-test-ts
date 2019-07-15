// Hello.vue
let name2 = "xx"; // 类型推论
let title: string; // 类型注解
// name = 2;// 错误
// title = 4;// 错误
title = "开课吧";

// 数组类型
let names: string[];
names = ["tom"];

// 任意类型
let foo: any = "xx";
foo = 2;

// 任意类型用于数组
let list: any[] = [1, "aaa"];

// 多种类型
let multiType: string | number;
multiType = 2;

// 类型用于函数
function greeting(person: string): string {
  return "Hello " + person;
}
function warnUser(msg: string): void {
  alert(msg);
}
// 内置类型
// string, number, boolean, void, any


// 函数参数如果声明，就是必选参数
// ？表示可选参数
function sayHello(name: string, age?: number): string {
  console.log(name, age);
  return name + age;
}
sayHello('tom', 12); // right
sayHello("开课吧"); // wrong

// 重载：通过参数或返回值类型或个数区别同名函数，先声明，再实现
// 声明1
function info(a: object): string;
// 声明2
function info(a: string): object;
// 实现
function info(a: any): any {
  if (typeof a === "object") {
    return a.name;
  } else {
    return { name: a };
  }
}
console.log(info({ name: "tom" }));
console.log(info("tom"));


// class
class MyComp {
    // 访问修饰符private、public、protected
    //private _foo: string; // 私有属性，不能在类的外部访问
    //protected bar: string;// 保护属性，还可以在派生类中访问
    readonly mua = 'mua'; // 只读属性必须在声明时或构造函数里初始化
      
    // 构造函数：初始化成员变量
    // 参数加上修饰符，能够定义并初始化一个成员属性
    constructor (private tua = 'tua', private _foo = 'foo', protected bar = 'bar') {
       //this._foo = foo;
      //this.bar = bar;
    }
      
    // 方法也有修饰符
    private someMethod() {}
    
    // 存取器：存取数据时可添加额外逻辑；在vue里面可以用作计算属性
    get foo() { return this._foo }
    set foo(val) { this._foo = val }
    
  }


  interface Person {
    firstName: string;// 要求有firstName属性
    lastName: string;// 要求有lastName属性
    sayHello(): string; // 要求实现sayHello方法
  }
  // 实现接口
  class Greeter implements Person {
    constructor(public firstName='', public lastName=''){}
    sayHello(){
      return 'Hello, ' + this.firstName + ' ' + this.lastName;
    }
  }
  // 面向接口编程
  function greeting2(person: Person) {
    return person.sayHello();
  }
  // const user = {firstName: 'Jane', lastName: 'User'};
  const user = new Greeter('Jane', 'User'); // 创建对象实例
  console.log(user);
  console.log(greeting2(user));




// 不用泛型
// interface Result {
//   ok: 0 | 1;
//   data: Feature[];
// }

// 使用泛型
interface Result<T> {
    ok: 0 | 1;
    data: T[];
  }