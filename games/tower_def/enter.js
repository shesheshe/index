//有輸入的時候 鍵盤 滑鼠 等
//按鍵事件----------------------------------------------------------
document.onkeydown = function(event){
    //alert('鍵盤碼:'+event.keyCode);
    
    //開始畫面才有功用
    if (status_switch['start_menu'] == true) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90)) {
            //最多5個字
            if (pass_code.length < 5) {
                pass_code = pass_code + String.fromCharCode(event.keyCode);
            }  
        }
        else if (event.keyCode == 8) {
            pass_code = pass_code.substr(0,pass_code.length-1);
            //禁止回上一頁
            event.returnValue = false; 
        }
        
        start_menu();
    }
}

//滑鼠事件----------------------------------------------------------
//遊戲區域
canvas_block['menu_area']['object'].onmousedown = function(event){
    //alert(event.offsetX/unit+'--'+event.offsetY/unit);
    
    if (status_switch['start_menu'] == true) {
        var chk_pass_code = false;
        
        //按開始遊戲鈕
        if(trigger_button ('start_gmae', event.offsetX, event.offsetY) == true) {
            //檢查通關碼是第幾關的
            for (var key in stage) {    
                if (stage[key]['stage_code'] == pass_code) {
                    counter['now_stage'] = key;
                    chk_pass_code = true;
                    status_switch['start_menu'] = false;                   
                    start_game ();
                    
                    break;
                }
            }
            
            if (chk_pass_code == false) {
                alert('找無此號碼,通關碼輸入錯誤 第一關通關碼為:'+stage[0]['stage_code']);
            }
        }        
    }
    else {
        var down_x = Math.floor(event.offsetX/unit);
        var down_y = Math.floor(event.offsetY/unit);
        
        //建塔 建塔檢查
        if (status_switch['build_focus'] == true && status_switch['build_tower'] == true) {
            var this_tower_num = towers.length;
            
            //金錢 檢查
            if (counter['money'] >= status_tower[counter['choose_tower']].cost_money) {
                //減金錢
                counter['money'] = counter['money'] - status_tower[counter['choose_tower']].cost_money;
                //建塔
				towers[this_tower_num] = new tower_class[counter['choose_tower']](this_tower_num, down_x, down_y);
                towers[this_tower_num].tower_occ();
            }
            else {
                alert('錢不夠');
            }
            
            //結束建立事件
            status_switch['build_focus'] = false;       
            status_switch['build_tower'] = false;  
            counter['choose_tower'] = undefined;
            canvas_block['menu_area']['context'].clearRect(0, 0, canvas_block['menu_area']['width'], canvas_block['menu_area']['height']);
            //更新狀態欄
            status_menu();
        }
        
        //塔取得焦點
        if (status_switch['build_focus'] == false && map_unit[down_x][down_y] != "road" && map_unit[down_x][down_y] != undefined) {
            canvas_block['menu_area']['context'].clearRect(0, 0, canvas_block['menu_area']['width'], canvas_block['menu_area']['height']);
            
            status_switch['tower_focus'] = true;
            //遊戲區選到的塔編號
            counter['choose_tower_num'] = map_unit[down_x][down_y];
            
            //更新狀態欄
            status_menu();
            //攻擊範圍框
            atk_range_box(towers[map_unit[down_x][down_y]],towers[map_unit[down_x][down_y]].x,towers[map_unit[down_x][down_y]].y);
            fill_block('menu_area','rgba(255, 145, 36, 0.4)',towers[map_unit[down_x][down_y]].x,towers[map_unit[down_x][down_y]].y,tower_size['width_unit'],tower_size['height_unit']);
        }	
        else {
            canvas_block['menu_area']['context'].clearRect(0, 0, canvas_block['menu_area']['width'], canvas_block['menu_area']['height']);
            status_switch['tower_focus'] = false;
            counter['choose_tower_num'] = undefined;
            //更新狀態欄
            status_menu();
        }
    }
}

