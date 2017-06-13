<?php

class Dog
{
    public $public = 'Public';
    protected $protected = 'Protected';
    private $private = 'Private';

    //注意js es6是constructor
    function __construct($name, $color)
    {
        $this->name = $name;
        $this->color = $color;
    }

    function run()
    {
        var_dump($this->name . " is runing!");
    }

    public static function printf()
    {
        var_dump("this is static function");
    }

    function printHello()
    {
        var_dump($this->public);
        var_dump($this->protected);
        var_dump($this->private);
    }

}

$dog1 = new Dog("大毛", "黄色");
$dog2 = new Dog("二毛", "黑色");
Dog::printf();

var_dump($dog1->name);//大毛
$dog1->run();
echo '<p>--------------------------------------父类访问控制--------------------------------------</p>';
echo $dog1->public; // 这行能被正常执行
//echo $dog1->protected; // 这行会产生一个致命错误
//echo $dog1->private; // 这行也会产生一个致命错误
$dog1->printHello(); // 输出 Public、Protected 和 Private



class MYDog extends Dog
{
    // 可以对 public 和 protected 进行重定义，但 private 而不能
    protected $protected = 'Protected2';

    function __construct($name, $color, $id)
    {
        parent::__construct($name, $color); // 调用父类的__construct(name,color)
        $this->id = $id;
    }

    public function run()
    {
        parent::run();
        var_dump(this.name." is runing! it's id is ".this.id);
    }

    function printHello()
    {
        var_dump($this->public);
        var_dump($this->protected);
        //var_dump($this->private);
    }

}

echo '<p>--------------------------------------子类输出--------------------------------------</p>';

$mydog1 = new MYDog('牧羊犬1','黑色','1');
var_dump($mydog1->name);//牧羊犬1
var_dump($mydog1->color);//黑色
var_dump($mydog1->id);//1
$mydog1->run();

echo '<p>--------------------------------------子类访问控制--------------------------------------</p>';
echo $mydog1->public; // 这行能被正常执行
//echo $mydog1->private; // 未定义 private
//echo $mydog1->protected; // 这行会产生一个致命错误
$mydog1->printHello(); // 输出 Public、Protected2 和 Undefined
