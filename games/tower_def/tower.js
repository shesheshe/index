var tower_class = [Jianta,Turret,Ice];
//X開始位置,Y開始位置,塔的圖片
function Tower (tower_num, image_num, x, y) {
	this.tower_num = tower_num;
	this.image_num = image_num;
	this.x = x;
	this.y = y;
	
	//圖片資料
    this.image_tower = get_image['tower'];
    this.w_quar = this.image_tower.width/4;       //圖片寬1/4
    this.h_quar = this.image_tower.height/4;	  //圖片高1/4	

	//圖片動作
    this.spo = 0;
    
	this.draw = function () {
        //this.spo = number_loop(this.spo,0,3);

        canvas_block['play_area']['context'].drawImage(this.image_tower, 
                                                       this.w_quar*this.spo, 
                                                       this.h_quar*this.image_num, 
                                                       this.w_quar, 
                                                       this.h_quar, 
                                                       this.x*unit, 
                                                       this.y*unit, 
                                                       tower_size['width'], 
                                                       tower_size['height']);

        //顯示等級
        show_text ('play_area', 'rgb(0, 0, 0)', 'bold', '18px', this.level, this.x, this.y+1);		
    }  
	
	//升等
	this.level_up = function () {
		this.level++;
		this.cost_money = this.level_attr[this.level][0];
		this.atk = this.level_attr[this.level][1];
		this.atk_range = this.level_attr[this.level][2];
		this.atk_speed = this.level_attr[this.level][3]; 
        
        //下一等的花費
        if (this.level_attr[this.level+1] != undefined) {
            this.next_cost = this.level_attr[this.level+1][0];
        }
        else {
            this.next_cost = "最高等";
        }
	}
	
    //塔佔位
    this.tower_occ = function () {
        for (var i=0; i<tower_size['width_unit']; i++) {
			for (var j=0; j<tower_size['height_unit']; j++) {
				map_unit[this.x+i][this.y+j] = tower_num;
			}
		}
    }
    
    //塔佔位清除
    this.tower_clear_occ = function () {
        for (var i=0; i<tower_size['width_unit']; i++) {
			for (var j=0; j<tower_size['height_unit']; j++) {
				map_unit[this.x+i][this.y+j] = undefined;
			}
		}
    }
    
    //取得敵人焦點
    this.find_enemy_focus = function () {
        var min_hp = undefined;
        
        
        //找生命值最低的敵人 每個敵人跑一次
        for (var key in enemies) {
            //已經被清除(delete)的就不用看了
            if (enemies[key] != undefined) {
                //找出在攻擊範圍內的
                if (this.x-this.atk_range <= enemies[key].x+tower_size['width_unit'] &&
                    this.x+tower_size['width_unit']+this.atk_range >= enemies[key].x &&
                    this.y-this.atk_range <= enemies[key].y+tower_size['height_unit'] &&
                    this.y+tower_size['width_unit']+this.atk_range >= enemies[key].y) {
                    
                    //選血最少的打
                    if (min_hp == undefined) {
                        min_hp = key;
                    }
                    else {
                        if (enemies[min_hp].hp > enemies[key].hp) {
                            min_hp = key;
                        }
                    }
                }				
            }
        }        

		if (min_hp != undefined) {
			//產生子彈
			bullets.push(new Bullet(bullets.length, this.tower_num, min_hp));
		}
    }
    
    this.loop_fire = 0;
    
    this.working = function () {
		this.loop_fire = number_loop(this.loop_fire,0,this.atk_speed);
        if (this.loop_fire == 0) {
            this.find_enemy_focus();
        }
        
        this.draw();
    }
}

function Jianta (tower_num, x, y) {
    this.tower_num = tower_num;
    this.image_num = 0;
    this.name = "箭塔";
    
    //繼承Tower 對象冒充繼承
    this.tower = Tower;
	this.tower(this.tower_num, this.image_num, x, y);
    
    this.level = 0;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_attr = {
        1:[20,4,3,12],
        2:[10,5,3,12],
        3:[15,6,3,12],
        4:[20,7,4,10],
        5:[25,8,4,10],
        6:[30,9,4,10],
        7:[30,10,4,8],
        8:[30,11,5,8],
        9:[30,14,5,8],
        10:[35,17,6,6],
    }
    
    this.level_up();
        
    this.attack = function (enemy_num) {
        enemies[enemy_num].hp = enemies[enemy_num].hp - this.atk;
    }
}

