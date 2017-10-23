/**
 * 微金所脚本
 */

$(function(){
	// // var imgsrc="img/slide_01_2000x410.jpg";
	// $("#mian_ad>.carousel-inner>.item").each(function(index, item) {
	// 	console.log();
	// 	$(item).css("backgroundImage",'url("img/slide_0'+(index+1)+'_2000x410.jpg")');
		
	// });
	var imgdate;//从html页面获取的图片路径
	function resize(){
		// 得到当前屏幕大小
		var screenWidth=$(this).width();
		$("#mian_ad>.carousel-inner>.item").each(function(index, item){
			//判断屏幕是否小于768
			//如果小于768的话我们取标签的data属性imgsm，反之我们取data-imgLg,注意不能有大写
			imgdate=screenWidth < 768 ? $(this).data("imgsm"): $(this).data("imglg");
			if(screenWidth>768){
				$(item).empty();//清空item内部标签，因为此时只需要背景图片就可以了
				//然后给item设置背景图片
				$(item).css("backgroundImage",'url("'+imgdate+'")');
			}else{
				//当屏幕小于768
				//我们就不应该对其设置背景图片了，我们应该再item体内设置img
				$(item).html('<img src="'+imgdate+'" alt=""/>');
				$(item).css("backgroundImage",'');
			}
		});
	}
	//这里不用加括号，因为再js中直接写函数名就是写函数体
	$(window).on('resize',resize).trigger("resize");
	
	/**
   	* 控制标签页的标签容器宽度
   	
   	//获取ul列表对象
   	var $ulContainer = $('#produtcs  .nav-tabs');
 	// 获取所有子元素的宽度和
  	var width = 30; // 因为原本ul上有padding-left
  	//遍历ul的子元素，拿到他们的宽度叠加到width中
  	$ulContainer.children().each(function(index,elements){
  		width+=elements.clientWidth;
  	});
  	//判断，如果当前ul宽度也就是width>当前页面宽度
  	//也就意味着当前页面宽度无法满足ul列表完全显示
  	if(width > $(window).width()){
  		//给ul列表设置宽度和横向滑动条
  		$ulContainer.css('width',width).parent().css('overflow-x', 'scroll');
  	} */

  	//切换导航条的时候对应的标题进行切换
  	//先获取a标签，然后为每个a注册点击事件
  	$("#news ul li").children().each(function(index, el) {
  		$(el).on('click',function(){
  			//然后拿到它里面的自定义title属性
  			var title=$(this).data('title');
  			//将title属性切换到对应的标题
  			$("#news .allnews").html(title);
  		});
  	});	
  	
  	//当网页处于手机端的时候，鼠标左滑或者右滑进行切换轮播图
  	var $carousel=$('.carousel');	//获取轮播图元素
  	var startX,endX;				//定义开始横坐标和结束横坐标
  	var offset=50;						//定义偏移量
  	//首先获得鼠标点击时的位置，鼠标移动到某个位置时的位置
  	$carousel.on('touchstart', function(elements) {
  		//鼠标开始移动时的位置,记录开始位置
  		startX=elements.originalEvent.touches[0].clientX;
  	});
  	$carousel.on('touchmove',function(elements){
  		//鼠标移动中，变量重复赋值
  		endX=elements.originalEvent.touches[0].clientX;
  	});
  	$carousel.on('touchend',function(elements){
  		//鼠标结束移动,比较的话需要在end比较，因为此时鼠标已经结束移动
  		//不能在move比较，因为此时鼠标还在移动
  		////然后比较相减，看鼠标到底是左移动还是右移动，
  		var distance=Math.abs(startX-endX);
  		if(distance>offset){	//符合偏移量
  			//右移动的话就让轮播图调用方法..carousel('prev')
  			//左移动的话就让轮播图调用方法..carousel('next')
  			$(this).carousel(startX>endX?'next':'prev');
  		}
  	});
  	
	
});