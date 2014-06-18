//塔 
tower_array = [Arrow_tower,Turret_tower,Ice_tower,Up_tower];

function Tower (x, y, area, image_tower) {
	this.x = x;
	this.y = y;
	this.area = area;
	
	//圖片資料
    this.get_image_tower = document.getElementById(image_tower);
    this.w_quar = this.get_image_tower.width/4;       //圖片寬1/4像素
    this.h_quar = this.get_image_tower.height/4;	  //圖片高1/4像素
	
    //子彈資料
    this.get_image_bullet = document.getElementById("image_bullet");
    
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

                    for (var i=this.x*unit; i<=enemies[key_min_hp].x*unit; i++) {
                        for (var j=this.y*unit; j<=enemies[key_min_hp].y*unit; j++) {
                            play_area.drawImage(this.get_image_bullet, 16, 0, 16, 16, i,j,16, 16);
                        }
                    }
                    
                    if (enemies[key_min_hp].hp >= this.atk) {
                        enemies[key_min_hp].hp = enemies[key_min_hp].hp - this.atk;
                    }
                    else {  //打死敵人
                        //得到錢
                        my_money = my_money + enemies[key_min_hp].drop_money;
                        delete enemies[key_min_hp];
                        key_min_hp = null;
                        status_update();
                    }
                }
            }
        }
    }
    
    this.working = function () {
        this.attack();
        this.draw();
    }
}

function Arrow_tower (x, y, area) {
	//繼承Tower 對象冒充繼承
	this.tower = Tower;
	this.tower(x, y, area, "image_arrow_tower");
	
	this.name = "箭塔";
    this.level = 0;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_array = {
        1:[20,1,3,1000],2:[30,6,4,950],3:[40,7,5,900],
    }
    
	this.level_up(); 
}

function Turret_tower (x, y, area) {
	//繼承Tower 對象冒充繼承
	this.tower = Tower;
	this.tower(x, y, area, "image_turret_tower");
	
	this.name = "炮塔";
    this.level = 0;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_array = {
        1:[50,5,4,1000],2:[10,6,3,950],3:[20,7,3,900],
    }
    
	this.level_up();   
}

function Ice_tower (x, y, area) {
	//繼承Tower 對象冒充繼承
	this.tower = Tower;
	this.tower(x, y, area, "image_ice_tower");
	
	this.name = "冰塔";
    this.level = 0;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_array = {
		1:[40,5,5,1000],2:[10,6,3,950],3:[20,7,3,900],
    }
    
	this.level_up();
}

function Up_tower (x, y, area) {
	//繼承Tower 對象冒充繼承
	this.tower = Tower;
	this.tower(x, y, area, "image_up_tower");
	
	this.name = "增強塔";
    this.level = 0;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_array = {
		1:[30,5,6,1000],2:[10,6,3,950],3:[20,7,3,900],
    }
    
    this.level_up();
    
}