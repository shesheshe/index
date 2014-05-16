<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scaleble=no, initial-scale=1.0, maximum-scale=1.0">
	<title>click_add_num_game</title>
</head>
<body>
<input type="button" name="level" value="簡單">
<input type="button" name="level" value="一般">
<input type="button" name="level" value="困難">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="button" id="re_game" value="重新玩"><br/>
<canvas id="game_area" width="300" height="300"></canvas>

<script type="text/javascript">
var game_area_obj = document.getElementById('game_area');
var num_ani = game_area_obj.getContext('2d');
var area_w = game_area_obj.width;
var area_h = game_area_obj.height;
var count;           //開始記數
var ready_sec;       //準備秒數
var ready;           //準備的setInterval
var work;            //遊戲的setInterval
var select_level;    //選擇的難易度
 
//畫背景
dorw_ground ();
    
    /*
    *選擇難易度
    */
    var time_diff = 0;
    var level_obj = document.getElementsByName('level');
    for(var i=0; i<level_obj.length; i++) {
    		level_obj[i].onclick = function() {
                //alert(this.value);
                //鎖定按鈕
                for(var i=0; i<level_obj.length; i++) {
                    level_obj[i].disabled = true;
                    level_obj[i].style.color = '#FF5151';
                }
                ready_sec = 3;  //預先準備三秒
                select_level = this.value;
                ready = setInterval ("ready_go()",800);
    		}
    }
    
    /*
    *預先準備三秒
    */
    function ready_go () {
        clear_game_area();
        dorw_ground ();
        num_ani.font = '12pt 標楷體';
        
        if (ready_sec != 0) {
            num_ani.strokeText("準備中剩下"+ready_sec,area_w/4,area_h/2);
            ready_sec--;
        }
        else {
            num_ani.strokeText("開始遊戲",area_w/4,area_h/2);
            clearInterval(ready);
            count=9;
            switch (select_level) {
                case '簡單':
                    work = setInterval ("draw_text()",800);
                break;
                case '一般':
                    work = setInterval ("draw_text()",500);
                break;
                case '困難':
                    work = setInterval ("draw_text()",200);
                break;
                default:
                    return false;
                break;
            }
        }
    }
    
    /*
    *隨時間增加數字
    */
    function draw_text() {
        count++; 
        clear_game_area();
        dorw_ground ();
        dorw_pic ();
        game_judge();     
    }
    
    /*
    *點擊減少數字
    */
    game_area_obj.onclick = function() {
        count=count-1;
        clear_game_area();
        dorw_ground ();
        dorw_pic ();
        game_judge();
	}
    
    /*
    *清空game_area
    */
    function clear_game_area() {
        num_ani.clearRect(0,0,area_w,area_h);
    }
    
    /*
    *畫背景
    */
    function dorw_ground () {
        num_ani.fillStyle='#d0d0d0';
        num_ani.fillRect(0,0,area_w,area_h);
    }
    
    /*
    *畫出畫面
    */
    function dorw_pic () {
        num_ani.font = '72pt 標楷體';
        num_ani.strokeText(count,area_w/4,area_h/2);
    }
    
    /*
    *輸贏判斷
    */
    function game_judge() {
        if (count == 20) {
            alert('你輸了!!');
            clearInterval(work);
        }
        else if (count == 0){
            alert('你贏了!!');
            clearInterval(work);
        }
    }
    
    /*
    *重新玩
    */
    var re_game_obj = document.getElementById('re_game');    
    re_game_obj.onclick = function() {    
        clearInterval(work);
        clear_game_area();
        dorw_ground ();

        //解除鎖定按鈕
        for(var i=0; i<level_obj.length; i++) {
            level_obj[i].disabled = false;
            level_obj[i].style.color = '#000000';
        }
    }
</script>

</body>
</html>