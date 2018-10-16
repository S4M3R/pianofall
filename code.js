var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var FPS = 60, restarted = true;
var game = {
  width: 500,
  height: 300,
  floor: 275
}
var time = [0,0,0,0,0];
var stop = true;
var pianos = [{x:40,y:-50}];
var coins = [{x:0,y:-50}];
var player = {
  width: 10,
  height: 25,
  puntos: 0,
  x: 250,
  y: 200,
  speedX: 0,
  speedY: 0,
  moverX: 0,
  moverY: 0
}

setInterval(() => {
  hitboxCoin();
  if(!stop){
    logicaPlayer();
    logicaPianos();
    logicaCoin();
  }
  borrarCanvas();
  dibujarEntorno();
  dibujarTimer();
  drawCoin();
  dibujarPersonaje(player.x,player.y);
  dibujarPianos();
  dibujarHUD();
  if(stop){
    dibujarPausa();
  }else if (restarted) {
    restarted = false;
    time = [0,0,0,0,0];
    player.puntos = 0;
  }
  // escribirStats();
},1000/FPS)

setInterval(() => {
  if(!stop){
    time[0]++;
    if(time[0]> 99){
      time[1]++;
      time[0] -= 100;
    }
    if(time[1]>59){
      time[2]++;
      time[1]-=60;
    }
    if(time[2]>59){
      time[3]++;
      time[2]-=60;
    }
    if(time[3]>23){
      time[4]++;
      time[3]-=24;
    }
  }
},10)
var imgPlayer = new Image();
var imgPiano = new Image();
var imgCoin = new Image();
var imgGrass = new Image();
var imgPlay = new Image();
var imgPause = new Image();
var imgNumsVerde = new Image();
var imgTimer = new Image();
var imgNumsBlanco = new Image();
var imgWarning = new Image();
var imgPressKey = new Image();
imgPressKey.src = "img/press-any-key.png";
imgWarning.src = "img/warning.png"
imgNumsBlanco.src = "img/numsBlanco.png"
imgTimer.src ="img/timer.png"
imgNumsVerde.src = "img/numsVerde.png"
imgPause.src = "img/pause.png"
imgPlay.src = "img/play.png"
imgGrass.src = "img/grass.png"
imgCoin.src = "img/coin.png"
imgPiano.src = "img/piano.png"
imgPlayer.src = "img/player.png";

var dibujarEntorno = () => {
  dibujarFondo();
  // dibujarPiso(0,game.floor,game.width,game.height);
  for (var i = 0; i < game.width/25; i++) {
    ctx.drawImage(imgGrass,i*25,game.floor,25,25);
  }
}

var borrarCanvas = () =>{
  canvas.height = game.height;
  canvas.width = game.width;
}

var escribirStats = () => {
  ctx.font = "10px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Stats",10,10);
  ctx.fillText("x: "+player.x,10,20);
  ctx.fillText("y: "+player.y,10,30);
  ctx.fillText("puntos: "+player.puntos,10,40);
}

var dibujarFondo = () => {
  ctx.beginPath();
  ctx.rect(0, 0, game.width, game.height);
  ctx.fillStyle = "skyblue";
  ctx.fill();
  ctx.drawImage(imgTimer,5,game.floor-40,128,40);
  ctx.drawImage(imgWarning,game.width-100,game.floor-92);
  ctx.drawImage(imgCoin,10,10);
}

var dibujarPiso = (startX,startY,endX,endY) => {
  ctx.beginPath();
  ctx.rect(startX, startY, endX, endY);
  ctx.fillStyle = "green";
  ctx.fill();
}

var dibujarPersonaje = (x,y) => {
  // ctx.beginPath();
  // ctx.rect(x, y, player.width, player.height);
  // ctx.fillStyle = "red";
  // ctx.fill();
  ctx.drawImage(imgPlayer,x,y,player.width,player.height);
}

var logicaPlayer = () => {
  player.x += player.speedX + player.moverX
  if(player.y+player.height > game.floor || player.moverY+player.y+player.height > game.floor){
    player.speedY = player.moverY;
    player.y = game.floor-player.height;
  }else if(player.y+player.height < game.floor){
    player.y += player.speedY;
    player.moverY = 0;
  }else{
    player.speedY = player.moverY;
    player.y += player.speedY;
    player.moverY = 0;
}
  //gravedad
  if(player.y+player.height < game.floor){
    player.speedY += 1.5;
  }
  //bordes
  if(player.x < 0){
    player.speedX = 0;
    player.x = 0;
  }else if(player.x+player.width > game.width){
    player.speedX = 0;
    player.x = game.width-player.width;
  }

}

var dibujarPianos = () => {
  for(var i = 0;i < pianos.length;i++){
    // ctx.beginPath();
    // ctx.rect(pianos[i].x, pianos[i].y, 25, 50);
    // ctx.fillStyle = "black";
    // ctx.fill();
    ctx.drawImage(imgPiano,pianos[i].x,pianos[i].y,25,50);
  }
}
var logicaPianos = () => {
  for(var i = 0;i < pianos.length;i++){
    if(pianos[i].y > game.height+50){
        if(random(100) > 99){
        pianos[i] = {y:-52,x:random(game.width)};
      }

    }else if(pianos.length < (player.puntos/3)+3){
      pianos.push({y:-52,x:random(game.width)})
    }
    pianos[i].y += 1;
  }

}

