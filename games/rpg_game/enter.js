//有輸入的時候 鍵盤 滑鼠 等
//按鍵事件
document.onkeydown = function(event){
    //alert('鍵盤碼:'+event.keyCode);
    switch (window.event.keyCode) {
		//按鍵移動
		case 40:
			hero.move_down();
		break;
		case 37:
			hero.move_left();
		break;
		case 39:
			hero.move_right();
		break;
		case 38:
			hero.move_up();
		break;
		//按鍵普通攻擊
		
		//按鍵技能攻擊
		
		//按鍵對話
		case 32:
			hero.dialo();
		break;
    }
}
