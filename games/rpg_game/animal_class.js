//人物 動物 怪物 等類別
//class-----------------------------------------
function Animal (x_unit, y_unit, image_name, speed_unit) {
    //位置
    this.x_unit = x_unit;
    this.y_unit = y_unit;
    //載入圖片
    this.image_name = document.getElementById(image_name);
    this.w = this.image_name.width;
    this.h = this.image_name.height;
    this.w_quar = this.image_name.width/4;
    this.h_quar = this.image_name.height/4;
    //運動圖片
    this.spo = 0;
    //緩衝 不要讓圖片動太快
    this.butter_spo = 12;
    //計算運行幾次this.draw function
    this.fun_draw_count = 0;
    //圖片方向 0向下,1向左,2向右,3向上
    this.dir = 0;  
    //移動速度
    this.speed = speed*unit;
    
    //移動function 到邊界就不能再移動 or map[][] != 0
    this.move_down = function () {
        this.dir = 0;
        if (this.y >= play_area_02_h-this.h_quar) {
            this.y = play_area_02_h-this.h_quar;
        }
        else {
            this.y = this.y + this.speed;
        }
    }
    
    this.move_left = function () {
        this.dir = 1;
        if (this.x <= 0) {
            this.x = 0;
        }
        else {
            this.x = this.x - this.speed;
        }
    }
    
    this.move_right = function () { 
        this.dir = 2;
        if (this.x >= play_area_02_w-this.w_quar) {
            this.x = play_area_02_w-this.w_quar;
        }
        else {
            this.x = this.x + this.speed;
        }
    }
    
    this.move_up = function () {  
        this.dir = 3;
        //alert(this.x/unit+'-'+this.y/unit);
        
        if (this.y <= 0) {
            this.y = 0;
        }
        else if (map[this.x/unit][this.y/unit] == 1) {
            
        }
        else {
            this.y = this.y - this.speed;
        }
    }
    
    //顯示出來
    this.draw = function () {
        play_area_02.drawImage(this.image_name, 
                               this.w_quar*this.spo, 
                               this.h_quar*this.dir, 
                               this.w_quar, 
                               this.h_quar, 
                               this.x,
                               this.y,
                               this.w_quar, 
                               this.h_quar);

        this.fun_draw_count++;
        if (this.fun_draw_count == this.butter_spo) {
            this.spo ++;
            if (this.spo == 4) {
                this.spo = 0;
            }
            
            this.fun_draw_count = 0;
        }
    }
}

function Hero (x, y, image_name, speed) {
    //繼承Animal 對象冒充繼承
	this.animal = Animal;
	this.animal(x, y, image_name, speed);
    
    //會攻擊(普通攻擊)
    
    //會攻擊(技能攻擊)
}