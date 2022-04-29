$(function(){

	function pulldownMenu(target){

		$.each(target.find('li:has(ul)'), function(index){

			var btn = $(this).find('p'); //開閉ボタンのセレクタを格納した変数
			var menuArea = $(this).find('div'); //メニューリストエリアのセレクタを格納した変数
			var menuList = $(this).find('li'); //メニューのセレクタを格納した変数

			//メニュー設定
			$.each(menuList, function(id){
				$(menuList[id]).on({
					'mouseover': function(){
						$(this).find('img').attr('src', 'images/sub_menu'+index+'_'+id+'_ov.png');
					},
					'mouseout': function(){
						$(this).find('img').attr('src', 'images/sub_menu'+index+'_'+id+'.png');
					}
				});
			});

			//領域全体にmouseleaveイベントを設定
			$(this).on('mouseleave', function(){
				menuArea.stop().slideUp();
			});

			//開閉ボタン箇所にmouseenterイベントを設定
			btn.on('mouseenter', function(){
				menuArea.stop().slideDown();
			});

		});

	};

	pulldownMenu($('#pulldown'));

});