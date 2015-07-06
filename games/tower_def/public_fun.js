/*數字回圈
**目前數字, 開始數字, 結束數字,
*/
function number_loop (now_num, start_num, end_num) {
    var return_num;
    
    if(now_num >= end_num) {
        return_num = start_num;
    }
    else if (now_num < end_num) {
        return_num = now_num + 1;
    }
    
    return return_num;
}

/*區塊上色 
**所屬區塊, 顏色, X座標, Y座標, 寬, 高
*/
function fill_block (block, color, x, y, width, height) {
    canvas_block[block]['context'].fillStyle = color;
    canvas_block[block]['context'].fillRect(x*unit,y*unit,width*unit,height*unit);
}

/*區塊外框
**所屬區塊, 顏色, 線條寬, X座標, Y座標, 寬, 高
*/
function line_block (block, color, lineWidth, x, y, width, height) {
    canvas_block[block]['context'].strokeStyle = color;
    canvas_block[block]['context'].lineWidth=lineWidth;
    canvas_block[block]['context'].beginPath();
    canvas_block[block]['context'].rect(x*unit,y*unit,width*unit,height*unit);
    canvas_block[block]['context'].stroke(); 
}

/*顯示文字 
**所屬區塊, 顏色, 文字粗細, 文字大小, 顯示文字, X座標, Y座標,
*/
function show_text (block, color, weight, size, word, x, y) {
    canvas_block[block]['context'].fillStyle = color;
	canvas_block[block]['context'].font = weight + " " + size + " 微軟正黑體";
	canvas_block[block]['context'].fillText(word,x*unit,y*unit); 	
}

/*按鈕 
**所屬區塊, 顏色, 按鈕名, 文字粗細, 文字大小, 顯示文字, 文字X座標, 文字Y座標,
*/
function show_button (block, color, button_name, weight, size, word, x , y) {
    canvas_block[block]['context'].fillStyle = color;
    canvas_block[block]['context'].fillRect(button_list[button_name][0]*unit,button_list[button_name][1]*unit,button_list[button_name][2]*unit,button_list[button_name][3]*unit);
    canvas_block[block]['context'].fillStyle = 'rgb(0, 0, 0)';
	canvas_block[block]['context'].font = weight + " " + size + " 微軟正黑體";
	canvas_block[block]['context'].fillText(word,x*unit,y*unit); 
}

/*按鈕觸發 
**按鈕名, 滑鼠所在X座標, 滑鼠所在Y座標
*/
function trigger_button (button_name, mouse_x, mouse_y) {
    var return_boolean = false;
    
    if (mouse_x >= button_list[button_name][0]*unit && mouse_x <= (button_list[button_name][0]+button_list[button_name][2])*unit) {
        if (mouse_y >= button_list[button_name][1]*unit && mouse_y <= (button_list[button_name][1]+button_list[button_name][3])*unit) {
            return_boolean = true;
        }
    }
    
    return return_boolean;
}

//敵人走到底 減生命
function minus_hp () {
    counter['life'] --;
    //更新狀態欄
    status_menu(); 
    //chick GAME OVER 
    if (counter['life'] <= 0) {
        game_over ();
    }
}

//開始遊戲
function start_game () {
    //先清空畫面
    canvas_block['status_area']['context'].clearRect(0, 0, canvas_block['status_area']['width'], canvas_block['status_area']['height']);
    
    draw_back_ground();
    play = setInterval(drawCanvas,30);
    status_menu();
}

/*攻擊範圍框 
**物件, 滑鼠所在X座標, 滑鼠所在Y座標
*/
function atk_range_box (tower, x ,y) {
    fill_block('menu_area','rgba(41, 148, 255, 0.5)' ,x-tower.atk_range,
                                                      y-tower.atk_range,
                                                      tower_size['width_unit']+tower.atk_range*2,
                                                      tower_size['height_unit']+tower.atk_range*2);
}

//塔變賣 計算價錢
function tower_sell (tower_num) {
    var sell_money = 0;
    
    //總價打7折
    for (var i=1; i <= towers[tower_num].level ;i++) {
        sell_money = sell_money + Math.floor(towers[tower_num].level_attr[i][0]*0.7);
    }
    
    return sell_money;
}

//畫面類---------------------------------------------------------------------------
//載入
function loading() {
    fill_block('status_area','rgb(209, 209, 209)',0,0,canvas_info['status_box']['width_unit'],canvas_info['status_box']['height_unit']);
    fill_block('menu_area','rgb(209, 209, 209)',0,0,canvas_info['play_box']['width_unit'],canvas_info['play_box']['height_unit']);
    //loding .....
    show_text ('menu_area', 'rgb(0, 0, 0)', 'bold', '72px', 'Loading .....', 10, 10);

    setTimeout(start_menu,1000);
}

//開始選單
function start_menu() {
    //先清空畫面
    canvas_block['status_area']['context'].clearRect(0, 0, canvas_block['status_area']['width'], canvas_block['status_area']['height']);
    canvas_block['menu_area']['context'].clearRect(0, 0, canvas_block['menu_area']['width'], canvas_block['menu_area']['height']);
    canvas_block['play_area']['context'].clearRect(0, 0, canvas_block['play_area']['width'], canvas_block['play_area']['height']);
    canvas_block['back_ground']['context'].clearRect(0, 0, canvas_block['back_ground']['width'], canvas_block['back_ground']['height']);
    
    //區塊上色 
    fill_block('status_area','rgb(215, 215, 234)',0,0,canvas_info['status_box']['width_unit'],canvas_info['status_box']['height_unit']);
    fill_block('menu_area','rgb(215, 215, 234)',0,0,canvas_info['play_box']['width_unit'],canvas_info['play_box']['height_unit']);
    
    //空心區塊
    show_text ('menu_area','rgb(0, 0, 0)', 'bold', '32px', '輸入通關碼:', 12, 5);
    line_block('menu_area','rgb(0, 0, 0)',5,24,1,20,6);
    show_text ('menu_area','rgb(0, 0, 0)', 'bold', '32px', pass_code, 25, 5);
    
    //開始按鈕
    show_button ('menu_area', 'rgb(255, 0, 0)', 'start_gmae', 'bold', '32px', '開始遊戲', 24 ,15.5);
}

