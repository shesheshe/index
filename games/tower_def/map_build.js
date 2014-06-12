//解析地圖並且畫出來 x=i , y=j
draw_back_ground("map_02")
function draw_back_ground(map_no) {
    //背景圖片開始位置
	var strat_x = this[map_no]["back_ground"]*2;
    var strat_y = 0;	
	//背景
    for(var i = 0; i < play_unit_x; i++ ) {       //x
        for(var j = 0; j < play_unit_y; j++ ) {   //y	
            back_ground.drawImage(image_back_ground, strat_x*unit, strat_y*unit, unit, unit, i*unit, j*unit, unit, unit);
			//back_ground.fillText(j, i*unit, j*unit);
        }
    }
	
	var road_unit_h = this[map_no]["road_unit_h"];
    var route = this[map_no]["route"];	
	//道路
	for (var key in route) {
		if (key != 0) {
			//x軸
			//左到右
			if ((route[key][0]-route[key-1][0]) > 0) {
				for (var i = route[key-1][0]; i <= route[key][0]; i++) {
					for (var h = 0; h < road_unit_h; h++) {
						back_ground.drawImage(image_back_ground, strat_x*unit, (strat_y+2)*unit, unit, unit, i*unit, (route[key][1]+h)*unit, unit, unit);
					}
				}
			}
			//右到左
			if ((route[key][0]-route[key-1][0]) < 0) {
				for (var i = route[key-1][0]; i >= route[key][0]; i--) {
					for (var h = 0; h < road_unit_h; h++) {
						back_ground.drawImage(image_back_ground, strat_x*unit, (strat_y+2)*unit, unit, unit, i*unit, (route[key][1]+h)*unit, unit, unit);
					}
				}
			}
			//y軸
			//上到下
			if ((route[key][1]-route[key-1][1]) > 0) {
				for (var j = route[key-1][1]; j < route[key][1]+road_unit_h; j++) {
					for (var h = 0; h < road_unit_h; h++) {
						back_ground.drawImage(image_back_ground, strat_x*unit, (strat_y+2)*unit, unit, unit, (route[key][0]+h)*unit, j*unit, unit, unit);
					}
				}
			}
			//下到上
			if ((route[key][1]-route[key-1][1]) < 0) {
				for (var j = route[key-1][1]+road_unit_h-1; j > route[key][1]; j--) {
					for (var h = 0; h < road_unit_h; h++) {
						back_ground.drawImage(image_back_ground, strat_x*unit, (strat_y+2)*unit, unit, unit, (route[key][0]+h)*unit, j*unit, unit, unit);
					}
				}
			}
		}
	}
}