/*
* 模板建立
*/
function tmpl(id, data){

	var html = document.getElementById(id).innerHTML;

	var result = 
		"var p=[];with(obj){p.push('"
		+ 
		html.replace(/[\r\n\t]/g," ")
		.replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
		.replace(/<%/g, "');")
		.replace(/%>/g, "p.push('")
		+
		"');}return p.join('');";
			
	var fn = new Function("obj", result);

	return fn(data);
	
	//輸出結果
	/*function anonymous(obj) {
		var p = [];
		with(obj) { 
			console.log(obj); 
			p.push('         <ul>             '); 
			for ( var i = 0; i < users.length; i++ ) { 
				p.push('             <li><a href="');
				p.push(users[i].url);
				p.push('">');
				p.push(users[i].name);
				p.push('</a></li>             '); 
			} 
			p.push('         </ul>       ');} 
			console.log(p); 
			return p.join('');
	}*/	
	
}