var logicaCoin = () => {
  for (var i = 0; i < coins.length; i++) {
    coins[i].y += 3;
    if(coins[i].y > game.height + 10){
      coins[i] = {y:-30,x:random(game.width)};
    }
  }
}

var drawCoin = () => {
   for (var i = 0; i < coins.length; i++) {
     // ctx.beginPath();
     // ctx.rect(coins[i].x, coins[i].y, 20, 20);
     // ctx.fillStyle = "gold";
     // ctx.fill();
     ctx.drawImage(imgCoin,coins[i].x,coins[i].y,20,20);
   }
}

var hitboxCoin = () => {
  for (var i = 0; i < coins.length; i++) {
    if(coins[i].y < player.y + player.height && coins[i].y+20 > player.y){
      if(coins[i].x < player.x + player.width && coins[i].x+20 > player.x){
        coins[i] = {y:-30,x:random(game.width-10)};
        player.puntos +=1;
      }
    }
  }
  for (var i = 0; i < pianos.length; i++) {
    if(pianos[i].y+3 < player.y + player.height && pianos[i].y+48 > player.y){
      if(pianos[i].x+3 < player.x + player.width && pianos[i].x+22 > player.x){
        pianos[i] = {y:-30,x:random(game.width-10)};
        restart();
      }
    }
  }
}

var random = (max) => {
  return Math.floor(max*Math.random())+1;
}

var restart = () => {
  player.x = 250;
  player.y = 200;
  player.moverX = 0;
  pianos = [{y:-52,x:random(game.width)}];
  coins = [{x:40,y:-50}];
  stop = true;
  restarted = true;
}
var pausa = () => {
  stop = true;
}
var play = () => {
  stop = false;
}

var dibujarHUD = () => {
  if(!stop){
    // ctx.font = "30px Arial";
    // ctx.fillStyle = "white";
    // ctx.fillText("||",game.width-30,30);
    ctx.drawImage(imgPause,game.width-40,8,25,25);
  }else{
    // ctx.font = "30px Arial";
    // ctx.fillStyle = "white";
    // ctx.fillText(">",game.width-30,30);
    ctx.drawImage(imgPlay,game.width-40,8,25,25);
  }
  var aux = player.puntos.toString().split('');
  dibujarArrayBlanco(35,10,aux,0);
}
var dibujarTimer = () =>{
  // ctx.drawImage(imgTimer,5,game.floor-40,128,32);
  var a = 105;
  var aux = time[0].toString().split('');
  dibujarArrayVerde(a,game.floor-34,aux || [0],2);
  a-=25;
  dibujarPuntosVerde(a+18,game.floor-34);
  a-= 6;
  var aux = time[1].toString().split('');
  dibujarArrayVerde(a,game.floor-34,aux || [0],2);
  a-=25;
  dibujarPuntosVerde(a+18,game.floor-34);
  a-= 6;
  var aux = time[2].toString().split('');
  dibujarArrayVerde(a,game.floor-34,aux || [0],2);
  a-=25;
  dibujarPuntosVerde(a+18,game.floor-34);
  a-= 6;
  var aux = time[3].toString().split('');
  dibujarArrayVerde(a,game.floor-34,aux || [0],2);
  a-=25;
  if(time[4] != 0){
    var aux = time[4].toString().split('');
    dibujarPuntosVerde(a+18,game.floor-34);
    a-= 6;
    dibujarArrayVerde(a,game.floor-34,aux || [0],2);
    a-=25;
  }

}
var dibujarArrayVerde = (x,y,num,cant) => {
  num = completarArray(num,0,cant)
  for (var i = 0; i < num.length; i++) {
    ctx.drawImage(imgNumsVerde,parseInt(num[i])*11,0,11,20,x+12*i,y,11,20);
  }

}
var dibujarPuntosVerde = (x,y) => {
  ctx.drawImage(imgNumsVerde,10*11,0,6,20,x,y,6,20);
}
var dibujarArrayBlanco = (x,y,num,cant) => {
  num = completarArray(num,0,cant)
  for (var i = 0; i < num.length; i++) {
    ctx.drawImage(imgNumsBlanco,parseInt(num[i])*11,0,11,20,x+12*i,y,11,20);
  }
}
var completarArray = (array,agregar,cant) => {
  for (var i = 0; 0 > array.length-cant+i; i++) {
    array.unshift(agregar);
  }
  return array;
}

var dibujarPausa = () => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.drawImage(imgPressKey,game.width/2-150,game.height/2);
}
//Eventos

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if(evt.keyCode == 65 || evt.keyCode == 37){
       player.moverX = -6;
    }else if(evt.keyCode == 68 || evt.keyCode == 39){
      player.moverX = 6;
    }else if(evt.keyCode == 87 || evt.keyCode == 32 || evt.keyCode == 38){
      player.moverY = -15;
    }else if(evt.keyCode == 83 || evt.keyCode == 40){
      player.moverY = 15;
    }
    if(evt.keyCode == 80){
      stop = !stop;
    }else if(evt.keyCode == 82){
      restart();
    }else{
      stop = false;
    }
};
