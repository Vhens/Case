  $(function () {
            var W = $(window).width(),
                H = $(window).height(),
                x2 = -15, len = 30, count = 100;
            var canvas = document.getElementById("snow");
            canvas.width = W;
            canvas.height = H;
            var ctx = canvas.getContext('2d');

            setInterval(clearCanvas,100);
            function clearCanvas() {
                ctx.clearRect(0, 0, W, H);
                draws();
            }

            function draw(x, y) {
                //canvas写渐变：createLinearGradient（startX,startY,endX,endY）
                var grd = ctx.createLinearGradient(x, y, x + x2, y + len);
                grd.addColorStop(0, "rgba(0,0,0,0)");
                grd.addColorStop(0.5, "rgba(105,105,105,1)");
                grd.addColorStop(1, "rgba(255,255,255,1)");
                ctx.strokeStyle = grd;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + x2, y + len);
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            }
            function draws() {
                for (var i = 1; i <= count; i++) {
                    console.log(i)
                    draw(Math.random() * W, Math.random() * H);
                }
            }
        });