//宣告
//一個單位(長寬)
var unit = 16;

//canvas block
var canvas_block = {
    'menu_area' : {
        'object' : document.getElementById('menu_area'),
        'context' : document.getElementById('menu_area').getContext('2d'),
        'width' : document.getElementById('menu_area').width,
        'height' : document.getElementById('menu_area').height,
    },
    'play_area' : {
        'object' : document.getElementById('play_area'),
        'context' : document.getElementById('play_area').getContext('2d'),
        'width' : document.getElementById('play_area').width,
        'height' : document.getElementById('play_area').height,
    },
    'back_ground' : {
        'object' : document.getElementById('back_ground'),
        'context' : document.getElementById('back_ground').getContext('2d'),
        'width' : document.getElementById('back_ground').width,
        'height' : document.getElementById('back_ground').height,
    },
    'status_area' : {
        'object' : document.getElementById('status_area'),
        'context' : document.getElementById('status_area').getContext('2d'),
        'width' : document.getElementById('status_area').width,
        'height' : document.getElementById('status_area').height,
    },
};

//canvas_info
var canvas_info = {
    'play_box' : {
        'width' : document.getElementById('play_box').offsetWidth,
        'height' : document.getElementById('play_box').offsetHeight,
        'width_unit' : document.getElementById('play_box').offsetWidth/unit,
        'height_unit' : document.getElementById('play_box').offsetHeight/unit,
    },
    'status_box' : {
        'width' : document.getElementById('status_box').offsetWidth,
        'height' : document.getElementById('status_box').offsetHeight,
        'width_unit' : document.getElementById('status_box').offsetWidth/unit,
        'height_unit' : document.getElementById('status_box').offsetHeight/unit,
    },
};

//get_image 
var get_image = {
    'back_ground' : document.getElementById('image_back_ground'),
    'bullet' : document.getElementById('image_bullet'),
    'tower' : document.getElementById('image_tower'),
    'bullet' : document.getElementById('image_bullet'),
}

//status_switch 狀態開關 true or false
var status_switch = {
    //開始畫面 true在開始畫面
    'start_menu' : true,
    //確認敵人陣列是否還有值 true有值
    'chk_enemies' : false,
    //確認是否準備完成
    'chk_ready' : false,
    //取得建塔焦點
    'build_focus' : false,
    //是否能建塔
    'build_tower' : false,
    //取得塔焦點
    'tower_focus' : false,
};

//counter 變數計數
var counter = {
    //現在第幾關
    'now_stage' : 0,
    //生命到0就GAME OVER
    'life' : 0,
    //金錢買砲塔與升級的錢
    'money' : 0,
    //從狀態列選哪個塔
    'choose_tower' : undefined,
    //從遊戲區取得哪個塔
    'choose_tower_num' : undefined,
    //目前是第幾波敵人
    'now_batch_num' : 0,
    //已經產生多少敵人
    'enemy_num' : 0,
    //敵人產生間隔
    'loop_new_enemy' : 0,
    //每波敵人間隔
    'loop_enemy_batch' : 0,
}

//按鈕列表
var button_list = {
    //開始遊戲按鈕
    'start_gmae' : [12,12,32,6],
    //準備完成按鈕
    'ready_go' : [0.5,0.5,5.5,4],
    //升級按鈕
    'level_up' : [27,0.5,3.5,4],
    //變賣按鈕
    'tower_sell' : [32,0.5,3.5,4],
}

//過關碼
var pass_code = '095PS'
//setInterval 
var play;

//地圖 相關變數----------------------------------------------------------------------------------------
//關卡
var stage = [];

//碰撞檢查陣列 64x32
var map_unit = [];
//每欄要宣告
for (var i = 0; i < canvas_info['play_box']['width_unit']; i++ ) {
    map_unit[i] = [];  
    
    for (var j = 0; j < canvas_info['play_box']['height_unit']; j++ ) {
        map_unit[i][j] = undefined;  
    }          
}

//塔 相關變數----------------------------------------------------------------------------------------
//塔陣列
var towers = [];
//狀態列塔資料
var status_tower = [];
//塔大小標準 32x48 or unit 2x3 顯示出來的
var tower_size = {
    'width' : 32,
    'height' : 48,
    'width_unit' : 2,
    'height_unit' : 3,
}

//子彈陣列
var bullets = [];

//敵人 相關變數----------------------------------------------------------------------------------------
//敵人大小標準 32x48 or unit 2x3 顯示出來的
var enemy_size = {
    'width' : 32,
    'height' : 48,
    'width_unit' : 2,
    'height_unit' : 3,
}

//敵人陣列
var enemies = [];