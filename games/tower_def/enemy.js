//第幾個敵人,圖片,x,y,生命,速度,掉落金錢
function Enemy (enemy_num,  x, y, image_enemy, hp, speed, drop_money) {
    //第幾個敵人
    this.enemy_num = enemy_num;
    this.x = x;    
    this.y = y;
    
    //圖片資料
    this.image_enemy = document.getElementById(image_enemy);
    this.w_quar = this.image_enemy.width/4;       //圖片寬1/4像素
    this.h_quar = this.image_enemy.height/4;	  //圖片高1/4像素

    //圖片方向 0向下,1向左,2向右,3向上
    this.dir = 0;  
    this.spo = 0;
    
    //基本數值 attr
    this.hp = hp;
    this.speed =  speed;
    this.drop_money =  drop_money;
	
    //移動
    //目前第幾個道路
    this.road_num = 0;
    //這道路的第幾步
    this.road_step = 1;
    
    this.move = function () {
        if (this.road_num < stage[counter['now_stage']]['road'].length) {
            switch (stage[counter['now_stage']]['road'][this.road_num][4]) {
				case 0:  //move_down
					this.dir = 0; 
					this.y++;
					this.step_y();
				break;			
				case 1:  //move_left
					this.dir = 1; 
					this.x--;
					this.step_x();
				break;			
				case 2:  //move_right
					
                    this.dir = 2;   
					this.x++;
					this.step_x();
				break;			
				case 3:  //move_up
					this.dir = 3;  
					this.y--;
					this.step_y();
				break;
			}
		}
		else {
            //減hp
            minus_hp ();
            //敵人清除
            delete enemies[this.enemy_num];
		}
    }
    
    this.step_x = function() {
		if (stage[counter['now_stage']]['road'][this.road_num][2] == this.road_step) {
			this.road_step = 1;
			this.road_num++;
		}
		else {
			this.road_step++;
		}
	}
	
	this.step_y = function() {
		if (stage[counter['now_stage']]['road'][this.road_num][3] == this.road_step) {
			this.road_step = 1;
			this.road_num++;
		}
		else {
			this.road_step++;
		}
	}	
    
     //畫出敵人
    this.draw = function () {
        canvas_block['play_area']['context'].drawImage(this.image_enemy, 
                                                       this.w_quar*this.spo, 
                                                       this.h_quar*this.dir, 
                                                       this.w_quar, 
                                                       this.h_quar, 
                                                       this.x*unit,
                                                       this.y*unit,
                                                       enemy_size['width'], 
                                                       enemy_size['height']);
        //畫血條
        //外框
        canvas_block['play_area']['context'].strokeStyle='rgb(0, 0, 0)';
        canvas_block['play_area']['context'].lineWidth="3";
        canvas_block['play_area']['context'].beginPath();
        canvas_block['play_area']['context'].rect(this.x*unit, (this.y+enemy_size['height_unit']-0.5)*unit, enemy_size['width'], unit/2);
        canvas_block['play_area']['context'].stroke(); 
        //綠條
        canvas_block['play_area']['context'].fillStyle='rgb(0, 219, 0)';
		canvas_block['play_area']['context'].fillRect(this.x*unit, (this.y+enemy_size['height_unit']-0.5)*unit, enemy_size['width'], unit/2); 
        //紅條
        canvas_block['play_area']['context'].fillStyle='rgb(173, 0, 0)';
        canvas_block['play_area']['context'].fillRect(this.x*unit, (this.y+enemy_size['height_unit']-0.5)*unit, (1-this.hp/hp)*enemy_size['width'], unit/2);  
    } 
    
    this.loop_move = 0;
    this.loop_draw = 0;
    
    this.working = function () {   
        //移動
        this.loop_move = number_loop(this.loop_move,0,this.speed);
        if (this.loop_move == this.speed) {
            this.move();
        }
        
        //動作
        this.loop_draw = number_loop(this.loop_draw,0,10);
        if (this.loop_draw == 0) {
           this.spo = number_loop(this.spo,0,3);
        }
        this.draw();
    }
}