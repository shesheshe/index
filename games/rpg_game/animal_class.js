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
    //普通攻擊
    this.attack_con = 0;
    this.attack_x;
    this.attack_y;
    //fire_ball
    this.fire_ball_array = [];
    this.fire_ball_mp =50;
    
    this.exp = 0;
    this.exp_array = {
        1:[0,100,50,10,10],2:[10,110,60,12,12],3:[20,120,70,14,14],4:[30,130,80,16,16],5:[40,140,90,18,18],
        6:[50,150,100,20,20],7:[60,160,110,22,22],8:[70,170,120,24,24],9:[80,180,130,26,26],10:[90,200,150,30,30]
    }
    this.level = 1;
    this.hp = this.exp_array[this.level][1];
    this.mp = this.exp_array[this.level][2];
    this.atk = this.exp_array[this.level][3];
    this.def = this.exp_array[this.level][4];
    //level => exp, hp, mp, atk, def
    
    //素質
    this.level_cheak = function () {
        //alert(this.exp_array[this.level+1][0]);
        //取得下一等級的需求經驗值
        if (this.exp >= this.exp_array[this.level+1][0]) {
            this.level = this.level+1;
            this.hp = this.exp_array[this.level][1];
            this.mp = this.exp_array[this.level][2];
            this.atk = this.exp_array[this.level][3];
            this.def = this.exp_array[this.level][4];
        }
    }   
    
    //魔力每秒回復
    this.mp_up = function () {
            this.mp++;
            status_area_update ();
    }
    
    
	//對話!!
	this.dialo = function () {
        if (map[this.y][this.x] != this.varanem && map[this.y][this.x] != "ground") {
            play_area_03.clearRect(0, 0, play_area_03_w, play_area_03_h);
            //取得對話人物編碼
            eval(map[this.y][this.x]).speak();
        }
    }
	
    //會攻擊(普通攻擊)
    this.hero_attack = function () {
        switch (this.dir) {
            case 0:
                this.attack_x = this.x;
                this.attack_y = this.y+this.h_unit;
            break;
            case 1:
                this.attack_x = this.x-1;
                this.attack_y = this.y+1;
            break;
            case 2:
                this.attack_x = this.x+this.w_unit;
                this.attack_y = this.y+1;
            break;
            case 3:
                this.attack_x = this.x;
                this.attack_y = this.y-1;
            break;
        }
        
        play_area_02.drawImage(attack,
                               attack_array[this.dir][0], 
                               attack_array[this.dir][1], 
                               attack_array[this.dir][2], 
                               attack_array[this.dir][3], 
                               this.attack_x*unit,
                               this.attack_y*unit,
                               attack_array[this.dir][2]/2, 
                               attack_array[this.dir][3]/2);
        
        //判斷有沒有攻擊到敵人 有的話敵人會失血
        if (map[this.attack_y][this.attack_x] != 0) {
                
                var obj_touch = map[this.attack_y][this.attack_x];
                eval(obj_touch).hp -= Math.ceil(this.atk/6);
                
                if (obj_touch.match("map_mon")) {
                    if ( eval(obj_touch).hp >= 0) {
                        
                    }
                    else {
                        //得到經驗值
                       this.exp += eval(obj_touch).drop_exp;
                       this.level_cheak();
                       eval(obj_touch).clear_occ(); 
                       status_area_update ();
                       
                        for(var key2 in eval(this_map)["map_mon"]) {
                            if (eval(obj_touch) == map_mon[key2]) {

                                delete map_mon[key2];
                            }
                        }
                    }                 
                }        
            }
    }
    
    //會攻擊(技能攻擊)
    this.fire_ball = function () {
        
        //魔力判斷 fun
        if (this.mp >= this.fire_ball_mp) {
            //產生火球
            this.fire_ball_array.push([this.x,this.y,this.dir]);
            //扣魔力
            this.mp = this.mp - this.fire_ball_mp;
        }
        
        status_area_update ();
    }
    
    this.do_work = function () {
		this.draw();

        
        if (this.attack_con == 1) {
            this.hero_attack();
        }
        
        for (var key in this.fire_ball_array) {
            switch (this.fire_ball_array[key][2]) {
                case 0:
                    this.fire_ball_array[key][0];
                    this.fire_ball_array[key][1]++;
                break;
                case 1:
                    this.fire_ball_array[key][0]--;
                    this.fire_ball_array[key][1];
                break;
                case 2:
                    this.fire_ball_array[key][0]++;
                    this.fire_ball_array[key][1];
                break;
                case 3:
                    this.fire_ball_array[key][0];
                    this.fire_ball_array[key][1]--;
                break;
            }
            
            play_area_02.drawImage(magic,
                                   magic_array[0][0], 
                                   magic_array[0][1], 
                                   magic_array[0][2], 
                                   magic_array[0][3], 
                                   this.fire_ball_array[key][0]*unit,
                                   this.fire_ball_array[key][1]*unit,
                                   magic_array[0][2]/2, 
                                   magic_array[0][3]/2)
            
            //打到東西或出界會消失
            if (this.fire_ball_array[key][0] <= 0 || 
                     this.fire_ball_array[key][0] >= play_area_i ||
                     this.fire_ball_array[key][1] <= 0 || 
                     this.fire_ball_array[key][1] >= play_area_j) {
                delete this.fire_ball_array[key];
            }
            else if (map[this.fire_ball_array[key][1]][this.fire_ball_array[key][0]] != 0 && 
                map[this.fire_ball_array[key][1]][this.fire_ball_array[key][0]] != this.varanem) {
                
                var obj_touch = map[this.fire_ball_array[key][1]][this.fire_ball_array[key][0]];
                eval(obj_touch).hp -= Math.ceil(this.atk-eval(obj_touch).def*0.7);
                

                
                if (obj_touch.match("map_mon")) {
                    if ( eval(obj_touch).hp >= 0) {
                        
                    }
                    else {
                        //得到經驗值
                       this.exp += eval(obj_touch).drop_exp;
                       this.level_cheak();
                       eval(obj_touch).clear_occ(); 
                       status_area_update ();
                         
                        for(var key2 in eval(this_map)["map_mon"]) {
                            if (eval(obj_touch) == map_mon[key2]) {

                                delete map_mon[key2];
                            }
                        }
                    }
                    
                }

                delete this.fire_ball_array[key];
             
            }

        }
        
        if (this.mp < this.exp_array[this.level][2]) {
            this.mp_up();
        }

	}
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
    //移動開關
    var stop_move = 1;
    var timer;
	//說話 對話
	this.speak_count = 0;
    this.speak = function () {
        //方向向下
        this.dir = 0;
        stop_move = 0;
        clearTimeout(timer);
        
        if (this.speak_count == speak.length) {
			this.speak_count = 0;
		}
        
        play_area_03.beginPath();
		play_area_03.fillStyle="#E0E0E0";
        play_area_03.rect((this.x-3)*unit, (this.y-3)*unit,speak[this.speak_count].length*20, 25);
        play_area_03.fill();
        
        play_area_03.fillStyle="black";
        play_area_03.font = "bold 18px Courier";
		play_area_03.fillText(speak[this.speak_count],(this.x-3)*unit,(this.y-2)*unit);
        
		this.speak_count++;
        //暫停移動5秒
        timer = setTimeout(this.speak_delay,5000);
	}
	
    this.speak_delay = function () {
        //清除對話
        play_area_03.clearRect(0, 0, play_area_03_w, play_area_03_h);
        //進行移動
        stop_move = 1;
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
		play_area_02.font = "bold 9px Courier";
		play_area_02.fillText(this.name,this.x*unit,this.y*unit);

        if (stop_move == 1) {
            this.move();
        }
        
	}
}

