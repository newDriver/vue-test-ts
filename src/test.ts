// 类型注解
let foo = "xx"; // 类型推论
let bar: string; // 类型注解

let abc: { foo: string; bar: number };
abc = { foo: "foo", bar: 1 };
abc.foo = "afaf";

let efg: string | number;
efg = "efg";
efg = 1;

// bar = 1 // wrong
bar = "bar";

// 数组类型约束
let names: string[];
names = ["Tom", "Jerry"];

// 任意类型
let baz: any;
baz = 1;
baz = "abc";

// any应用于数组
let list: any[] = [1, true, "free"];
list[0] = "abc";

// 函数中使用类型
function greeting(person: string): string {
  return "Hello," + person;
}
greeting("tom");

function warnUser(): void {
  alert("lalalala");
}

// 内置常用类型：string, number, boolean, void, any

// 函数
// 必填参数：形参只要生命必须传递
// 加上？表示可选，可选参数要在必选参数后面
function sayHello(name: string, age?: number) {
  console.log(name, age);
}
sayHello('tom',18)
sayHello('tom')

// * 函数重载：以参数数量或类型区分多个同名函数
// 先声明，在实现
function info(a: object): string;
function info(a: string): object;
// 实现
function info(a: any): any {
  if (typeof a === 'object') {
    return a.name;
  } else {
    return {name: a}
  }
}

// class
class MyComp {
  private _foo: string; // 私有属性，不能在类的外部访问
  protected bar: string;// 保护属性，还可以在派生类中访问
  readonly mua = 'mua'; // 只读属性必须在声明时或构造函数里初始化
  static dong = 'dong'; // MyComp.dong访问

  // 构造函数：初始化成员变量
  // 参数加上修饰符，能够定义并初始化一个成员属性
  constructor (private tua = 'tua') {
  	this._foo = 'foo';
    this.bar = 'bar';
  }
    
  // 方法也有修饰符
  private someMethod() {
    // this.tua
  }
  
  // 存取器：存取数据时可添加额外逻辑；在vue里面可以用作计算属性
  get foo() { return this._foo }
  set foo(val) { this._foo = val }
  
}

const mycomp = new MyComp();
mycomp.foo = 'afdfdf'


// 接口：之声明结构，不需要实现
interface Person {
  firstName: string;
  lastName: string;
}
function greeting2(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
class Human implements Person {
  firstName: string = '';
  lastName: string = '';
}
const user = {firstName: 'Jane', lastName: 'User'};
console.log(user);
console.log(greeting2(user));
const human = new Human()
console.log(greeting2(human));



// 自定义装饰器
//类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
function log(target: Function) {
  // target是构造函数
  console.log(target === Foo); // true
  target.prototype.log = function() {
    console.log(this.bar); 
  }
  // 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
}
// 方法装饰器
function dong(target: any, name: string, descriptor: any) {
  // target是原型或构造函数，name是方法名，descriptor是属性描述符，   
  // 方法的定义方式：Object.defineProperty(target, name, descriptor)
  console.log(target[name] === descriptor.value);
  
  // 这里通过修改descriptor.value扩展了bar方法
  const baz = descriptor.value; // 之前的方法
  descriptor.value = function(val: string) {    
      console.log('dong~~');
      baz.call(this, val);
  }
  // return target
}
// 属性装饰器
function mua(target, name) {
  // target是原型或构造函数，name是属性名
  console.log(target === Foo.prototype);
  target[name] = 'mua~~~'
}

@log
class Foo {
  bar = 'bar'
  @mua ns!:string;
  @dong
  baz(val: string) {
    this.bar = val
  }
}

const foo2 = new Foo();
// @ts-ignore
foo2.log();
console.log(foo2.ns);
foo2.baz('lalala')