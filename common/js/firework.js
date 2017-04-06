"use strict";
(function(){
   var cvs=document.querySelector("#fire"),
       g=cvs.getContext("2d"),
       _W=window.innerWidth,
       _H=window.innerHeight,
       gravity=0.1,
       minNum=3,
       fireworks=[],
       cvs2=document.createElement("canvas"),
       g2=cvs2.getContext("2d"),
       img=new Image();

       cvs2.width=_W;
       cvs2.height=_H;
       g2.globalAlpha=0.2;
       img.onload=function(){
         g2.drawImage(img,0,0,img.width,img.height,0,0,_W,_H);
         drawFrame();
       };

       img.src="images/firework_bg.jpg";



   window.run=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(fn){
         return setTimeout(fn,16.6666);
       };


       function Laster(x0,y0,x1,y1){
         this.x0=x0;
         this.y0=y0;
         this.x1=x1;
         this.y1=y1;
         this.angle=Math.atan2(y1-y0,x1-x0),
         this.cos=Math.cos(this.angle);
         this.sin=Math.sin(this.angle);
         this.color=this.getColor();
       }

       Laster.prototype.speed=10;
       Laster.prototype.render=function(g){
         g.beginPath();
           g.moveTo(this.x0,this.y0);
           this.speed+=0.3;
           this.x0+=this.cos*this.speed;
           this.y0+=this.sin*this.speed;
           g.lineTo(this.x0,this.y0);
           g.strokeStyle=this.color;
           g.stroke();
         g.closePath();

         return Math.abs(this.x0-this.x1)>1&&this.y0>this.y1;
       };
       Laster.prototype.getColor=function(){
         var color=["hsl("];
          color[1]=Math.random()*360|0;
          color[2]=",";
          color[3]="80%,50%)";
         return color.join("");
       };

       function Firework(x0,y0,x,y){
         this.particles=[];
         this.isEmit=true;
         this.laster=new Laster(x0,y0,x,y);
         var i=(Math.random()*30+20)|0;
         while(i--)
         {
           this.particles.push({
             x:x,
             y:y,
             vx:Math.random()*12-6,
             vy:Math.random()*12-9,
             opacity:1,
             vo:Math.random()*0.01+0.01
           });
         }
       }

       Firework.prototype.render=function(g){
         if(this.isEmit)
         {
           this.isEmit=this.laster.render(g);
           return true;
         }
         else
         {
           var color=this.getColor(),isRemove=false;
           this.particles.forEach(function(particle){
             particle.opacity-=particle.vo;
             if(particle.opacity<0)
             {
               arguments[2].splice(arguments[1],1);
               isRemove=true;
             }
             else
             {
                g.beginPath();
                g.moveTo(particle.x,particle.y);
                particle.x+=particle.vx;
                particle.vy+=gravity;
                particle.y+=particle.vy;
                color[4]=particle.opacity
                g.strokeStyle=color.join("");
                g.lineTo(particle.x,particle.y);
                g.stroke();
                g.closePath();
             }
           });
           color=null;
         }
         return isRemove?this.particles.length>0:true;
       };

       Firework.prototype.getColor=function(){
         var color=["hsla("];
          color[1]=Math.random()*360|0;
          color[2]=",";
          color[3]="100%,50%,";
          color[4]=1;
          color[5]=")";
         return color;
       };

       cvs.width=_W;
       cvs.height=_H;
       g.lineWidth=2;


       function drawFrame(){
         g.beginPath();
         g.drawImage(cvs2,0,0);

         fireworks.forEach(function(firework){
           if(!firework.render(g))
           {
             arguments[2].splice(arguments[1],1);
           }
         });
         if(fireworks.length<minNum)
         {
           fireworks.push(new Firework(_W*0.3+Math.random()*_W*0.4,_H,Math.random()*_W,Math.random()*_H*0.6));
         }

         run(drawFrame);
       }

       document.addEventListener("click",function(e){
          fireworks.push(new Firework(_W*0.3+Math.random()*_W*0.4,_H,e.clientX,e.clientY));
       },false);

       window.addEventListener("resize",function(){
         cvs.width=cvs2.width=_W=this.innerWidth;
         cvs.height=cvs2.height=_H=this.innerHeight;
         g2.drawImage(img,0,0,img.width,img.height,0,0,_W,_H);
       },false);
})();