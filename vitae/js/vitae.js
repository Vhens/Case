(function(){
    $('#tagsList .item').hover(function(){
        $(this).css('color','#'+numRadom());
    },function(){
         $(this).css('color','#fff');
    })
     // $('#tagsList .item').on('click',function(){
     //    alert(1)
     // })
     $('.point').click(function(){
        $(this).addClass('act').siblings().removeClass('act')
        var num=$(this).index();
        $('#box-item .item').eq(num-1).show().siblings().hide()
     })
    //随机6位数
    function numRadom(){
        var num="";
        for(var i=0;i<6;i++){
            num+=Math.floor(Math.random()*10);
        }
        return num;
    }
})();