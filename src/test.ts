// 1.类型注解
let title1: string;
title1 = "开课吧";
// title1 = 1;//不允许

// 类型推论
let title2 = "xx";
// title2 = 1;//不允许

// 数组类型
let names: string[];
names = ["tom"]; // Array<string>

// 任意类型
let foo: any;
foo = "xx";
foo = 1;

// any类型也可以用于数组
let list: any[];
list = [1, true, "free"];
list[1] = 100;

// 函数中类型
function greeting(person: string, msg?: string): string {
  return "hello," + person;
}

function warnUser(): void {
  alert("lalala");
}

// 最常用：string, number, boolean, object, void, any

// 函数
// 1.必选参
// 2.?:可选参
greeting("tom");

// 3.函数重载：先声明，再写一个实现
function info(a: { name: string }): string;
function info(a: string): { name: string };
function info(a: { name: string } | string): string | { name: string } {
  if (typeof a === "object") {
    return a.name;
  } else {
    return { name: a };
  }
}

// 类
class MyComp {
    private _foo: string = 'foo'; // 私有属性，内部使用
    protected bar: string;// 受保护，派生类可以访问
    public zoo: string = 'zoo';//公共的，都尅访问

    constructor(barVal: string, private tua = 'tua') {
        this.bar = barVal;
    }

    // 存取器：属性方式访问
    get foo() {
        return this._foo;
    }
    set foo(val) {
        this._foo = val;
    }
}

class SubComp extends MyComp {
    constructor(a: string) {
        super(a);
    }
}

const comp1 = new MyComp('afdfd');
const comp2 = new SubComp('afdfd');
comp1.foo = 'aaa'

// 装饰器原理
//类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
function log(target: Function) {
    // target是构造函数
    console.log(target === Foo); // true
    target.prototype.log = function() {
      console.log(this.bar); 
    }
    // 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
}

// 方法装饰器：参数是3个
function dong(target: any, name: string, descriptor: any) {
    // 这里通过修改descriptor.value扩展了bar方法
    const baz = descriptor.value;
    descriptor.value = function(val: string) {
        console.log('dong~~');
        baz.call(this, val);
    }
    return descriptor
}

// 属性装饰器
function mua(param: string) {
    return function (target: any, name: string) {
        target[name] = param;
    }
}


@log
class Foo {
  bar = 'bar'

  @mua('mua~~') ns!:string;

  log(){}

  @dong
  setBar(val: string) {
    this.bar = val
  }
}

const foo2 = new Foo();
// @ts-ignore
foo2.log();

foo2.setBar('lalala')
console.log(foo2.ns);