//狀態畫面
function status_menu() {
    //先清空狀態畫面
    canvas_block['status_area']['context'].clearRect(0, 0, canvas_block['status_area']['width'], canvas_block['status_area']['height']);
    
    //區塊上色 
    fill_block('status_area','rgb(209, 209, 209)',0,0,canvas_info['status_box']['width_unit'],canvas_info['status_box']['height_unit']);
    
    //準備完成按鈕
    if (status_switch['chk_ready'] == false) {
        show_button ('status_area', 'rgb(255, 0, 0)', 'ready_go', 'bold', '18px', '準備完成', 1 ,3);
    }
    else {
        show_button ('status_area', 'rgb(82, 255, 82)', 'ready_go', 'bold', '18px', '遊戲開始', 1 ,3);
    }
    fill_block('status_area','rgb(158, 76, 149)',7,0,0.5,5);
    
    //第幾關 波數
    show_text ('status_area','rgb(0, 0, 0)', 'bold', '18px', '目前關卡: 第'+(parseInt(counter['now_stage'])+1)+'關', 8, 1.5);
    show_text ('status_area','rgb(0, 0, 0)', 'bold', '18px', '通關碼: '+stage[counter['now_stage']]['stage_code'], 8, 3);
    show_text ('status_area','rgb(0, 0, 0)', 'bold', '18px', '第 '+(parseInt(counter['now_batch_num'])+1)+'波 / 共 '+stage[counter['now_stage']]['enemy'].length+'波', 8, 4.5);
    fill_block('status_area','rgb(158, 76, 149)',18,0,0.5,5);    
    
    //生命金錢 波數倒數
    show_text ('status_area','rgb(0, 0, 0)', 'bold', '18px', '生命: '+counter['life'], 19, 1.5);
    show_text ('status_area','rgb(0, 0, 0)', 'bold', '18px', '金錢: '+counter['money'], 19, 3);
    if (counter['loop_enemy_batch'] != 0) {
        show_text ('status_area','rgb(0, 0, 0)', 'bold', '18px', counter['loop_enemy_batch']+' / 100', 19, 4.5);
    }
    fill_block('status_area','rgb(158, 76, 149)',26,0,0.5,5);

    //升級 變賣
    if (status_switch['tower_focus'] == true) {
      show_button ('status_area', 'rgb(113, 183, 183)', 'level_up', 'bold', '18px', '升級', 27.5 ,2);
      //判斷是否為最高等
      if (towers[counter['choose_tower_num']].next_cost != "最高等") {
        show_text ('status_area', 'rgb(0, 0, 0)', 'bold', '18px', "-"+towers[counter['choose_tower_num']].next_cost, 27.2, 3.5);
      }
      else {
        show_text ('status_area', 'rgb(0, 0, 0)', 'bold', '18px', towers[counter['choose_tower_num']].next_cost, 27.05, 3.5);
      }
      
      show_button ('status_area', 'rgb(183, 102, 174)', 'tower_sell', 'bold', '18px', '變賣', 32.5 ,2);
      show_text ('status_area', 'rgb(0, 0, 0)', 'bold', '18px', "+"+tower_sell(counter['choose_tower_num']), 32.2, 3.5);
    }
    
    //show砲塔
    for (var key in tower_class) {
        status_tower[key] = new tower_class[key](0, (37+key*9), 1);
        //框住
        line_block('status_area','rgb(0, 0, 0)',3,status_tower[key].x-0.5,status_tower[key].y-0.5,8,4);
        //畫出
        canvas_block['status_area']['context'].drawImage(status_tower[key].image_tower,
                                                         0,
                                                         status_tower[key].image_num*tower_size['height'],
                                                         status_tower[key].w_quar,
                                                         status_tower[key].h_quar,
                                                         status_tower[key].x*unit,
                                                         status_tower[key].y*unit,
                                                         tower_size['width'], 
                                                         tower_size['height']);
        //名稱 售價
        show_text ('status_area','rgb(0, 0, 0)', 'bold', '18px', status_tower[key].name, status_tower[key].x+2.5, 2);
        show_text ('status_area','rgb(0, 0, 0)', 'bold', '18px', '售價:'+status_tower[key].cost_money, status_tower[key].x+2.5, 3.5);         
    }
}

//GAME OVER 
function game_over () {
    //停止遊戲
    clearInterval(play);
    status_switch['start_menu'] = true;
    
    fill_block('menu_area','rgb(209, 209, 209)',0,0,canvas_info['play_box']['width_unit'],canvas_info['play_box']['height_unit']); 
    
    show_text ('menu_area', 'rgb(0, 0, 0)', 'bold', '72px', 'GAME OVER', 10, 10);
    show_text ('menu_area', 'rgb(0, 0, 0)', 'bold', '16px', '按任意建回開始畫面', 10, 15);
}