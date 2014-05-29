//初始預設值
//遊戲區塊 三層
var ground_wall_area_obj = document.getElementById('ground_wall');
var ground_wall_area = ground_wall_area_obj.getContext('2d');

var main_area_obj = document.getElementById('mian');
var main_area = main_area_obj.getContext('2d');
var main_area_w = main_area_obj.width;
var main_area_h = main_area_obj.height;

var ground_pass_area_obj = document.getElementById('ground_pass');
var ground_pass_area = ground_pass_area_obj.getContext('2d');

//其他區塊
var other_area_obj = document.getElementById('other_area');
var other_area = other_area_obj.getContext('2d');
var other_area_w = other_area_obj.width;
var other_area_h = other_area_obj.height;
