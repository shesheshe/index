//碰撞檢測陣列
var map = [];
//有24行每行要宣告
for (j = 0; j < play_area_j; j++ ) {
    map[j] = [];
            
}

//解析地圖並且畫出來
function draw_map_ground(map_no) {
    var image_object = document.getElementById("image_object");
    var back_ground = this[map_no]["map_ground"]["back_ground"];

	//迴圈轉字串 組成值傳到 cover_ground
	var str_i,str_j;
    //字串轉數字 取得切圖的資料
	var int_i,int_j;
    //取得設定值
    var image_object_set;
    
    for(j = 0; j < play_area_j; j++ ) {        //y軸    
        for (i = 0; i < play_area_i; i++ ) {   //x軸
            //補0 j
            j < 10 ? str_j = "0"+j: str_j = ""+j;
            //補0 i 
            i < 10 ? str_i = "0"+i: str_i = ""+i;
            //取得資料
            if (this[map_no]["map_ground"]["cover_ground"]["M"+str_j+str_i]) {
                int_j = parseInt(this[map_no]["map_ground"]["cover_ground"]["M"+str_j+str_i].substr(1,2));            
                int_i = parseInt(this[map_no]["map_ground"]["cover_ground"]["M"+str_j+str_i].substr(3,2));
                image_object_set = image_object_code[this[map_no]["map_ground"]["cover_ground"]["M"+str_j+str_i]];
            }
            else {
                int_j = parseInt(back_ground.substr(1,2));
                int_i = parseInt(back_ground.substr(3,2));
                image_object_set = image_object_code[back_ground];
            }

            //階層畫圖 1 or 3
            switch (image_object_set[1]) {
                case 1:
                    play_area_01.drawImage(image_object, int_i*unit, int_j*unit, unit, unit, i*unit, j*unit, unit, unit);	
				break;
                case 3:
                    play_area_03.drawImage(image_object, int_i*unit, int_j*unit, unit, unit, i*unit, j*unit, unit, unit);
				break;
            }
            
			if (image_object_set[0] != 0) {
				map[j][i] = "ground";
			}
			else {
				map[j][i] = image_object_set[0];
			}
			
			//輔助功能
			//play_area_03.fillText(image_object_set[0],i*unit, j*unit+unit/2);	
        }    
    }
}

var map_ani = []

//畫出地圖上的人或怪物
function draw_map_ani(map_no) {
	//迴圈產出ani
	for(var key in this[map_no]["map_ani"]){ 
		map_ani[key] = new People ("map_ani["+key+"]", 
						           this[map_no]["map_ani"][key][1], 
						           this[map_no]["map_ani"][key][2], 
						           this[map_no]["map_ani"][key][3], 
						           this[map_no]["map_ani"][key][4],
						           this[map_no]["map_ani"][key][5], 
						           this[map_no]["map_ani"][key][0], 
						           this[map_no]["map_ani"][key][6], 
						           this[map_no]["map_ani"][key][7],
						           this[map_no]["map_ani"][key][8]);
    }
}