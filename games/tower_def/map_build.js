//橫列 直欄
//解析地圖並且畫出來 X=i , Y=j
function draw_back_ground() {
    //先清空畫面
    canvas_block['menu_area']['context'].clearRect(0, 0, canvas_block['menu_area']['width'], canvas_block['menu_area']['height']);
    canvas_block['play_area']['context'].clearRect(0, 0, canvas_block['play_area']['width'], canvas_block['play_area']['height']);
    canvas_block['back_ground']['context'].clearRect(0,0,canvas_block['back_ground']['width'],canvas_block['back_ground']['height']);
    //初始值
    enemies = [];
    towers = [];
    counter['now_batch_num'] = 0;
    counter['enemy_num'] = 0;
    status_switch['chk_ready'] = false;
    //輸入生命金錢
    counter['life'] = stage[counter['now_stage']]['life'];
    counter['money'] = stage[counter['now_stage']]['money'];
    
    //清空佔位
    for (var i = 0; i < canvas_info['play_box']['width_unit']; i++ ) {
        for (var j = 0; j < canvas_info['play_box']['height_unit']; j++ ) {
            map_unit[i][j] = undefined;  
        } 
    }
    
	//背景
    for(var i = 0; i < canvas_info['play_box']['width_unit']; i+=stage[counter['now_stage']]['back_ground'][2]/unit ) {        //x
        for(var j = 0; j < canvas_info['play_box']['height_unit']; j+=stage[counter['now_stage']]['back_ground'][3]/unit ) {   //y	
            canvas_block['back_ground']['context'].drawImage(get_image['back_ground'], 
                                                             stage[counter['now_stage']]['back_ground'][0], 
                                                             stage[counter['now_stage']]['back_ground'][1], 
                                                             stage[counter['now_stage']]['back_ground'][2], 
                                                             stage[counter['now_stage']]['back_ground'][3], 
                                                             i*unit, 
                                                             j*unit, 
                                                             stage[counter['now_stage']]['back_ground'][2], 
                                                             stage[counter['now_stage']]['back_ground'][3]);
        }
    }
    
    //道路
    for(var key in stage[counter['now_stage']]['road']) {
        for(var i = 0; i < stage[counter['now_stage']]['road'][key][2]; i++ ) {
            for(var j = 0; j < stage[counter['now_stage']]['road'][key][3]; j++ ) {
                canvas_block['back_ground']['context'].drawImage(get_image['back_ground'],
                                                                 stage[counter['now_stage']]['back_ground'][0], 
                                                                 stage[counter['now_stage']]['back_ground'][1]+2*unit, 
                                                                 unit, 
                                                                 unit,
                                                                 (stage[counter['now_stage']]['road'][key][0]+i)*unit, 
                                                                 (stage[counter['now_stage']]['road'][key][1]+j)*unit, 
                                                                 unit, 
                                                                 unit);
                
                map_unit[stage[counter['now_stage']]['road'][key][0]+i][stage[counter['now_stage']]['road'][key][1]+j]= "road";
            }
        }
    }
    
    //敵人出現點
    for(var i = 0; i < stage[counter['now_stage']]['road_start'][2]; i++ ) {
        for(var j = 0; j < stage[counter['now_stage']]['road_start'][3]; j++ ) {
            canvas_block['back_ground']['context'].drawImage(get_image['back_ground'],
                                                             6*unit, 
                                                             0, 
                                                             unit, 
                                                             unit,
                                                             (stage[counter['now_stage']]['road_start'][0]+i)*unit, 
                                                             (stage[counter['now_stage']]['road_start'][1]+j)*unit, 
                                                             unit, 
                                                             unit);
        }
    }
    
    //敵人結束點
	for(var i = 0; i < stage[counter['now_stage']]['road_end'][2]; i++ ) {
        for(var j = 0; j < stage[counter['now_stage']]['road_end'][3]; j++ ) {
            canvas_block['back_ground']['context'].drawImage(get_image['back_ground'],
                                                             6*unit, 
                                                             2*unit, 
                                                             unit, 
                                                             unit,
                                                             (stage[counter['now_stage']]['road_end'][0]+i)*unit, 
                                                             (stage[counter['now_stage']]['road_end'][1]+j)*unit, 
                                                             unit, 
                                                             unit);
        }
    }
}

//畫出地圖敵人
function draw_enemy() {
    //迴圈產出敵人
    //到第幾關
    if (counter['now_stage'] < stage.length) {
        //到第幾個敵人
        if (counter['enemy_num'] < stage[counter['now_stage']]['enemy'][counter['now_batch_num']][0]) {
            //產生間隔
            counter['loop_new_enemy'] = number_loop(counter['loop_new_enemy'],0,stage[counter['now_stage']]['enemy'][counter['now_batch_num']][1]);
            if (counter['loop_new_enemy'] == 0) {
                //產生敵人
                enemies[counter['enemy_num']] = new Enemy(counter['enemy_num'],
                                                          stage[counter['now_stage']]['road_start'][0], 
                                                          stage[counter['now_stage']]['road_start'][1], 
                                                          stage[counter['now_stage']]['enemy'][counter['now_batch_num']][2], 
                                                          stage[counter['now_stage']]['enemy'][counter['now_batch_num']][3], 
                                                          stage[counter['now_stage']]['enemy'][counter['now_batch_num']][4], 
                                                          stage[counter['now_stage']]['enemy'][counter['now_batch_num']][5]);
                counter['enemy_num']++;
            }
        }
        else {
            status_switch['chk_enemies'] = false;
            //檢查是否敵人都消失
            for (var key in enemies) {
                if (enemies[key] != undefined) {
                    status_switch['chk_enemies'] = true;
                }
            }
            
            //敵人都消失了
            if (status_switch['chk_enemies'] == false) {
                //敵人陣列清空
                if (enemies.length > 0) {
                    enemies = [];
                }
                //子彈陣列清空
                if (bullets.length > 0) {
                    bullets = [];
                }
                //每波敵人間隔 
                counter['loop_enemy_batch'] = number_loop(counter['loop_enemy_batch'],0,100);
                if (counter['loop_enemy_batch'] == 0) {
                    //產生敵人歸0
                    counter['enemy_num'] = 0;
                    //下一批
                    counter['now_batch_num']++;
                    
                    //下一關
                    if (counter['now_batch_num'] == stage[counter['now_stage']]['enemy'].length) {
                        counter['now_batch_num'] = 0;
                        //下一關
                        counter['now_stage']++;
                        //換地圖
                        draw_back_ground();
                    }
                }
                
                status_menu();                
            }
        }
        
    }
    else {
        //alert('全破關')
    }
}