function Monster (varanem, x, y, image_name, real_h ,speed,name ,hp ,atk, def, drop_exp) {
    //繼承Animal 對象冒充繼承
	this.animal = Animal;
	this.animal(varanem, x, y, image_name, real_h ,speed);
    
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.drop_exp = drop_exp;

	//緩衝 不要讓圖片動太快(移動)
    this.butter_move = 20;
    //計算運行幾次this.move function
    this.fun_move_count = 0;

	this.move = function () {
		//
		this.fun_move_count++;
        if (this.fun_move_count == this.butter_move) {
			switch (Math.floor(Math.random()*5)) {
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
        }
	}
    
    this.attack = function () {
        if (this.atk - hero.def > 0) {
            hero.hp -= this.atk - hero.def;
        }
        else {
            hero.hp -= 1;
        }
        
        status_area_update ();
    }
    
    this.do_work = function () {
		this.draw();
		play_area_02.font = "bold 9px Courier";
		play_area_02.fillText(this.name+" HP"+this.hp,this.x*unit,this.y*unit);
        
        if (this.y+this.h_unit < play_area_j && map[this.y+this.h_unit][this.x] == "hero") {
            this.dir = 0;
            this.attack();
        }
        else if (this.x-1 > 0 && map[this.y][this.x-1] == "hero") {
            this.dir = 1;
            this.attack();
        }
        else if (this.x+this.w_unit < play_area_i && map[this.y][this.x+this.w_unit] == "hero") {
            this.dir = 2;
            this.attack();
        }
        else if (this.y-1 > 0 && map[this.y-1][this.x] == "hero") {
            this.dir = 3;
            this.attack();
        }
        else {
            this.move();
        }
        

	}
}