function Turret (tower_num, x, y) {
	this.tower_num = tower_num;
    this.image_num = 1;
    this.name = "砲塔";
    
    this.tower = Tower;
	this.tower(this.tower_num, this.image_num, x, y);
    
    this.level = 0;
    this.level_attr = {
        1:[55,28,5,65],
        2:[40,28,5,65],
        3:[40,28,6,65],
        4:[40,32,6,60],
        5:[50,32,6,60],
        6:[50,32,7,60],
        7:[50,38,7,55],
        8:[55,38,7,55],
        9:[55,42,8,55],
        10:[60,54,9,50],
    }
    
    this.level_up();
    
    this.attack = function (enemy_num) {
        enemies[enemy_num].hp = enemies[enemy_num].hp - this.atk;
        
        //範圍攻擊 range(5) 
        for (var key in enemies) {
            //已經被清除(delete)的就不用看了
            if (enemies[key] != undefined) {
                if (enemies[enemy_num].x-5 <= enemies[key].x+enemy_size['width_unit'] &&
                    enemies[enemy_num].x+5 >= enemies[key].x &&
                    enemies[enemy_num].y-5 <= enemies[key].y+enemy_size['height_unit'] &&
                    enemies[enemy_num].y+5 >= enemies[key].y && 
                    key != enemy_num) {
                    
                    enemies[key].hp = enemies[key].hp - Math.ceil(this.atk/2);
                    //範圍攻擊打死敵人
                    if (enemies[key].hp <= 0) {
                        //得到錢
                        counter['money'] = counter['money'] + enemies[key].drop_money;
                        //清除敵人
                        delete enemies[key];
                        //更新狀態欄
                        status_menu();
                    }
                }
            }    
        }
    }
}

function Ice (tower_num, x, y) {
	this.tower_num = tower_num;
    this.image_num = 2;
    this.name = "冰塔";
    
    this.tower = Tower;
	this.tower(this.tower_num, this.image_num, x, y);
    
    this.level = 0;
    this.level_attr = {
        1:[35,7,4,25],
        2:[20,7,4,25],
        3:[20,9,5,23],
        4:[25,9,5,23],
        5:[25,11,5,23],
        6:[30,11,6,21],
        7:[30,13,6,21],
        8:[35,13,6,19],
        9:[35,17,7,19],
        10:[45,21,7,15],
    }
    
    this.level_up();
    
    this.attack = function (enemy_num) {
        enemies[enemy_num].hp = enemies[enemy_num].hp - this.atk;
        
        //不能緩速太久
        if (enemies[enemy_num].loop_move > -10) {
            //減速度
            enemies[enemy_num].loop_move -= 10 + this.level; 
        }
    }
}

//子彈控制類
function Bullet(bullet_num, tower_num, enemy_num) {
	this.bullet_num = bullet_num;
	this.tower_num = tower_num;
	this.enemy_num = enemy_num;

    this.x = towers[this.tower_num].x;
    this.y = towers[this.tower_num].y;

    //圖片資料
    this.image_bullet = get_image['bullet'];
	this.size = unit;
	
	this.draw = function () {
        //子彈移動
		if (this.x > enemies[this.enemy_num].x) {
			this.x--;
		}
		else if (this.x < enemies[this.enemy_num].x){
			this.x++;
		}
		
		if (this.y > enemies[this.enemy_num].y) {
			this.y--;
		}
		else if (this.y < enemies[this.enemy_num].y){
			this.y++;
		}

        canvas_block['play_area']['context'].drawImage(this.image_bullet,
                                                       towers[this.tower_num].image_num*unit,
                                                       0,
                                                       this.size,
                                                       this.size,
                                                       this.x*unit,
                                                       this.y*unit,
                                                       this.size,
                                                       this.size);	
	}
	
	this.working = function () {
		//如果敵人先死的話要清除子彈
        if (enemies[this.enemy_num] != undefined) {   
            this.draw();
    
            //打中了
            if (this.x == enemies[this.enemy_num].x && this.y == enemies[this.enemy_num].y) {
                towers[this.tower_num].attack(this.enemy_num);
                
                //打死敵人
                if (enemies[this.enemy_num].hp <= 0) {
                    //得到錢
                    counter['money'] = counter['money'] + enemies[this.enemy_num].drop_money;
                    //清除敵人
                    delete enemies[this.enemy_num];
                    //更新狀態欄
                    status_menu();
                }
                
                delete bullets[this.bullet_num];
            }
        }
        else {
            delete bullets[this.bullet_num];
        }
	}
}