//解析地圖
draw_map();
function draw_map() {
    var back_ground = document.getElementById("back_ground");
    //每個區塊為32x32
    var block = 32;
    //跑迴圈組地圖
	var i,j
	//迴圈轉字串 組成值傳到 back_ground 取得是否可通行的資料
	var str_i,str_j
    //字串轉數字 取得切圖的資料
	var int_i,int_j
	
    for(i = 0; i < 25; i++ ) {       //x軸
        for (j = 0; j < 12; j++ ) {  //y軸
            //補0 i exp 0012
            if (i < 10) {
                str_i = "0"+i;
            }
            else {
                str_i = ""+i;
            }
            //補0 j
            if (j < 10) {
                str_j = "0"+j; 
            }
            else {
                str_j = ""+j;
            }
			//取得資料
			int_i = parseInt(tristram["map_date"][j][i].substr(0,2));
			int_j = parseInt(tristram["map_date"][j][i].substr(2,2));
			
			//alert("back_ground:"+str_i+str_j+"\n x:"+int_i+"y"+int_j);
            //畫地圖
            ground_pass_area.drawImage(back_ground, int_i*block, int_j*block, block, block, i*block, j*block, block, block);
        }
    }
}