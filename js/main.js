const app = new PIXI.Application(800,600);
/*
 *容器对象，可存放显示对象，其实app.stage本身就是一个container。
 *使用container存放各自界面的显示元素，即一个container一个界面。
 *主要使用 Container.addChild 和 Container.removeChild 方法控制界面上显示对象的展示。
 */
const containerMenu = new PIXI.Container();
const containerMain = new PIXI.Container();
const style = {
  fontFamily: 'Arial',
  fontSize: 40,
  fontWeight: 'bold',
  fill:'#ffffff',
  // 描边
  stroke: '#4a1850',
  // 描边宽度
  strokeThickness: 4,
  // 字体阴影
  dropShadow: true,
  // 阴影颜色
  dropShadowColor: '#0000ee',
  dropShadowBlur: 4,
  // 阴影倾斜
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
};  //文本字体样式
const menuItem0 = new PIXI.Text('1、介绍',style);
const menuItem1 = new PIXI.Text('2、地图',style);
const menuItem2 = new PIXI.Text('3、要闻',style);
const bg = new PIXI.Sprite.fromImage('res/bg.png');
const intro = new PIXI.Sprite.fromImage('res/intro.jpg');
const news = new PIXI.Sprite.fromImage('res/news.jpeg');
const closeBtn = new PIXI.Sprite.fromImage('res/close.png');
const closeShowcase = new PIXI.Sprite.fromImage('res/close.png');
const next = new PIXI.Sprite.fromImage('res/next.png');
const pre = new PIXI.Sprite.fromImage('res/pre.png');
var nations = [];   //国家数组，存放国家国旗，每个元素都是一个Sprite对象。
/*
 *遍历读取资源
 */
for(let i = 0; i < 6; i++){
  nations.push(new PIXI.Sprite.fromImage('res/flag' + i + '.jpeg'));
  nations[i].width = 200;
  nations[i].height = 120;
  nations[i].buttonMode = true;
  nations[i].interactive = true;
  nations[i].on('click', changeId);
}
var goods = []; //商品数组，每个元素为各国家的商品数组，其中每个元素为一个Texture对象。
for(let i = 0; i < 2; i++){
  var good = [];
  for(let j = 0; j < 4; j++)good.push(new PIXI.Texture.fromImage('res/nation' + i + '_' + j + '.jpeg'));
  goods.push(good);
}
const showcase = new PIXI.Sprite.fromImage('res/nation0_0.jpeg');
/*
 *通过currentNation 和 currentGood 变量控制显示对象showcase的texture。
 */
var currentNation = 0;
var currentGood = 0;
/*
 *各显示对象的参数设置
 */
menuItem0.x = 300;
menuItem0.y = 130;

menuItem1.x = 300;
menuItem1.y = 280;

menuItem2.x = 300;
menuItem2.y = 430;

intro.width = 800;
intro.height = 600;

news.height = 600;
news.height = 600;
news.x = 80;

closeBtn.width =  60;
closeBtn.height =  60;
closeBtn.buttonMode = true;
closeBtn.interactive = true;

closeShowcase.width =  60;
closeShowcase.height =  60;
closeShowcase.buttonMode = true;
closeShowcase.interactive = true;
closeShowcase.on('click', closeShow);

next.width = 60;
next.height = 60;
next.x = 450;
next.y = 470;
next.buttonMode = true;
next.interactive = true;
next.on('click', nextGood);

pre.width = 60;
pre.height = 60;
pre.x = 250;
pre.y = 470;
pre.buttonMode = true;
pre.interactive = true;
pre.on('click', preGood);

menuItem0.buttonMode = true;
menuItem0.interactive = true;
menuItem0.on('click',toIntro);

menuItem1.buttonMode = true;
menuItem1.interactive = true;
menuItem1.on('click',toMap);

menuItem2.buttonMode = true;
menuItem2.interactive = true;
menuItem2.on('click',toNews);

containerMenu.addChild(menuItem0);
containerMenu.addChild(menuItem1);
containerMenu.addChild(menuItem2);

showcase.width = 600;
showcase.height = 320;
showcase.x = 100;
showcase.y = 50;

document.body.appendChild(app.view);
app.stage.addChild(bg);
app.stage.addChild(containerMenu);
// app.stage.addChild(containerMain);


function toIntro(){
  containerMenu.addChild(intro);
  intro.addChild(closeBtn);
  closeBtn.on('click',closeIntro);
}

function toMap(){
  app.stage.removeChild(containerMenu);
  app.stage.addChild(containerMain);
  containerMain.addChild(closeBtn);
  closeBtn.on('click',closeMap);
  for(let i = 0; i < 6; i++){
    containerMain.addChild(nations[i]);
    nations[i].x = i < 3 ? 80 : 520;
    nations[i].y = i % 3 * 180 + 60;
  }
}

function toNews(){
  containerMenu.addChild(news);
  news.addChild(closeBtn);
  closeBtn.on('click',closeNews);
}

function closeIntro(){
  containerMenu.removeChild(intro);
}

function closeNews(){
  containerMenu.removeChild(news);
}

function closeMap(){
  app.stage.removeChild(containerMain);
  app.stage.addChild(containerMenu);
}

function show(){
  containerMain.addChild(showcase);
  changeGood();
  showcase.addChild(closeShowcase);
  containerMain.addChild(next);
  containerMain.addChild(pre);
}

function changeId(){
  currentNation = containerMain.getChildIndex(this) - 1;
  show();
}

function changeGood(){
  showcase.texture = goods[currentNation][currentGood];
}

function closeShow(){
  containerMain.removeChild(showcase);
  containerMain.removeChild(next);
  containerMain.removeChild(pre);
}

function nextGood(){
  currentGood = (currentGood + 1) % 4;
  changeGood();
}

function preGood(){
  currentGood--;
  if(currentGood == -1)currentGood = 3;
  changeGood();
}