canvas_block['menu_area']['object'].onmousemove = function(event){
    if (status_switch['start_menu'] == false && status_switch['build_focus'] == true) {
        var move_x = Math.floor(event.offsetX/unit);
        var move_y = Math.floor(event.offsetY/unit);
        var color;
        
        //清畫面
        canvas_block['menu_area']['context'].clearRect(0, 0, canvas_block['menu_area']['width'], canvas_block['menu_area']['height']);
        
        //出界
        if (move_x > (canvas_block['menu_area']['width']/unit-tower_size['width_unit']) || move_y > (canvas_block['menu_area']['height']/unit-tower_size['height_unit'])) { 
            color='rgba(255, 0, 0, 0.5)';
            status_switch['build_tower'] = false;
		}
		//檢查有沒有東西擋住 四邊 可建塔
		else if (map_unit[move_x][move_y] == undefined &&                                                      //左上 x    y
            map_unit[move_x+tower_size['width_unit']-1][move_y] == undefined &&                                //右上 x-1  y
            map_unit[move_x][move_y+tower_size['height_unit']-1] == undefined &&                               //左下 x    y-1
            map_unit[move_x+tower_size['width_unit']-1][move_y+tower_size['height_unit']-1] == undefined ) {   //右下 x-1  y-1
            
            color='rgba(82, 255, 82, 0.5)';
            status_switch['build_tower'] = true;
        }
        else {  //被擋住
            color='rgba(255, 0, 0, 0.5)';
            status_switch['build_tower'] = false;
        }
        
        //攻擊範圍框
        atk_range_box(status_tower[counter['choose_tower']],move_x,move_y);
        
        fill_block('menu_area',color,move_x,move_y,tower_size['width_unit'],tower_size['height_unit']);
        canvas_block['menu_area']['context'].drawImage(status_tower[counter['choose_tower']].image_tower,
                                                         0,
                                                         status_tower[counter['choose_tower']].image_num*tower_size['height'],
                                                         status_tower[counter['choose_tower']].w_quar,
                                                         status_tower[counter['choose_tower']].h_quar,
                                                         move_x*unit,
                                                         move_y*unit,
                                                         tower_size['width'], 
                                                         tower_size['height']);
        
    }
}

//狀態區域
canvas_block['status_area']['object'].onmousedown = function(event){
    //alert(event.offsetX+'--'+event.offsetY);
    
    if (status_switch['start_menu'] == false) {
        //按準備完成鈕
        if(trigger_button ('ready_go', event.offsetX, event.offsetY) == true) {
            status_switch['chk_ready'] = true;
            status_menu();
        }
        
        //點擊塔 status_menu()有修改這邊也要改
        for (var key in tower_class) {
            if (event.offsetX >= (status_tower[key].x-0.5)*unit && event.offsetX <= (status_tower[key].x-0.5+8)*unit) {
                if (event.offsetY >= (status_tower[key].y-0.5)*unit && event.offsetY <= (status_tower[key].x-0.5+4)*unit) {
                    status_menu();
                    fill_block('status_area','rgba(82, 255, 82,0.4)',status_tower[key].x-0.5,status_tower[key].y-0.5,8,4);
                    //建塔 取得key
                    status_switch['build_focus'] = true;
                    counter['choose_tower'] = key;
                }
            }
        }
        
        if (status_switch['tower_focus'] == true && counter['choose_tower_num'] != undefined) {
            //升級
            if(trigger_button ('level_up', event.offsetX, event.offsetY) == true) {
                //檢查有沒有下一個等級資料
                if (towers[counter['choose_tower_num']].next_cost != "最高等") {
                    //檢查金錢夠不夠
                    if (counter['money'] >= towers[counter['choose_tower_num']].next_cost) {
                        //減金錢
                        counter['money'] = counter['money'] - towers[counter['choose_tower_num']].next_cost;
                        //升級
                        towers[counter['choose_tower_num']].level_up();
                    }
                    else {
                        alert('錢不夠');
                    }
                }
            }
            
            //變賣
            if(trigger_button ('tower_sell', event.offsetX, event.offsetY) == true) {
                
                //加錢
                counter['money'] = counter['money'] + tower_sell(counter['choose_tower_num']);
                //清除佔位置
                towers[counter['choose_tower_num']].tower_clear_occ();
                delete towers[counter['choose_tower_num']];
                
                status_switch['tower_focus'] = false;
                counter['choose_tower_num'] = undefined;
                //清畫面
                canvas_block['menu_area']['context'].clearRect(0, 0, canvas_block['menu_area']['width'], canvas_block['menu_area']['height']);
            }
            
            status_menu();
        }
    }
}