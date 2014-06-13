//橫列 直欄
var map_01 = {
    //0 => 第1欄 image_back_ground
    "back_ground" : 0,
    //route [x,y,w,h]
    "route" : {
        "start" : [0,5,3],
        "road"  : [[0,5,54,3],[51,8,3,7],[10,15,44,3],[10,18,3,7],[10,25,54,3]],
        "end"   : [62,25,3],
    },
    //每波敵人
    "enemy" : [
        [["enemy_01",10]],
        [["enemy_02",10]],
        [["enemy_01",5],["enemy_02",5]],
    ]
}

var map_02 = {
    "back_ground" : 1,
    "route" : {
        "start" : [0,5,3],
        "road"  : [[0,5,54,3],[51,8,3,7],[10,15,44,3],[10,18,3,7],[10,25,54,3]],
        "end"   : [62,25,3],
    },
    "enemy" : []
}