//初始預設值
//一個單位(長寬)
var unit = 16;

//遊戲區塊 三層
var canvas_choose_area = document.getElementById('choose_area');
var choose_area = canvas_choose_area.getContext('2d');
var choose_area_w = canvas_choose_area.width;
var choose_area_h = canvas_choose_area.height;

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

//敵人資料
var enemy_data = {
    "enemy_01" : ["image_enemy_01",15,1,5],
    "enemy_02" : ["image_enemy_02",30,2,10]
}