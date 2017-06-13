/**
 * Created by bonny on 17/6/12.
 * Email: xiaohupi@163.com
 */

class Dog{
    constructor(name,color){
        this.name = name;
        this.color = color;
        this._private = 'private';//模拟一下私有属性
    }
    // 类相当于实例中的原型,所有类中定义的方法都会被实例继承
    run(){
        console.info(this.name+" is runing!");
    }
    // 静态方法
    // 静态方法也可以从super调用,子类调用父类的static方法也只能在静态函数中调用
    static printf(){
        console.info("this is static function");
    }


}

var dog1 = new Dog("大毛","黄色");
var dog2 = new Dog("二毛","黑色");
Dog.printf();

//es6 类中无法直接定义静态属性,目前用下面方法定义
Dog.staticPorperty = 'haha';
console.info(Dog.staticPorperty);
console.info(dog1._private);

console.info(dog1.name);//大毛
console.info('------------------------------------------------------------------------------');

//继承实现
class MYDog extends Dog{
    constructor(name,color,id){
        //super不能省略,不然得不到this
        //ES6的继承，实质是先创造父类的实例对象this（必须先调用super）然后再用子类的构造函数修改this
        super(name,color); // 调用父类的constructor(name,color)
        this.id = id;
    }
    run(){
        super.run();
        console.info(this.name+" is runing! it's id is "+this.id);
    }
}

var mydog1 = new MYDog('牧羊犬1','黑色','1');
console.info(mydog1.name);//牧羊犬1
console.info(mydog1.color);//黑色
console.info(mydog1.id);//1
console.info(mydog1._private);
mydog1.run();