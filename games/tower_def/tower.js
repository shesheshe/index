//塔 
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
                            this.w_quar, 
                            this.h_quar);				
    }
	
	//升等
	this.level_up = function () {
		this.level++;
		this.cost_money = this.level_array[this.level][0];
		this.atk = this.level_array[this.level][1];
		this.atk_range = this.level_array[this.level][2];
		this.atk_speed = this.level_array[this.level][3]; 
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
        1:[20,5,3,1000],2:[30,6,3,950],3:[40,7,3,900],
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
        1:[50,5,3,1000],2:[10,6,3,950],3:[20,7,3,900],
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
		1:[40,5,3,1000],2:[10,6,3,950],3:[20,7,3,900],
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
		1:[30,5,3,1000],2:[10,6,3,950],3:[20,7,3,900],
    }
    
    this.level_up();
    
}