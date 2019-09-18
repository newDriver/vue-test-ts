// 类型注解
let title1: string; // 字符串类型
title1 = "abc";
// title1 = 1 //wrong

let obj: { abc: string };
obj = { abc: "abc" };
obj.abc;

let union: string | number;
union = "abc";
union = 1;

// 类型推论
let title2 = "xx";
title2 = "abc";
// title2 = 1 //wrong

// 数组类型
let names: string[];
names = ["tom", "jerry"];

// 任意类型
let foo: any;
foo = "xx";
foo = 3;

// any用于数组
let list: any[];
list = [1, true, "abc"];
list[1] = 100;

// 函数中的类型
function greeting(person: string): string {
  return "hello " + person;
}
greeting("tom");
// greeting(1)  // wrong

// void类型
function warn(msg: string): void {
  alert(msg);
}

// purple
// undefine null

// 函数
// 声明就是必选参数
// 加问号变成可选参数
function sayHello(name: string, age: number = 18): void {
  console.log(name, age);
}
sayHello("tom", 19);
sayHello("tom");
// sayHello('tom', 19, true)

// 函数重载：参数数量或者类型，或者返回值类型区别多个同名函数
// 先声明，在实现
function info(a: object): string;
function info(a: string): object;
function info(a: any): any {
  if (typeof a === "object") {
    return a.name;
  } else {
    return { name: a };
  }
}

// class
class MyComp {
  // private - 内部用,protected,public(默认)
  private _foo: string; // 私有属性，不能在类的外部访问
  protected bar: string; // 保护属性，还可以在派生类中访问
  readonly mua = "mua"; // 只读属性必须在声明时或构造函数里初始化
  static abc = "abc";

  // 构造函数：初始化成员变量
  // 参数加上修饰符，能够定义并初始化一个成员属性
  constructor(public tua: string, abc: string) {
    this._foo = "foo";
    this.bar = "bar";
  }

  // 方法也有修饰符
  private someMethod() {}

  say() {}

  // 存取器：存取数据时可添加额外逻辑；在vue里面可以用作计算属性
  get foo() {
    return this._foo;
  }
  set foo(val) {
    this._foo = val;
  }
}

console.log(MyComp.abc);
const comp = new MyComp("abc", "123");
console.log(comp.tua);

class MySubComp extends MyComp {
  // 覆盖父类方法
  say() {
    // 执行父类方法
    super.say();
    console.log(this.bar);
  }
}
const sub = new MySubComp();
console.log(sub.foo);


// 接口
interface Person {
  firstName: string;
  lastName: string;
  fullname(): string;
}
function greeting2(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
const user = { firstName: "Jane", lastName: "User", fullname(){return ''} };
console.log(greeting2(user));

class Greeter implements Person {
    constructor(public firstName: string, public lastName: string){}
    fullname() {
        return this.firstName + ' ' + this.lastName;
    }
}


// 泛型
// 不用泛型
// interface Result {
//   ok: 0 | 1;
//   data: Feature[];
// }

// // 使用泛型
// interface Result<T> {
//     ok: 0 | 1;
//     data: T;
//   }





