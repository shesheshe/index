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
    
    //移動
    this.move_down = function () {
        this.dir = 0; 
        this.y = this.y + this.speed;
    }
    
    this.move_left = function () {
        this.dir = 1; 
        this.x = this.x - this.speed;
    }
    
    this.move_right = function () {
        this.dir = 2;   
        this.x = this.x + this.speed;
    }
    
    this.move_up = function () {
        this.dir = 3;  
        this.y = this.y - this.speed;
    }
    
    //敵人移動
    this.move = function () {
        //alert(eval(map_no)["route"]["road"][0]);
        
    }
    
    //畫出敵人
    this.draw = function () {
        back_ground.drawImage(this.get_image_enemy, 
                              this.w_quar*this.spo, 
                              this.h_quar*this.dir, 
                              this.w_quar, 
                              this.h_quar, 
                              this.x*unit,
                              this.y*unit,
                              this.w_quar, 
                              this.h_quar);
    }
    
    //控制速度
    this.working = function () {
        this.draw();
        this.move();
    }
}