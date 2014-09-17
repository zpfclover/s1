$.get('http://bbs.saraba1st.com/2b/forum-75-1.html',function(data){
	//$('head').html('');
	$('body').html('');
	$($(data).find('#threadlist')[0]).find('tbody').each(function(){
		if($(this).attr('id')!=undefined){
			var id=$(this).attr('id');
			if(id.indexOf("normalthread") >= 0){
			
				var mainA=$(this).find(".common").children('.s');
				var title=$(mainA).html();
				var url=$(mainA).attr('href');
				console.log(url);
				$.get(url,function(data_thread){
					//console.log(data_thread);
					$('body').append(FormThreadBlock(data_thread,url));
					$('.thread_M').each(function(){
						var t=$(this).find('.content')[0];
						//console.log($(t)[0].scrollHeight,parseInt($(t).css('max-height')));
						if($(t)[0].scrollHeight<=parseInt($(t).css('max-height'))){
							console.log('let');
							$(this).find('.viewAll')[0].remove();
						}
					});
				});
				
				return false;
			}
		}
	});
});

function FormThreadBlock(data,url){
	var mainA=$(data).find("#postlist").children('table')[0];
	var title=$(data).find('#thread_subject').html();
	var tag=$(data).find("h1").children('a').html();
	tag=tag.substring(1,tag.length-1);
	var postDIVs=$(data).find("#postlist").children('div');
	var L1Obj=TrimPostDiv(postDIVs[0]);
	var userName=L1Obj.username;
	var postTime=L1Obj.posttime;
	var content=L1Obj.content;

	var html='<div class="thread_M" url="'+url+'">';
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
					obj.floor=i;
					html+=FormRepoHtml(obj);
				}
			html+='</div>';
			html+='</div>';
			html+='<div class="delete">X</div>';
		html+='</div>';
		
	return html;
}

function FormRepoHtml(obj){
	var html='';
	html+='<div class="re" post_id="'+obj.id+'">';
		html+='<div class="uBlock">';
			html+='<img src="'+obj.image+'" />';
			html+='<div class="name">'+obj.username+'</div>';
			html+='<div class="time">'+obj.posttime+'</div>';
		html+='</div>';
		html+='<div class="floor">'+obj.floor+'L</div>';
		html+='<div class="clear"></div>';
		html+='<div class="content">'+obj.content+'</div>';
	html+='</div>';
	
	return html
}
function TrimPostDiv(data){
	var obj={};
	var regex= /\d+/;
	obj.id=regex.exec($(data).attr('id'));
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

AddToHead('jquery.js');
AddToHead('func.js');
function AddToHead(title){
	var oHead = document.getElementsByTagName('HEAD').item(0); 
    var oScript= document.createElement("script"); 
    oScript.type = "text/javascript"; 
    oScript.src=chrome.extension.getURL(title); 
    oHead.appendChild( oScript); 
}

setTimeout('IntetvalFunc()',30000);
function IntetvalFunc(){
	console.log('auto update repo');
	$('.thread_M').each(function(){
		var _this=this;
		var url=$(_this).attr('url');
		$.get(url,function(data_thread){
			var postDIVs=$(data_thread).find("#postlist").children('div');
			for(var i=1;i<postDIVs.length-1;i++){
				var obj=TrimPostDiv(postDIVs[i]);
				var lastID=$(_this).find('.re');
				var newReCount=0;
				var info=$(_this).find('.info');
					if(info.length>0){
						var regex= /\d+/;
						newReCount=regex.exec($(info).html())
					}
				var lastFloor=parseInt($(lastID[lastID.length-1]).find('.floor').html());
				lastID=$(lastID[lastID.length-1]).attr('post_id');
				if(obj.id>lastID){
					lastFloor++;
					obj.floor=lastFloor;
					$(_this).find('.repo').append(FormRepoHtml(obj));
					newReCount++;
				}
				if(newReCount>0){
					var info=$(_this).find('.info');
					if(info.length==0){
						$(_this).prepend('<div class="info"></div>');
						info=$(_this).find('.info');
					}
					$(info).html('有'+newReCount+'条新回复');
				}
			}
		});
	});
	setTimeout('IntetvalFunc()',30000);
}