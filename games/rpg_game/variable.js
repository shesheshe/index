//初始預設值
//一個單位(長寬)
var unit = 16;

//遊戲區塊 三層
var play_area_03_obj = document.getElementById('play_area_03');
var play_area_03 = play_area_03_obj.getContext('2d');
var play_area_03_w = play_area_03_obj.width;
var play_area_03_h = play_area_03_obj.height;

var play_area_02_obj = document.getElementById('play_area_02');
var play_area_02 = play_area_02_obj.getContext('2d');
var play_area_02_w = play_area_02_obj.width;
var play_area_02_h = play_area_02_obj.height;

var play_area_01_obj = document.getElementById('play_area_01');
var play_area_01 = play_area_01_obj.getContext('2d');
var play_area_01_w = play_area_01_obj.width;
var play_area_01_h = play_area_01_obj.height;

//有幾行幾列 i=>x j=>y
var play_area_i = 48;
var play_area_j = 24;

//其他區塊
var status_area_obj = document.getElementById('status_area');
var status_area = status_area_obj.getContext('2d');
var status_area_w = status_area_obj.width;
var status_area_h = status_area_obj.height;

//載入圖片 普通攻擊
var attack_gen = document.getElementById("attack_gen");
//普通攻擊每張大小
var attack_gen_size = 24;