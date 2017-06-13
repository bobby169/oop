/**
 * Created by bonny on 17/6/12.
 * Email: xiaohupi@163.com
 */
this.createjs = this.createjs||{};

/**
 * Sets up the prototype chain and constructor property for a new class.
 *
 * This should be called right after creating the class constructor.
 *
 * 	function MySubClass() {}
 * 	createjs.extend(MySubClass, MySuperClass);
 * 	MySubClass.prototype.doSomething = function() { }
 *
 * 	var foo = new MySubClass();
 * 	console.log(foo instanceof MySuperClass); // true
 * 	console.log(foo.prototype.constructor === MySubClass); // true
 *
 * @method extend
 * @param {Function} subclass The subclass.
 * @param {Function} superclass The superclass to extend.
 * @return {Function} Returns the subclass's new prototype.
 */
createjs.extend = function(subclass, superclass) {
    "use strict";

    function o() { this.constructor = subclass; }
    o.prototype = superclass.prototype;
    return (subclass.prototype = new o());
};

/**
 * Promotes any methods on the super class that were overridden, by creating an alias in the format `prefix_methodName`.
 * It is recommended to use the super class's name as the prefix.
 * An alias to the super class's constructor is always added in the format `prefix_constructor`.
 * This allows the subclass to call super class methods without using `function.call`, providing better performance.
 *
 * For example, if `MySubClass` extends `MySuperClass`, and both define a `draw` method, then calling `promote(MySubClass, "MySuperClass")`
 * would add a `MySuperClass_constructor` method to MySubClass and promote the `draw` method on `MySuperClass` to the
 * prototype of `MySubClass` as `MySuperClass_draw`.
 *
 * This should be called after the class's prototype is fully defined.
 *
 * 	function ClassA(name) {
 * 		this.name = name;
 * 	}
 * 	ClassA.prototype.greet = function() {
 * 		return "Hello "+this.name;
 * 	}
 *
 * 	function ClassB(name, punctuation) {
 * 		this.ClassA_constructor(name);
 * 		this.punctuation = punctuation;
 * 	}
 * 	createjs.extend(ClassB, ClassA);
 * 	ClassB.prototype.greet = function() {
 * 		return this.ClassA_greet()+this.punctuation;
 * 	}
 * 	createjs.promote(ClassB, "ClassA");
 *
 * 	var foo = new ClassB("World", "!?!");
 * 	console.log(foo.greet()); // Hello World!?!
 *
 * @method promote
 * @param {Function} subclass The class to promote super class methods on.
 * @param {String} prefix The prefix to add to the promoted method names. Usually the name of the superclass.
 * @return {Function} Returns the subclass.
 */
createjs.promote = function(subclass, prefix) {
    "use strict";

    var subP = subclass.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
    if (supP) {
        subP[(prefix+="_") + "constructor"] = supP.constructor; // constructor is not always innumerable
        for (var n in supP) {
            if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) { subP[prefix + n] = supP[n]; }
        }
    }
    return subclass;
};

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
    this.Dog_constructor(name,color);
    this.id = id;
}
createjs.extend(MYDog,Dog);
MYDog.prototype.run = function () {
    this.Dog_run();
    console.info(this.name+" is runing! it's id is "+this.id);
}
createjs.promote(MYDog, "Dog");

var mydog1 = new MYDog('牧羊犬1','黑色','1');
console.info(mydog1.name);//牧羊犬1
console.info(mydog1.color);//黑色
console.info(mydog1.id);//1
console.info(mydog1._private);
mydog1.run();
