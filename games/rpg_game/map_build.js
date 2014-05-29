//解析地圖
draw_map();
function draw_map() {
    var back_ground = document.getElementById("back_ground");
    //每個區塊為32x32
    var block = 32;
    var i,j,str_i,str_j
    
    for(i = 0; i < 25; i++ ) {
        for (j = 0; j < 12; j++ ) {
            //補0 exp 0012
            if (i < 10) {
                str_i = "0"+i;
            }
            else {
                str_i = ""+i;
            }
            
            if (j < 10) {
                str_j = "0"+j; 
            }
            else {
                str_j = ""+j;
            }
            
            //alert(str_i+str_j);
            //畫地圖
             ground_pass_area.drawImage(back_ground, 0*block, 0*block, block, block, i*block, j*block, block, block);
        }
    }
}