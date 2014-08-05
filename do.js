$.get('http://bbs.saraba1st.com/2b/forum-75-2.html',function(data){
	$('body').html('');
	$(data).find('#threadlist').find('tbody').each(function(){
		if($(this).attr('id')!=undefined){
			var id=$(this).attr('id');
			if(id.indexOf("normalthread") >= 0){
				var htmlGoToDo="";
				
				var mainA=$(this).find(".common").children('.s');
				var title=$(mainA).html();
				var url=$(mainA).attr('href');
				htmlGoToDo+='<div class="t_thread"><a href="'+url+'">'+title+'</a></div>';
				//$.get(url,function(data_thread){
				//	console.log(data_thread);
				//});
				$('body').append(htmlGoToDo);
			}
		}
	});
	
	
});