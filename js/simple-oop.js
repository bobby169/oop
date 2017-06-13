/**
 * Created by bonny on 17/6/12.
 * Email: xiaohupi@163.com
 */

function Dog(name,color) {
    this.name = name;
    this.color = color;
    this._private = 'private';//模拟一下私有属性
}

Dog.printf = function () {
    console.info("this is static function");
}

Dog.prototype.run = function () {
    console.info(this.name+" is runing!");
}

var dog1 = new Dog("大毛","黄色");
var dog2 = new Dog("二毛","黑色");
Dog.printf();

Dog.staticPorperty = 'haha';
console.info(Dog.staticPorperty);
console.info(dog1._private);

console.info(dog1.name);//大毛
console.info('------------------------------------------------------------------------------');

//继承实现
function MYDog(name,color,id) {
    //ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）
    Dog.call(this,name,color);
    this.id = id;
}

console.info(MYDog.prototype.constructor);
//直接替换了MYDog.prototype,则一定要把constructor指回MYDog
MYDog.prototype = new Dog();//可以用MYDog.prototype = Object.create(Dog.prototype);
console.info(MYDog.prototype.constructor == Dog); //true
//重要
MYDog.prototype.constructor = MYDog;
console.info(MYDog.prototype.constructor);

MYDog.prototype.run = function () {
    Dog.prototype.run.call(this);
    console.info(this.name+" is runing! it's id is "+this.id);
}

var mydog1 = new MYDog('牧羊犬1','黑色','1');
//如果不加MYDog.prototype.constructor = MYDog;则mydog1.constructor = Dog
console.info(mydog1.constructor);
console.info(mydog1.name);//牧羊犬1
console.info(mydog1.color);//黑色
console.info(mydog1.id);//1
console.info(mydog1._private);
mydog1.run();
