function Enemy (image_enemy, x, y, hp, speed, drop_money) {
	//圖片資料
    this.get_image_enemy = document.getElementById(image_enemy);
    this.w_quar = this.get_image_enemy.width/4;       //圖片寬1/4像素
    this.h_quar = this.get_image_enemy.height/4;	     //圖片高1/4像素

    //圖片方向 0向下,1向左,2向右,3向上
    this.dir = 0;  
    this.spo = 0;
    
    //位置
    this.x = x;    
    this.y = y;

    //基本數值
    this.hp = hp;
    this.speed =  speed;
    this.drop_money =  drop_money;
    
    //敵人移動
	this.road_no = 0;
	this.road_total = eval(map_no)["route"]["road"].length;
	this.road_count = 1;
	
    this.move = function () {
		//判斷走路方向
		if (this.road_total > this.road_no) {
			switch (eval(map_no)["route"]["road"][this.road_no][4]) {
				case 0:  //move_down
					this.dir = 0; 
					this.y++;
					this.walk_y();
				break;			
				case 1:  //move_left
					this.dir = 1; 
					this.x--;
					this.walk_x();
				break;			
				case 2:  //move_right
					this.dir = 2;   
					this.x++;
					this.walk_x();
				break;			
				case 3:  //move_up
					this.dir = 3;  
					this.y--;
					this.walk_y();
				break;
			}
		}
		else {
			//走到底了
			
		}
		//alert(this.road_no+"-"+this.road_count);
    }
	
	this.walk_x = function() {
		if (eval(map_no)["route"]["road"][this.road_no][2] == this.road_count) {
			this.road_count = 1;
			this.road_no++;
		}
		else {
			this.road_count++;
		}
	}
	
	this.walk_y = function() {
		if (eval(map_no)["route"]["road"][this.road_no][3] == this.road_count) {
			this.road_count = 1;
			this.road_no++;
		}
		else {
			this.road_count++;
		}
	}	
    
    //畫出敵人
    this.draw = function () {
        play_area.drawImage(this.get_image_enemy, 
                            this.w_quar*this.spo, 
                            this.h_quar*this.dir, 
                            this.w_quar, 
                            this.h_quar, 
                            this.x*unit,
                            this.y*unit,
                            this.w_quar, 
                            this.h_quar);
		//血條					
    }
    
    //控制速度
    this.working = function () {
        this.draw();
        this.move();
    }
}