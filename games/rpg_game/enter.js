//有輸入的時候 鍵盤 滑鼠 等
//按鍵事件
document.onkeydown = function(event){
    var attack_time;
    
    //alert('鍵盤碼:'+event.keyCode);
    switch (window.event.keyCode) {
		//按鍵移動
		case 40:
			hero.move_down();
		break;
		case 37:
			hero.move_left();
		break;
		case 39:
			hero.move_right();
		break;
		case 38:
			hero.move_up();
		break;
		//按鍵普通攻擊
		case 81:  //q 
            hero.level_cheak();
            clearTimeout(attack_time);
            
            hero.attack_con = 1;
            
            attack_time = setTimeout(attack_delay,100);
            function attack_delay () {
                hero.attack_con = 0;
            }
        break;
		//按鍵技能攻擊
		case 87:  //w 
            hero.fire_ball();
        break;	
        //換地圖
        case 13:  //enter
            var enter_x;
            var enter_y;
            //換地圖
            //補0 j
            hero.x < 10 ? enter_x = "0"+hero.x: enter_x = ""+hero.x;
            //補0 i 
            hero.y < 10 ? enter_y = "0"+hero.y: enter_y = ""+hero.y;
            //alert("M"+enter_y+enter_x+'-'+eval(this_map)["map_change"]["M"+enter_y+enter_x]);
            if (eval(this_map)["map_change"]["M"+enter_y+enter_x]) {
                this_map = eval(this_map)["map_change"]["M"+enter_y+enter_x];
                play_area_01.clearRect(0, 0, play_area_01_w, play_area_01_h);
                map_ani = [];
                
                draw_map_ground(this_map);
                draw_map_ani(this_map);
                hero.x = Math.abs(hero.x -46);
            }
        break;	
		//按鍵對話
		case 32:  //空白
			hero.dialo();
		break;
    }
}
