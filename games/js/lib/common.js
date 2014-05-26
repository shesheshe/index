/*
* 回傳隨機數
*/
function usefloor(min, max) {
	return Math.floor(Math.random() * (max-min+1) + min);
}