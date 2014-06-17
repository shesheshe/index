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
    //背景圖片開始位置
	var strat_x = this[map_no]["back_ground"]*2;
    var strat_y = 0;	
	//背景 32x32 圖片 兩單位
    for(var i = 0; i < play_unit_x; i+=2 ) {       //x
        for(var j = 0; j < play_unit_y; j+=2 ) {   //y	
            back_ground.drawImage(image_back_ground, strat_x*unit, strat_y*unit, unit*2, unit*2, i*unit, j*unit, unit*2, unit*2);
            //back_ground.fillText(i+","+j, i*unit, j*unit);
        }
    }
	
    //道路
    for (var key in this[map_no]["route"]["road"]) {
        for (var i = 0; i < this[map_no]["route"]["road"][key][2]; i++ ) {
            for (var j = 0; j < this[map_no]["route"]["road"][key][3]; j++ ) {
                back_ground.drawImage(image_back_ground, strat_x*unit, (strat_y+2)*unit, unit, unit, 
                                     (this[map_no]["route"]["road"][key][0]+i)*unit, 
                                     (this[map_no]["route"]["road"][key][1]+j)*unit, 
                                      unit, unit);
            
                map[this[map_no]["route"]["road"][key][0]+i][this[map_no]["route"]["road"][key][1]+j] = "road";
            }
        }
    }
    
    //敵人出生點
    for (var j = 0; j < this[map_no]["route"]["start"][2]; j++ ) {
         back_ground.drawImage(image_back_ground, 6*unit, strat_y*unit, unit*2, unit, 
                                     (this[map_no]["route"]["start"][0])*unit, 
                                     (this[map_no]["route"]["start"][1]+j)*unit, 
                                      unit*2, unit);
    }

    //敵人結束點
    for (var j = 0; j < this[map_no]["route"]["end"][2]; j++ ) {
        back_ground.drawImage(image_back_ground, 6*unit, (strat_y+2)*unit, unit*2, unit, 
                             (this[map_no]["route"]["end"][0])*unit, 
                             (this[map_no]["route"]["end"][1]+j)*unit, 
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
    var enemy_now = this[map_no]["enemy"][enemy_batch];
    
    //迴圈產出敵人 
    if (enemy_batch < this[map_no]["enemy"].length) {
        if (enemy_now[0] > enemy_count) {
            if (enemy_now[1] < pro_time_count) {
                enemies[enemy_count] = new Enemy(enemy_count, enemy_now[2], this[map_no]["route"]["start"][0], this[map_no]["route"]["start"][1], enemy_now[3], enemy_now[4], enemy_now[5]);
                enemy_count++;
                pro_time_count = 0;
            }
            else {
                pro_time_count ++;
            }
        }
        else {
            //敵人全部消失才能開始下一批次
            if (enemies.length == 0) {
                if (next_batch == next_batch_count) {
                    enemy_count = 0;
                    enemy_batch++;
                    next_batch_count = 0;
					
					//狀態欄位更新
					status_update ();
                }
                else {
                    next_batch_count++;
                    status_update ();
                }  
            }     
        }
    }
}