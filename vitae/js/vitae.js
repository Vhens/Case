(function(){
    var bg_h=$(window).height();
    $('.information,.about,.technology,.project,.contact,#myBg').css('height',bg_h);
    $('#tagsList .item').hover(function(){
        $(this).css('color','#'+numRadom());
    },function(){
         $(this).css('color','#fff');
    })
     // $('#tagsList .item').on('click',function(){
     //    alert(1)
     // })
    //随机6位数
    function numRadom(){
        var num="";
        for(var i=0;i<6;i++){
            num+=Math.floor(Math.random()*10);
        }
        return num;
    }
})();