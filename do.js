$.get('http://bbs.saraba1st.com/2b/forum-75-2.html',function(data){
	//$('head').html('');
	//$('body').html('');
	$(data).find('#threadlist').find('tbody').each(function(){
		if($(this).attr('id')!=undefined){
			var id=$(this).attr('id');
			if(id.indexOf("normalthread") >= 0){
			
				var mainA=$(data).find(".common").children('.s');
				var title=$(mainA).html();
				var url=$(mainA).attr('href');
				$.get(url,function(data_thread){
					console.log(data_thread);
					$('body').append(FormThreadBlock(data_thread));
					$('.thread_M').each(function(){
						var t=$(this).find('.content')[0];
						console.log($(t)[0].scrollHeight,parseInt($(t).css('max-height')));
						//if($(t)[0].scrollHeight<=parseInt($(t).css('max-height'))){
							//console.log('let');
							//$(this).find('.viewAll')[0].remove();
						//}
					});
				});
				
				return false;
			}
		}
	});
});

function FormThreadBlock(data){
	var mainA=$(data).find("#postlist").children('table')[0];
	var title=$(data).find('#thread_subject').html();
	var tag=$(data).find("h1").children('a').html();
	tag=tag.substring(1,tag.length-1);
	var postDIVs=$(data).find("#postlist").children('div');
	var L1Obj=TrimPostDiv(postDIVs[0]);
	var userName=L1Obj.username;
	var postTime=L1Obj.posttime;
	var content=L1Obj.content;

	var html='<div class="thread_M">';
		html+='<div class="Block">';
		if(tag!=undefined&&tag!='')
			html+='<div class="tag">'+tag+'</div>';
		html+='<div class="uBlock">';
				html+='<div class="name">'+userName+'</div>';
				html+='<div class="time">'+postTime+'</div>';
				html+='<img src="'+L1Obj.image+'" />';
			html+='</div><div class="clear"></div></div>';
			html+='<div class="Block">';
				html+='<div class="title">'+title+'</div>';
				html+='<div class="content">'+content+'</div>';
			html+='</div>';
			html+='<div class="viewAll" onclick="console.log(\'ssssss\');OpenOrClose(this);" O="false">阅读完整内容</div>';
			html+='<div class="Block">';
			html+='<div class="repo">';
				for(var i=1;i<postDIVs.length-1;i++){
					var obj=TrimPostDiv(postDIVs[i]);
					
					html+='<div class="re">';
						html+='<div class="uBlock">';
							html+='<img src="'+obj.image+'" />';
							html+='<div class="name">'+obj.username+'</div>';
							html+='<div class="time">'+obj.posttime+'</div>';
						html+='</div>';
						html+='<div class="floor">'+(i+1)+'L</div>';
						html+='<div class="clear"></div>';
						html+='<div class="content">'+obj.content+'</div>';
					html+='</div>';
				}
			html+='</div>';
			html+='</div>';
		html+='</div>';
		
	return html;
}

function TrimPostDiv(data){
	var obj={};
	var auth=$(data).find('.pls').find('.authi');
	obj.username=$(auth).children('a').html();
	obj.image=$(data).find('.avtm').find('img').attr('src');
	var plc=$(data).find('.plc');
	obj.posttime=$(plc).find('.authi').children('em').children('span').html();
	var contentC=$(plc).find('.t_f');
	$(contentC).find('img').each(function(){
		$(this).attr({"src":$(this).attr('file')});
		$(this).removeAttr('height');
	});
	obj.content=$(contentC).html();
	
	return obj;
}

			//$(".viewAll").live('click',function(){
			function OpenOrClose(_this){
			console.log("sss");
				if($(_this).attr('O')=='false'){
					var A=$(_this).prev().children('.content');
					$(A).addClass('noMaxHeight');
					$(_this).html('收起');
					$(_this).attr({'O':'true'});
				}
				else{
					var A=$(_this).prev().children('.content');
					$(A).removeClass('noMaxHeight');
					$(_this).html('阅读完整内容');
					$(_this).attr({'O':'false'});
				}
			}
			//});