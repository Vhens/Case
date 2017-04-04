    $(function(){
        var btn_index=0;
        /*右边按钮点击*/
        $('.cricle li').each(function(index) {
            $(this).click(function(){
                btn_index=index;
                scroller();
            })
        });
        /*翻页按钮点击*/
        // $('.go-btn').one('click',btn_go);
        // function btn_go(){
        //     go_up();scroller();
        //     setTimeout(function(){$('.go-btn').one('click',btn_go)},1000)
        // };
        /*响应鼠标*/
        $('.wrapper').one('mousewheel',mouse_);
        function mouse_(event){
            if (event.deltaY<0) {go_up()}
            else{go_down()}
            scroller();
            setTimeout(function(){$('.wrapper').one('mousewheel',mouse_)},1000)
        };

        /*当前页面赋值*/
        function go_up(){btn_index++;if(btn_index==$('.cricle li').length){btn_index=$('.cricle li').length-1};}
        function go_down(){btn_index--;if(btn_index<0){btn_index=0};}

        /*页面滑动*/
        function scroller(){
            $('.cricle li').eq(btn_index).addClass('cur').siblings().removeClass('cur');
            $('.wrapper').attr("class","wrapper").addClass(function() {
                    return "put-section-"+btn_index;
             }).find('.page').eq(btn_index).find('.title').addClass('cur');
        };

        /*响应键盘上下键*/
        $(document).one('keydown',keyaction);
        function keyaction(event){
            var e=event||window.event;
            var key=e.keyCode||e.which||e.charCode;
            switch(key) {
                case 38: go_down();scroller();
                break;
                case 40: go_up();scroller();
                break;
            };
            setTimeout(function(){$(document).one('keydown',keyaction)},1000)
        }


    })
