  (function(){
            var box = document.getElementById("wrapper");
            var cricle = document.getElementById("cricle");
            var oDiv = document.getElementById("pageBox");
            var divs = document.getElementsByClassName("page");
            var h = document.documentElement.clientHeight || document.body.clientHeight;

            var i = 0; //计数器
            var timer = null; //定时器
            var going = false; //判断动画是否在执行，有为true，无为false;
            var delay = 0; //防止滚轮重复执行，
            //鼠标点击切换
            var ols =cricle.getElementsByTagName("li");
            //          alert(ols.length)
            for(var k = 0; k < ols.length; k++) {
                ols[k].index = k;//绑定索引
                ols[k].onclick = function() {
//                  alert(this.index);
                    i = this.index;
                    autoplay();
                }
            }

            function wp() {
                for(var i = 0; i < divs.length; i++) {
                    divs[i].style.height = h + "px";
                }
                box.style.height = h + "px";
            }
            wp();
            window.onresize = function() { //监听窗口变化事件
            wp();
            }
            document.getElementById('bottom-arrow').onclick=function(){
               wp();
              top()
            }
            if(document.addEventListener) { //火狐滚轮监听事件
                document.addEventListener('DOMMouseScroll', gun, false);
            }
            window.onmousewheel = document.onmousewheel = gun; //谷歌和IE滚轮监听事件

            function gun(e) {
                e = e || window.event;
                if(e.wheelDelta) { //谷歌IE判断
                    if(e.wheelDelta > 0) { //向上滚了
                        //console.log(e.wheelDelta);
                        top();
                    } else if(e.wheelDelta < 0) { //向下滚了
                        //console.log(e.wheelDelta);
                        down();
                    }
                } else {
                    //火狐的滚轮事件判断，正好和谷歌IE的相反
                    if(e.detail > 0) { //向下滚了
                        //console.log(e.detail)
                        down();
                    } else if(e.detail < 0) { //向上滚了
                        //console.log(e.detail)
                        top();
                    }
                }

            }
            //向上滚动方法判断
            function top() {
                    if(delay < 1) {
                        clearInterval(timer);
                        timer = setInterval(function() {
                            delay++;
                        }, 100)
                    } else if(!going) {
                        going = true;
                        i--;
                        if(i < 0) {
                            i = 0;
                        }
                        autoplay();
                    }
                }
                //向下滚动方法判断
                function down() {
                    if(delay < 1) {
                        clearInterval(timer);
                        timer = setTimeout(function() {
                            delay++;
                        }, 100)
                    } else if(!going) {
                        going = true;
                        i++;
                        if(i > divs.length - 1) {
                            i = divs.length - 1;
                        }
                        autoplay();
                    }
                }
            //滚动方法,动画
            function autoplay() {
                //用于设置滚动方向
                var direction = 1;
                var target = box.offsetHeight * i;
                var distance = Math.abs(target + oDiv.offsetTop);
                //判断滚动方法，并设置相应的滚动方向是+还是—
                if(target + oDiv.offsetTop < 0) {
                    direction = -1;
                }
                //设置滚动速度
                var speed = distance / 40;
                var remainDis = distance;
                //运动定时器
                var gotimer = setInterval(function() {
                    oDiv.style.top = oDiv.offsetTop - speed * direction + "px";
                    remainDis -= speed;
                    if(remainDis <= 40) {
                        clearInterval(gotimer);
                        oDiv.style.top = -target + "px";
                        going = false;
                        delay = 0;
                        cricle.getElementsByClassName("cur")[0].className = "";
                        cricle.getElementsByTagName("li")[i].className = "cur";
                    }
                }, 8);
            }
  })();
