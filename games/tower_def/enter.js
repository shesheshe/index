//有輸入的時候 鍵盤 滑鼠 等
//按鍵事件
document.onkeydown = function(event){
    //alert('鍵盤碼:'+event.keyCode);
}
//滑鼠事件
//狀態欄
var choose_tower;
var build_event = 0;

canvas_status_area.onmousedown = function(event){
    //alert(event.offsetX+'--'+event.offsetY);
    
    //要跟 status_update () 內的一樣
    //開始按鈕座標
    if (event.offsetX >= unit && event.offsetX <= unit*6) {
        if (event.offsetY >= unit && event.offsetY <= unit*3) {
            if (game_start_button == 0) {
                game_start_button = 1;
                status_update ();
            }
        }
    }
    
    //塔點擊事件
    for (var key in status_tower) {
        if (event.offsetX >= status_tower[key].x*unit && event.offsetX <= (status_tower[key].x+status_tower_box_x)*unit) {
            if (event.offsetY >= status_tower[key].y*unit && event.offsetY <= (status_tower[key].y+status_tower_box_y)*unit) {
                build_event = 1;
                
                choose_tower = key;              
                status_update();    
            }
        }
    }
}

var play_tower = [];
canvas_menu_area.onmousedown = function(event){
    //alert(event.offsetX+'--'+event.offsetY);
    var build_x = Math.floor(event.offsetX/unit);
    var build_y = Math.floor(event.offsetY/unit);
    
    //建塔
    if (build_event == 1) {
        //建塔
        play_tower.push(new tower_array[choose_tower](build_x, build_y, play_area));
        //減金錢
  
        //佔位置
        
        build_event = 0;       
        menu_area.clearRect(0, 0, menu_area_w, menu_area_h);
        choose_tower = null;  
        status_update();
               
    }
}

canvas_menu_area.onmousemove = function(event){
    if (build_event == 1) {
        menu_area.clearRect(0, 0, menu_area_w, menu_area_h); 
    
        var move_x = Math.floor(event.offsetX/unit);
        var move_y = Math.floor(event.offsetY/unit);
        //alert(event.offsetX+','+event.offsetY+"--"+move_x+','+move_y);
            
        //檢查有沒有東西擋住 四邊
        if (map[move_x][move_y] == 0 &&                                         //左上 x    y
            map[move_x+set_size_x/unit-1][move_y] == 0 &&                       //右上 x-1  y
            map[move_x][move_y+set_size_y/unit-1] == 0 &&                       //左下 x    y-1
            map[move_x+set_size_x/unit-1][move_y+set_size_y/unit-1] == 0 ) {    //右下 x-1  y-1
            
            menu_area.strokeStyle='#1AFD9C';
            menu_area.fillStyle='rgba(28, 253, 155, 0.5)';
        }
        else {
            menu_area.strokeStyle='#FF0000';
            menu_area.fillStyle='rgba(255, 0, 0, 0.5)';
        }
        
        menu_area.beginPath();
        menu_area.rect(move_x*unit, move_y*unit, set_size_x, set_size_y);
        menu_area.stroke();     
        menu_area.fillRect(move_x*unit, move_y*unit, set_size_x, set_size_y);     
    }
}
