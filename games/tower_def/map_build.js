//解析地圖並且畫出來
draw_back_ground("map_01")
function draw_back_ground(map_no) {
    alert(this[map_no]["back_ground"]);
    
    for(i = 0; i < play_unit_x; i++ ) {       //x
        for(j = 0; j < play_unit_y; j++ ) {   //y

            back_ground.drawImage(image_back_ground, 0*unit, 0*unit, 16, 16, i*unit, j*unit, 32, 32);
        }
    }
}