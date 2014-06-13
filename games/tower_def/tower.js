function Arrow_tower () {
    
    this.level = 1;
    //耗費金錢,攻擊力,攻擊範圍,攻擊速度
    this.level_array = {
        1:[0,5,3,1000],2:[10,6,3,950],3:[20,7,3,900],4:[30,8,4,850],5:[40,9,4,800],
        6:[50,10,4,750],7:[60,11,5,700],8:[70,12,5,650],9:[80,13,5,600],10:[100,15,6,500]
    }
    
    this.atk;
    this.atk_range;
    this.atk_speed;
    
    this.image
}

//升等
function level_up () {
    
}