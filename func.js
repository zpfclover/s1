		function OpenOrClose(_this){
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
		$(document).ready(function(){
			$('.delete').on('click',function(){
				$(this).parent().remove();
			});
			
			$('.repo').on('scroll',function(){
				$(this).parent().parent().find('.info').remove();
			});
		});