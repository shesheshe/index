//塔 
var tower_array = [Arrow_tower,Turret_tower,Ice_tower];
//子彈陣列
var bullets = [];

function Tower (x, y, area, image_tower) {
	this.x = x;
	this.y = y;
	this.area = area;
	
	//圖片資料
    this.get_image_tower = document.getElementById(image_tower);
    this.w_quar = this.get_image_tower.width/4;       //圖片寬1/4像素
    this.h_quar = this.get_image_tower.height/4;	  //圖片高1/4像素
	
	//圖片方向 0向下,1向左,2向右,3向上
    this.dir = 0;  
    this.spo = 0;
	
	this.draw = function () {
        this.area.drawImage(this.get_image_tower, 
                            this.w_quar*this.spo, 
                            this.h_quar*this.dir, 
                            this.w_quar, 
                            this.h_quar, 
                            this.x*unit,
                            this.y*unit,
                            set_size_x, 
                            set_size_y);
		//顯示等級
		if (this.area == play_area) {
			play_area.fillStyle='#FFFFFF';
			play_area.font = "normal 9px 微軟正黑體";
			play_area.fillText(this.level,this.x*unit,(this.y+1)*unit); 			
		}
    }
	
	//升等
	this.level_up = function () {
		this.level++;
		this.cost_money = this.level_array[this.level][0];
		this.atk = this.level_array[this.level][1];
		this.atk_range = this.level_array[this.level][2];
		this.atk_speed = this.level_array[this.level][3]; 
	}
    
    //
    this.attack = function () {
        var key_min_hp;
        
        //範圍
        for (var key in enemies) {
            //已經被清除(delete)的就不用看了
            if (enemies[key] != undefined) {
                if (this.x-this.atk_range <= enemies[key].x+set_size_x/unit &&
                    this.x+set_size_x/unit+this.atk_range >= enemies[key].x &&
                    this.y-this.atk_range <= enemies[key].y+set_size_y/unit &&
                    this.y+set_size_y/unit+this.atk_range >= enemies[key].y) {
                    
                    //選血最少的打
                    if (key_min_hp == null) {
                        key_min_hp = key;
                    }
                    else {
                        if (enemies[key_min_hp].hp > enemies[key].hp) {
                            key_min_hp = key;
                        }
                    }
                }				
            }
        }
		
		if (key_min_hp != null) {
			//產生子彈
			bullets.push(new Bullet(bullets.length, this.x, this.y, this.hit(key_min_hp), this.image_bullet, enemies[key_min_hp]));
		}
    }
    
	var attack_count = 0;
	
    this.working = function () {
        if (this.atk_speed < attack_count) {
			this.attack();
			attack_count = 0;
		}
		else {
			attack_count++;
		}
		
		this.draw();
    }
}

function Arrow_tower (x, y, area) {
	//繼承Tower 對象冒充繼承
	this.tower = Tower;
	this.tower(x, y, area, "image_arrow_tower");
	
	this.name = "箭塔";
	this.image_bullet = 0;
    this.level = 0;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_array = {
        1:[20,1,3,10],2:[30,2,4,5],3:[40,3,5,1],
    }
    
	this.level_up(); 
    this.hit = function (key_min_hp) {
        enemies[key_min_hp].hp = enemies[key_min_hp].hp - this.atk;
    }
}

function Turret_tower (x, y, area) {
	//繼承Tower 對象冒充繼承
	this.tower = Tower;
	this.tower(x, y, area, "image_turret_tower");
	
	this.name = "炮塔";
	this.image_bullet = 1;
    this.level = 0;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_array = {
        1:[50,50,4,10],2:[10,6,3,5],3:[20,7,3,1],
    }
    
	this.level_up(); 
    this.hit = function (key_min_hp) {
        enemies[key_min_hp].hp = enemies[key_min_hp].hp - this.atk;
        
        //範圍攻擊 range(3) 
        for (var key in enemies) {
            if (enemies[key_min_hp].x-5 <= enemies[key].x+set_size_x/unit &&
                enemies[key_min_hp].x+5 >= enemies[key].x &&
                enemies[key_min_hp].y-5 <= enemies[key].y+set_size_y/unit &&
                enemies[key_min_hp].y+5 >= enemies[key].y && key != key_min_hp) {
                
                enemies[key].hp = enemies[key].hp - Math.ceil(this.atk/2);
                if (enemies[key].hp <= 0) {
                    delete enemies[key];
                }
            
            }	
        }
    }
}

function Ice_tower (x, y, area) {
	//繼承Tower 對象冒充繼承
	this.tower = Tower;
	this.tower(x, y, area, "image_ice_tower");
	
	this.name = "冰塔";
	this.image_bullet = 2;
    this.level = 0;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_array = {
		1:[40,50,5,10],2:[10,6,3,5],3:[20,7,3,1],
    }
    
	this.level_up();
    this.hit = function (key_min_hp) {
        enemies[key_min_hp].hp = enemies[key_min_hp].hp - this.atk;
        
        //減速度
        enemies[key_min_hp].speed_count -= 5 + this.level; 
    }
}

//子彈控制類
function Bullet(bullet_count, x, y, hit, image_bullet, this_enemy) {
	this.bullet_count = bullet_count;
	
	//子彈資料
    this.get_image_bullet = document.getElementById("image_bullet");
	
	this.move_x = x;
	this.move_y = y;
	this.image_bullet = image_bullet;
	this.size = unit;
	this.hit = hit;
	
	this.this_enemy = this_enemy;
	
	this.draw = function () {
		//子彈移動
		if (this.move_x > this.this_enemy.x) {
			this.move_x--;
		}
		else if (this.move_x < this.this_enemy.x){
			this.move_x++;
		}
		
		if (this.move_y > this.this_enemy.y) {
			this.move_y--;
		}
		else if (this.move_y < this.this_enemy.y){
			this.move_y++;
		}
        
        play_area.drawImage(this.get_image_bullet,this.image_bullet*unit,0,this.size,this.size,this.move_x*unit,this.move_y*unit,this.size,this.size);	
	}
	
	this.working = function () {
		this.draw();
        
		//打中了
		if (this.move_x == this.this_enemy.x && this.move_y == this.this_enemy.y) {
            this.hit;
            //打死敵人
			if (this.this_enemy.hp <= 0) {
				//得到錢
				my_money = my_money + this.this_enemy.drop_money;
				delete enemies[this.this_enemy.enemy_count];
				status_update();
			}
			
			delete bullets[this.bullet_count];
		}
	}
}