//有輸入的時候 鍵盤 滑鼠 等
//按鍵事件
document.onkeydown = function(event){
    //alert('鍵盤碼:'+event.keyCode);
}
//滑鼠事件
//塔的編號
var choose_tower;
//建塔事件
var build_event = false;
//阻擋建塔
var build_can = false;
//塔陣列
var play_tower = [];
//塔焦點
var this_tower;

//狀態區域
canvas_status_area.onmousedown = function(event){
    //alert(event.offsetX+'--'+event.offsetY);
    
    //要跟 status_update () 內的一樣
    //開始按鈕座標
    if (event.offsetX >= unit && event.offsetX <= unit*6) {
        if (event.offsetY >= unit && event.offsetY <= unit*3) {
            if (game_start_button == false) {
                game_start_button = true;
                status_update ();
            }
        }
    }
    
    //塔點擊事件
    for (var key in status_tower) {
        if (event.offsetX >= status_tower[key].x*unit && event.offsetX <= (status_tower[key].x+status_tower_box_x)*unit) {
            if (event.offsetY >= status_tower[key].y*unit && event.offsetY <= (status_tower[key].y+status_tower_box_y)*unit) {
                build_event = true;
                
                choose_tower = key; 
				this_tower = null;
				menu_area.clearRect(0, 0, menu_area_w, menu_area_h);				
                status_update();   
            }
        }
    }
	
	
	if (this_tower) {
		//升級
		if (event.offsetX >= unit*21 && event.offsetX <= unit*24) {
			if (event.offsetY >= unit && event.offsetY <= unit*3) {
				play_area.clearRect(this_tower.x*unit, this_tower.y*unit, set_size_x, set_size_y);
				
				this_tower.level_up();
			}	
		}
		
		//轉向
		if (event.offsetX >= unit*25 && event.offsetX <= unit*28) {
			if (event.offsetY >= unit && event.offsetY <= unit*3) {
				play_area.clearRect(this_tower.x*unit, this_tower.y*unit, set_size_x, set_size_y);
				
				if (this_tower.dir < 3) {
					this_tower.dir++;
				}
				else {
					this_tower.dir = 0; 
				}	
				
			}
		}
		
		//變賣
		if (event.offsetX >= unit*29 && event.offsetX <= unit*32) {
			if (event.offsetY >= unit && event.offsetY <= unit*3) {
				
				//delete play_tower[];
				play_area.clearRect(this_tower.x*unit, this_tower.y*unit, set_size_x, set_size_y);
				this_tower = null;
				menu_area.clearRect(0, 0, menu_area_w, menu_area_h);
			}	
		}
	}
}

//遊戲區域
canvas_menu_area.onmousedown = function(event){
    //alert(event.offsetX+'--'+event.offsetY);
    var build_x = Math.floor(event.offsetX/unit);
    var build_y = Math.floor(event.offsetY/unit);
    
    //建塔 建塔事件 阻擋建塔 檢查
    if (build_event == true && build_can == true) {
        //金錢 檢查
		var build_temp = new tower_array[choose_tower](build_x, build_y, play_area);
			if (my_money >= build_temp.cost_money) {
				//減金錢
				my_money = my_money - build_temp.cost_money;
				//佔位置 2x3
				for (var i=0; i<set_size_x/unit; i++) {
					for (var j=0; j<set_size_y/unit; j++) {
						map[build_x+i][build_y+j] = ["play_tower["+play_tower.length+"]",play_tower.length];
					}
				}

				//建塔
				play_tower.push(build_temp);
			}     
			else {
				alert("沒錢了!!!");
			}
		
		//結束建立事件
		build_event = false;       
		menu_area.clearRect(0, 0, menu_area_w, menu_area_h);
		choose_tower = null;  
		//更新狀態欄
		status_update();
    }
	
	//塔升級 轉向 變賣 取得焦點
	if (build_event == false && map[build_x][build_y] != 0 && map[build_x][build_y] != "road") {
		if (this_tower == null || this_tower != eval(map[build_x][build_y][0])) {
			menu_area.clearRect(0, 0, menu_area_w, menu_area_h); 
			
			//更新狀態欄
			this_tower = eval(map[build_x][build_y][0]);
			status_update();
			
			menu_area.fillStyle='rgba(255, 145, 36, 0.5)';
			menu_area.fillRect(this_tower.x*unit, this_tower.y*unit, set_size_x, set_size_y);
	    }
	}
	else {
		this_tower = null;
		status_update();
		menu_area.clearRect(0, 0, menu_area_w, menu_area_h); 
	}
}

canvas_menu_area.onmousemove = function(event){
    if (build_event == true) {
        menu_area.clearRect(0, 0, menu_area_w, menu_area_h); 
    
        var move_x = Math.floor(event.offsetX/unit);
        var move_y = Math.floor(event.offsetY/unit);
        //alert(event.offsetX+','+event.offsetY+"--"+move_x+','+move_y);

        //出界
        if (move_x > (play_unit_x-set_size_x/unit) || move_y > (play_unit_y-set_size_y/unit)) { 
			menu_area.strokeStyle='#FF0000';
            menu_area.fillStyle='rgba(255, 0, 0, 0.5)';
			build_can = false;
		}
		//檢查有沒有東西擋住 四邊
		else if (map[move_x][move_y] == 0 &&                                    //左上 x    y
            map[move_x+set_size_x/unit-1][move_y] == 0 &&                       //右上 x-1  y
            map[move_x][move_y+set_size_y/unit-1] == 0 &&                       //左下 x    y-1
            map[move_x+set_size_x/unit-1][move_y+set_size_y/unit-1] == 0 ) {    //右下 x-1  y-1
            
            menu_area.strokeStyle='#1AFD9C';
            menu_area.fillStyle='rgba(28, 253, 155, 0.5)';
			build_can = true;
        }
        else {  //被擋住
            menu_area.strokeStyle='#FF0000';
            menu_area.fillStyle='rgba(255, 0, 0, 0.5)';
			build_can = false;
        }
        
        menu_area.beginPath();
        menu_area.rect(move_x*unit, move_y*unit, set_size_x, set_size_y);
        menu_area.stroke();     
        menu_area.fillRect(move_x*unit, move_y*unit, set_size_x, set_size_y);     
    }
}
