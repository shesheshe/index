//解析地圖並且畫出來 x=i , y=j
function draw_back_ground(map_no) {
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

//畫出地圖敵人
function draw_enemy(map_no) {
    //alert(this[map_no]["enemy"].length);
    
    //迴圈產出敵人 
}