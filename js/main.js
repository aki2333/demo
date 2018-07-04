$(function(){
  $('.nav1>.nav-item>a').on('click',function(){
    var li =$(this).parent('li')
    li.addClass('nav1-active').siblings().removeClass('nav1-active')
    $(this).siblings('.nav2').show();
    li.siblings().find('.nav2').hide()
  })
  $('.nav1>.nav-item>a:first').trigger('click');
  $('.nav2').on('click','a',function(){
    var frameSrc=$(this).attr('data-url'),
        frameId=$(this).attr('data-id'),
        frameText=$(this).attr('data-text'),
        tabList=$(".tab-list li .text"),
        tabFlag=false;
        console.log("tabList:",tabList)
    tabList.each(function(){
      console.log($(this).text(),frameText)
      if($(this).text()==frameText){
        console.log("重复");
        tabFlag=true;
        return false
      }
    })
    if(!frameSrc){
      return
    }else if(tabFlag){
      $(".iframe"+frameId).show().siblings('iframe').hide();
      return
    }

    $(".tab-list").append('<li class="tab-item iframe'+frameId+'"><span class="text">'+frameText+'</span><span class="close">x</span></li>')
    $(".main").append('<iframe src="'+frameSrc+'" width="100%" height="100%" name="iframe" scrolling="auto" class="iframe'+frameId+'" frameborder="0"></iframe>');
    $(".iframe"+frameId).siblings('iframe').hide();
    // $.post("http://192.168.99.205:8080/eamp/dataCheck/getDataCheckPage",{"showCount":10,"currentPage":0},
    //   function(data){
    //     console.log("Data Loaded: " + data);
    // });
    alert("dddddda")
    $.ajax({
			type: "POST",
			// contentType:"application/json",
			url: 'http://192.168.99.205:8080/eamp/dataCheck/getDataCheckPage',
	    data:JSON.stringify({"showCount":10,"currentPage":0}),
			success: function(data){
        console.log(data)
				alert("a");
			}
		});
    // $('iframe').attr("src",frameSrc);
  })
  $('.tab-list').on('click','span',function(){
    var iframeId=$(this).parent().attr('class').split(" ")[1]

    $(this).parent().parent().siblings('.'+iframeId).prev().show();
    $(this).parent().parent().siblings('.'+iframeId).remove();
    $(this).parent().remove()
  })

});
