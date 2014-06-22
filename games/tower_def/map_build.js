//碰撞檢查陣列
var map = [];
//有每欄要宣告
for (i = 0; i < play_unit_x; i++ ) {
    map[i] = [];  
    
    for (j = 0; j < play_unit_y; j++ ) {
        map[i][j] = 0;  
    }          
}

//解析地圖並且畫出來 x=i , y=j
function draw_back_ground() {
    back_ground.fillRect(0,0,back_ground_w,back_ground_h);
    //背景圖片開始位置
	var strat_x = map_no[map_no_key]["back_ground"]*2;
    var strat_y = 0;	
	//背景 32x32 圖片 兩單位
    for(var i = 0; i < play_unit_x; i+=2 ) {       //x
        for(var j = 0; j < play_unit_y; j+=2 ) {   //y	
            back_ground.drawImage(image_back_ground, strat_x*unit, strat_y*unit, unit*2, unit*2, i*unit, j*unit, unit*2, unit*2);
            //back_ground.fillText(i+","+j, i*unit, j*unit);
        }
    }
	
    //道路
    for (var key in map_no[map_no_key]["route"]["road"]) {
        for (var i = 0; i < map_no[map_no_key]["route"]["road"][key][2]; i++ ) {
            for (var j = 0; j < map_no[map_no_key]["route"]["road"][key][3]; j++ ) {
                back_ground.drawImage(image_back_ground, strat_x*unit, (strat_y+2)*unit, unit, unit, 
                                     (map_no[map_no_key]["route"]["road"][key][0]+i)*unit, 
                                     (map_no[map_no_key]["route"]["road"][key][1]+j)*unit, 
                                      unit, unit);
            
                map[map_no[map_no_key]["route"]["road"][key][0]+i][map_no[map_no_key]["route"]["road"][key][1]+j] = "road";
            }
        }
    }
    
    //敵人出生點
    for (var j = 0; j < map_no[map_no_key]["route"]["start"][2]; j++ ) {
         back_ground.drawImage(image_back_ground, 6*unit, strat_y*unit, unit*2, unit, 
                                     (map_no[map_no_key]["route"]["start"][0])*unit, 
                                     (map_no[map_no_key]["route"]["start"][1]+j)*unit, 
                                      unit*2, unit);
    }

    //敵人結束點
    for (var j = 0; j < map_no[map_no_key]["route"]["end"][2]; j++ ) {
        back_ground.drawImage(image_back_ground, 6*unit, (strat_y+2)*unit, unit*2, unit, 
                             (map_no[map_no_key]["route"]["end"][0])*unit, 
                             (map_no[map_no_key]["route"]["end"][1]+j)*unit, 
                              unit*2, unit);
    }
}

//敵人陣列
var enemies = [];
//敵人批次
var enemy_batch = 0;
//每批幾個敵人記數
var enemy_count = 0;
//產生間隔記數
var pro_time_count = 0;
//下一批次敵人準備時間
var next_batch = 200;
//準備時間記數
var next_batch_count = 0;

//畫出地圖敵人
function draw_enemy() {
    var enemy_now = map_no[map_no_key]["enemy"][enemy_batch];
    
    //迴圈產出敵人 
    if (enemy_batch < map_no[map_no_key]["enemy"].length) {
        if (enemy_now[0] > enemy_count) {
            if (enemy_now[1] < pro_time_count) {
                enemies[enemy_count] = new Enemy(enemy_count, enemy_now[2], map_no[map_no_key]["route"]["start"][0], map_no[map_no_key]["route"]["start"][1], enemy_now[3], enemy_now[4], enemy_now[5]);
                enemy_count++;
                pro_time_count = 0;
            }
            else {
                pro_time_count ++;
            }
        }
        else {
            //檢查是否敵人都消失
            var enemies_null_check = false;
            for (var i=0 ; i < enemies.length; i++) {
                if (enemies[i] != undefined) {
                    enemies_null_check = true;
                }
            }
            
            //檢查敵人都消失了
            if (enemies_null_check == false) {
                //敵人陣列清空
                if (enemies.length > 0) {
                    enemies = [];
                }
                //子彈陣列清空
                if (bullets.length > 0) {
                    bullets = [];
                }
                
                if (next_batch == next_batch_count) {
                enemy_count = 0;
                enemy_batch++;
                next_batch_count = 0;
                //狀態欄位更新
                status_update ();
                    //下一關
                    if (enemy_batch == map_no[map_no_key]["enemy"].length) {
                        map_no_key++;
                        if (map_no_key < map_no.length) {
                            enemy_batch = 0;
                            game_start_button  = false;
                            play_tower = [];
                            draw_back_ground();
                            status_update ();
                        }
                        else {
                            alert("全破關")
                        }
                    }
                }
                else {
                    next_batch_count++;
                    status_update ();
                }    
                
            }
        }
    }
}