//初始預設值
//一個單位(長寬)
var unit = 16;

//遊戲區塊 三層
var canvas_menu_area = document.getElementById('menu_area');
var menu_area = canvas_menu_area.getContext('2d');
var menu_area_w = canvas_menu_area.width;
var menu_area_h = canvas_menu_area.height;

var canvas_play_area = document.getElementById('play_area');
var play_area = canvas_play_area.getContext('2d');
var play_area_w = canvas_play_area.width;
var play_area_h = canvas_play_area.height;

var canvas_back_ground = document.getElementById('back_ground');
var back_ground = canvas_back_ground.getContext('2d');
var back_ground_w = canvas_back_ground.width;
var back_ground_h = canvas_back_ground.height;

var image_back_ground = document.getElementById("image_back_ground");
var image_back_ground_unit_x = image_back_ground.width/unit;
var image_back_ground_unit_y = image_back_ground.height/unit;

//遊戲區塊 有幾行幾列
var play_unit_x = back_ground_w/unit;
var play_unit_y = back_ground_h/unit;

//狀態區塊
var canvas_status_area = document.getElementById('status_area');
var status_area = canvas_status_area.getContext('2d');
var status_area_w = canvas_status_area.width;
var status_area_h = canvas_status_area.height;

//狀態區塊 有幾行幾列 
var status_unit_x = status_area_w/unit;
var status_unit_y = status_area_h/unit;

//地圖
var map_no = "map_01";
//遊戲開始控制項
var game_start_button = 0;
//圖片大小 塔與敵人
var set_size_x = unit*2;
var set_size_y = unit*3;

//狀態
//生命
var my_hp = 10;
//金錢
var my_money = 100;