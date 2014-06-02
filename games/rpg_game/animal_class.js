//人物 動物 怪物 等類別
//class-----------------------------------------
function Animal (varanem, x, y, image_name, real_h ,speed) {
    //變數名稱
	this.varanem = varanem;
	
	//位置
    this.x = x;
    this.y = y;
	
    //載入圖片
    this.image_name = document.getElementById(image_name);
    this.w = this.image_name.width;           //圖片的寬度像素
    this.h = this.image_name.height;          //圖片的高度像素
    this.w_quar = this.w/4;                   //圖片寬1/4像素
    this.h_quar = this.h/4;			          //圖片高1/4像素
    this.w_unit = this.w_quar/unit;			  //圖片寬占的單位
    this.h_unit = this.h_quar/unit;			  //圖片高占的單位
	
    //真實位置 碰撞判定用
	this.real_h = this.h_quar/unit-real_h;	  //圖片的真實高度
	
    //運動圖片
    this.spo = 0;
    //緩衝 不要讓圖片動太快(圖片轉換 原地)
    this.butter_spo = 12;
    //計算運行幾次this.draw function
    this.fun_draw_count = 0;
    //圖片方向 0向下,1向左,2向右,3向上
    this.dir = 0;  
    //移動速度
    this.speed = speed;
	
	//填充角色位置占用
	this.full_occ = function () {
		for (var j = 0; j < this.h_unit; j++) {
			for (var i = 0; i < this.w_unit; i++ ) {
				if (map[this.y+j][this.x+i] == 0) {
					map[this.y+j][this.x+i] = this.varanem;
				}
			}
		}
	}

	//消除角色位置占用
	this.clear_occ = function () {
		for (var j = 0; j < this.h_unit; j++) {
			for (var i = 0; i < this.w_unit; i++ ) {
				if (map[this.y+j][this.x+i] == this.varanem) {
					map[this.y+j][this.x+i] = 0;
				}
			}
		}
	}
	
	this.full_occ();
    //移動function 到邊界就不能再移動 or map[][] != 0 障礙物
    this.move_down = function () {
        this.dir = 0;    		  //轉方向
		this.clear_occ();
		
        if (this.y >= play_area_j-this.h_quar/unit) {
            this.y = play_area_j-this.h_quar/unit;
        }
		else if (map[this.y+this.h_unit][this.x] != 0 || 
				 map[this.y+this.h_unit][this.x+this.w_unit-1] != 0) {
			this.y = this.y;
		}
        else {
            this.y = this.y + this.speed;
        }
		
		this.full_occ();
    }
    
    this.move_left = function () {
        this.dir = 1;
		this.clear_occ();
		
        if (this.x <= 0) {
            this.x = 0;
        }
		else if (map[this.y+this.real_h][this.x-1] != 0 || 
				 map[this.y+this.h_unit-1][this.x-1] != 0 ) {
			this.x = this.x;
		}
        else {
            this.x = this.x - this.speed;
        }
		
		this.full_occ();
    }
    
    this.move_right = function () { 
        this.dir = 2;
		this.clear_occ();
		
        if (this.x >= play_area_i-this.w_quar/unit) {
            this.x = play_area_i-this.w_quar/unit;
        }
		else if (map[this.y+this.real_h][this.x+this.w_unit] != 0 ||
				 map[this.y+this.h_unit-1][this.x+this.w_unit] != 0) {
			this.x = this.x;
		}
        else {
            this.x = this.x + this.speed;
        }
		
		this.full_occ();
    }
    
    this.move_up = function () {  
        this.dir = 3;
		this.clear_occ();
		
        if (this.y <= 0) {
            this.y = 0;
        }
		else if (map[this.y-1+this.real_h][this.x] != 0 ||
				 map[this.y-1+this.real_h][this.x+this.w_unit-1] != 0) {
			this.y = this.y;
		}
        else {
            this.y = this.y - this.speed;
        }
		
		this.full_occ();
    }
	
    //顯示出來
    this.draw = function () {
        play_area_02.drawImage(this.image_name, 
                               this.w_quar*this.spo, 
                               this.h_quar*this.dir, 
                               this.w_quar, 
                               this.h_quar, 
                               this.x*unit,
                               this.y*unit,
                               this.w_quar, 
                               this.h_quar);
        
		this.fun_draw_count++;
        if (this.fun_draw_count == this.butter_spo) {
            this.fun_draw_count = 0;
			this.spo ++;
			
            if (this.spo == 4) {
                this.spo = 0;
            }
        }
    }
}

//英雄(自己)
function Hero (varanem, x, y, image_name, real_h ,speed) {
    //繼承Animal 對象冒充繼承
	this.animal = Animal;
	this.animal(varanem, x, y, image_name, real_h ,speed);
    //說話記數
	this.speak_count;
	
	//對話!!
	this.dialo = function () {
		//取得對話人物編碼
		eval(map[this.y][this.x]).speak();
	}
	
    //會攻擊(普通攻擊)
    
    //會攻擊(技能攻擊)
}

//路人
function People (varanem, x, y, image_name, real_h ,speed, name, speak, route, butter_move) {
    //繼承Animal 對象冒充繼承
	this.animal = Animal;
	this.animal(varanem, x, y, image_name, real_h ,speed);
	//名子
	this.name = name;
	//移動路徑
	this.route = route;
	//緩衝 不要讓圖片動太快(移動)
    this.butter_move = butter_move;
    //計算運行幾次this.move function
    this.fun_move_count = 0;
    this.route_key = 0;
	//說話 對話
	this.speak_count = 0;
	this.speak = function () {
		if (this.speak_count == speak.length) {
			this.speak_count = 0;
		}

		play_area_03.font = "bold 9pt Courier";
		play_area_03.fillText(speak[this.speak_count],this.x*unit,(this.y-1)*unit);
		
		this.speak_count++;
	}
	
	this.move = function () {
		//路人移動
		this.fun_move_count++;
        if (this.fun_move_count == this.butter_move) {
			switch (this.route[this.route_key]) {
				case 0:
				break;
				case 1:
					this.move_down();
				break;
				case 2:
					this.move_left();
				break;
				case 3:
					this.move_right();
				break;
				case 4:
					this.move_up();
				break;
			}
	
            this.fun_move_count = 0;
			this.route_key++;
			
			if (this.route.length == this.route_key) {
				this.route_key = 0;
			}
        }
	}
	
	this.do_work = function () {
		this.draw();
		play_area_02.font = "bold 9pt Courier";
		play_area_02.fillText(this.name,this.x*unit,this.y*unit);
		this.move();
	}
}