var H,W,margin_top,margin_left,R;
var nowTime;

var balls = [];
var color = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	W = document.body.clientWidth;
	H = document.body.clientHeight;
	margin_left = Math.round(W/10);
	margin_top = Math.round(H/5);
	R = parseInt(W * 4 / 5 / 108) - 1;

	canvas.width = W;
	canvas.height = H;
	nowTime = getnowTime();
	setInterval(
		function(){
			render( context );
			update();
		},50
	);

}

function getnowTime(){
	var Time = new Date();
	var ret = Time.getHours()*3600 + Time.getMinutes() * 60 + Time.getSeconds();
	return ret;
}

function update(){
	var newTime = new Date;
	var newHours = newTime.getHours();
	var newMin = newTime.getMinutes();
	var newSec = newTime.getSeconds();

	var nowHours = parseInt(nowTime / 3600);
	var nowMin = parseInt((nowTime - nowHours * 3600)/60);
	var nowSec = parseInt(nowTime % 60);
	
	if(nowSec != newSec){
		if(parseInt(newHours/10) != parseInt(nowHours/10)){
		 	addballs(margin_top , margin_left ,parseInt(nowHours/10));
		}
		if(parseInt(newHours%10) != parseInt(nowHours%10)){
			addballs(margin_top , margin_left + 15*(R + 1), parseInt(newHours%10));
		}
		if(parseInt(newMin/10) != parseInt(nowMin/10)){
		 	addballs(margin_top , margin_left + 39*(R + 1),parseInt(newMin/10));
		}
		if(parseInt(newMin%10) != parseInt(nowMin%10)){
		 	addballs(margin_top , margin_left + 54*(R + 1),parseInt(newMin%10));
		}
		if(parseInt(newSec/10) != parseInt(nowSec/10)){
		 	addballs(margin_top , margin_left + 78*(R + 1),parseInt(newSec/10));
		}
		if(parseInt(newSec%10) != parseInt(nowSec%10)){
		 	addballs(margin_top , margin_left + 93*(R + 1),parseInt(newSec%10));
		}
		nowTime = getnowTime();
	}
	updateballs();
}

function updateballs () {
	for(var i = 0 ; i < balls.length ; i ++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y + R >= H){
			balls[i].y = H - R;
			balls[i].vy = -balls[i].vy*0.65;
		}
	}
	var j = 0;
	for(var i = 0 ; i < balls.length ; i ++){
		if(balls[i].x + R > 0 && balls[i].x - R < W){
			balls[j++] = balls[i];
			if(j > 300)j = 300;
		}
	}
}

function addballs (y,x,num) {
	for(var i = 0 ; i < digit[num].length ;i ++){
		for(var j = 0 ; j < digit[num][i].length ; j ++){
			if(digit[num][i][j] == 1){
				var ball = {
					x : x + j * 2 * (R + 1) + (R + 1),
					y : y + i * 2 * (R + 1) + (R + 1),
					g : 4 + Math.random(),
					vx: Math.pow(-1,Math.ceil( Math.random()*1000)) * 4,
					vy: -5,
					color:color[Math.floor(Math.random()*color.length)]
				}
				balls.push(ball);
			}
		}
	}
}
	


function render(context){
	context.clearRect(0,0,W,H);

	var hours = parseInt(nowTime/3600);
	var minutes = parseInt((nowTime-hours*3600)/60);
	var seconds = nowTime%60;

	renderDigit(margin_top,margin_left,parseInt(hours/10),context);
	renderDigit(margin_top,margin_left + 15*(R + 1),parseInt(hours%10),context);
	renderDigit(margin_top,margin_left + 30*(R + 1),10,context);
	renderDigit(margin_top,margin_left + 39*(R + 1),parseInt(minutes/10),context);
	renderDigit(margin_top,margin_left + 54*(R + 1),parseInt(minutes%10),context);
	renderDigit(margin_top,margin_left + 69*(R + 1),10,context);
	renderDigit(margin_top,margin_left + 78*(R + 1),parseInt(seconds/10),context);
	renderDigit(margin_top,margin_left + 93*(R + 1),parseInt(seconds%10),context);

	for(var i = 0 ; i < balls.length ; i ++){
		context.fillStyle = balls[i].color;

		context.beginPath();
		context.arc(balls[i].x , balls[i].y, R , 0 , 2*Math.PI);
		context.closePath();

		context.fill();
	}
}

function renderDigit(y,x,num,context){
	context.fillStyle = "rgb(0,125,153)";

	for(var i = 0 ; i < digit[num].length ; i ++){
		for(var j = 0 ; j < digit[num][i].length ; j ++){
			if(digit[num][i][j] == 1){
				context.beginPath();
				context.arc(x + j * 2 * (R + 1) + (R + 1) , y + i * 2 * (R + 1) + (R + 1) , R , 0 , 2*Math.PI);
				context.closePath();

				context.fill();
			}
		}
	}
}
