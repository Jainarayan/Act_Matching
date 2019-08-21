	var count = 0;
	    correct = 0;
	    incorrect = 0;
		audioCorrect = false; 	
	    dropped = false;
		boxCenterXOffset = 5;
		boxCenterYOffset = 10;
	var dropitem;
	var drag;
	$('.answer-line').hide();
    $('#top-box2').hide();  
		
	const audio1 = new Audio('./audio/quest.mp3');
	const audio2 = new Audio('./audio/Click2-Sebastian-1.mp3');
	const audio3 = new Audio('./audio/Correct.mp3');
	const audio4 = new Audio('./audio/Incorrect.mp3');		
		 
	$('#iframe2, #iframe3').hide();
	$('#hideContainer').show();
	
	$('#mainStart').click(function(){
		$('#startContainer').hide();
		 audio1.play();	 
			
	})
	
	$('.drag-box').mouseover(function(){
		 audio2.play(); 
	})
		
	$('.dragItem').draggable({ delay: 0, distance: 0 },{
		stack: 	'.dragItem',
		 revert: function(event, ui){
			$('.line').hide();		
			$(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;			
		} ,		
		containment: '#top-box', 
		drag: function(event, ui) {
			$('.line').show();
			$('#show').mouseover(function(){ $('#show-img').attr('src','./images/show-2.png'); audio2.play();})
			      .mouseout(function(){ $('#show-img').attr('src','./images/show-1.png'); })
				  .css('cursor', 'pointer');
			$('#show').css('opacity', '1');	
			var a = $(this).attr('id');
			var b = $(this).parent('.boxes').attr('id');
			var x1 = $('#' +a).offset().left + boxCenterXOffset;
			var y1 = $('#' +a).offset().top + boxCenterYOffset;
			var x2 = $('#' +b).offset().left + boxCenterXOffset;
			var y2 = $('#' +b).offset().top + boxCenterYOffset;

			var hypotenuse = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
			var angle = Math.atan2((y1-y2), (x1-x2)) *  (180/Math.PI);
			if(angle >= 90 && angle < 180){
				y1 = y1 - (y1-y2);
			}
			if(angle > 0 && angle < 90){
				x1 = x1 - (x1-x2);
				y1 = y1 - (y1-y2);
			}
			if(angle <= 0 && angle > -90){
				x1 = x1 - (x1-x2);
			}

			$(".line").queue(function(){
				$(this).offset({top: y1 + 6, left: x1 + 12});
				$(this).dequeue();
			}).queue(function(){
				$(this).width(hypotenuse);
				$(this).dequeue();
			}).queue(function(){
				$(this).rotate(angle);
				$(this).dequeue();
			});
		}
	});
	
	$('.dragItem1').draggable({ delay: 0, distance: 0 },{
		stack: 	'.dragItem1',
		 revert: function(event, ui){
			$('.line').hide();		
		/* 	console.log($(this).data("uiDraggable")); */
			$(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;			
		} ,		
		containment: '#top-box2', 
		drag: function(event, ui) {	
			$('.line').show();
			$('#show1').mouseover(function(){ $('#show-img1').attr('src','./images/show-2.png'); audio2.play();})
			      .mouseout(function(){ $('#show-img1').attr('src','./images/show-1.png'); })
				  .css('cursor', 'pointer');
			$('#show1').css('opacity', '1');	
			var a = $(this).attr('id');
			var b = $(this).parent('.boxes').attr('id');
			var x1 = $('#' +a).offset().left + boxCenterXOffset;
			var y1 = $('#' +a).offset().top + boxCenterYOffset;
			var x2 = $('#' +b).offset().left + boxCenterXOffset;
			var y2 = $('#' +b).offset().top + boxCenterYOffset;

			var hypotenuse = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
			var angle = Math.atan2((y1-y2), (x1-x2)) *  (180/Math.PI);
			if(angle >= 90 && angle < 180){
				y1 = y1 - (y1-y2);
			}
			if(angle > 0 && angle < 90){
				x1 = x1 - (x1-x2);
				y1 = y1 - (y1-y2);
			}
			if(angle <= 0 && angle > -90){
				x1 = x1 - (x1-x2);
			}

			$(".line").queue(function(){
				$(this).offset({top: y1 + 6, left: x1 + 12});
				$(this).dequeue();
			}).queue(function(){
				$(this).width(hypotenuse);
				$(this).dequeue();
			}).queue(function(){
				$(this).rotate(angle);
				$(this).dequeue();
			});
		}
	});
	
	
	$("#drop-box1").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box3")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '-0.2vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13',	
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line1').show();
				$('.line').hide();
				if(correct == 6){
					$(audio3).on('ended', function(){
						$('#content-box').hide();
						$('.drag-area').hide();
						$('.drop-area').hide();
						$('#content-box2').hide(); 
						$('#top-box2').show();  
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						/* console.log($(this).data("uiDraggable")); */
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();
				
			}
		}
	});	
	
	$("#drop-box2").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box5")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '-0.2vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});		
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line2').show();
					$('.line').hide();
				if(correct == 6){
					$(audio3).on('ended', function(){
						$('#content-box').hide();
						$('.drag-area').hide();
						$('.drop-area').hide();
						$('#content-box2').hide(); 
						$('#top-box2').show();  
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});	
	
	
	$("#drop-box3").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box6")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '-0.2vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line3').show();
					$('.line').hide();
				if(correct == 6){
					$(audio3).on('ended', function(){
						$('#content-box').hide();
						$('.drag-area').hide();
						$('.drop-area').hide();
						$('#content-box2').hide(); 
						$('#top-box2').show();  
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});	
	
	
	$("#drop-box4").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box2")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '-0.2vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});		
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line4').show();
					$('.line').hide();
				if(correct == 6){
					$(audio3).on('ended', function(){
						$('#content-box').hide();
						$('.drag-area').hide();
						$('.drop-area').hide();
						$('#content-box2').hide(); 
						$('#top-box2').show();  
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});	
	
	$("#drop-box5").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box1")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '-0.2vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});			 					
				correct++;
				count++;
				corr();
				$('#answer-line5').show();
					$('.line').hide();
				if(correct == 6){
					$(audio3).on('ended', function(){
						$('#content-box').hide();
						$('.drag-area').hide();
						$('.drop-area').hide();
						$('#content-box2').hide(); 
						$('#top-box2').show();  
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});	
	
	$("#drop-box6").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box4")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '-0.2vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});		
				correct++;
				count++;
				corr();
				$('#answer-line6').show();
					$('.line').hide();
				if(correct == 1){
					$(audio3).on('ended', function(){
						$('#content-box').hide();
						$('.drag-area').hide();
						$('.drop-area').hide();
						$('#content-box2').hide(); 
						$('#top-box2').show();  
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});	
	
		$("#drop-box7").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box11")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '-0.2vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line11').show();
				$('.line').hide();
				if(correct == 12){
					$(audio3).on('ended', function(){
						$('#top-box2').hide();
						$('#mainContainer').hide();
						$('#resultContainer').show();		
						$('#totalCount').text(count);
						$('#totalCorrect').text(correct);
						$('#totalIncorrect').text(incorrect);  
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});
	
		$("#drop-box8").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box10")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '0vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line10').show();
				$('.line').hide();
				if(correct == 12){
					$(audio3).on('ended', function(){
						$('#top-box2').hide();
						$('#mainContainer').hide();
						$('#resultContainer').show();		
						$('#totalCount').text(count);
						$('#totalCorrect').text(correct);
						$('#totalIncorrect').text(incorrect); 
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
				$('.line').hide();		
					$(this).data("uiDraggable").originalPosition = {
						top : 0,
						left : 0
						},
					$(this).animate({
						top: '0vmin',
						left: '0vmin'
					}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});
	
		$("#drop-box9").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box7")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '0vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line7').show();
				$('.line').hide();
				if(correct == 12){
					$(audio3).on('ended', function(){
						$('#top-box2').hide();
						$('#mainContainer').hide();
						$('#resultContainer').show();		
						$('#totalCount').text(count);
						$('#totalCorrect').text(correct);
						$('#totalIncorrect').text(incorrect);
					})
				}
			}			
			else{
					$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});
	
		$("#drop-box10").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box12")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '0vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line12').show();
				$('.line').hide();
				if(correct == 12){
					$(audio3).on('ended', function(){
						$('#top-box2').hide();
						$('#mainContainer').hide();
						$('#resultContainer').show();		
						$('#totalCount').text(count);
						$('#totalCorrect').text(correct);
						$('#totalIncorrect').text(incorrect); 
					})
				}
			}			
			else{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});
	
		$("#drop-box11").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box8")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '0vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line8').show();
				$('.line').hide();
				if(correct == 12){
					$(audio3).on('ended', function(){
						$('#top-box2').hide();
						$('#mainContainer').hide();
						$('#resultContainer').show();		
						$('#totalCount').text(count);
						$('#totalCorrect').text(correct);
						$('#totalIncorrect').text(incorrect);  
					})
				}
			}			
			else{
					$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});
	
		$("#drop-box12").droppable({
		tolerance: 'pointer',
		drop: function(ev,ui){
			var div = $(this).attr('id');
			if(!$(this).hasClass("drop") && ($(ui.draggable).attr('id')=="drag-box9")){				
				dropitem = $(ui.draggable);							
				$(this).append(dropitem).addClass("drop");
				dropped=true;
				$(ui.draggable).appendTo($(this));
				$(ui.draggable).addClass('dropped');
				$(ui.draggable).css({                
									'top': '0vmin',
									'left': '0vmin',
									'margin': '-5.4vmin -0.6vmin',
									'z-index': '0',
									'backgroundColor': '#13cf13'
								});	
				$(ui.draggable).children('.inner-drag-box').css({                
									'backgroundColor': '#2e9b49'
								});									
				correct++;
				count++;
				corr();
				$('#answer-line9').show();
				$('.line').hide();
				if(correct == 12){
					$(audio3).on('ended', function(){
						$('#top-box2').hide();
						$('#mainContainer').hide();
						$('#resultContainer').show();		
						$('#totalCount').text(count);
						$('#totalCorrect').text(correct);
						$('#totalIncorrect').text(incorrect); 
					})
				}
			}			
			else{
					$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();				
			}
		}
	});
	
		
	
	$(audio1).on('ended', function(){     
		$('#hideContainer').hide();
	});
		
	function corr(){
		
		$('#hideContainer').show();
		$('#iframe2').show();
		$('#iframe1, #iframe3').hide();
		setTimeout(function(){
			$('#iframe2').hide();
			$('#iframe1').show();
		}, 3500);
		$(audio3).on('ended', function(){
			$('#hideContainer').hide();
		});
		audio3.play(); 
	}	
	
	function incorr(){
		$('#hideContainer').show();
		$('#iframe3').show();
		$('#iframe1, #iframe2').hide();
		setTimeout(function(){
			$('#iframe3').hide();
			$('#iframe1').show();
		}, 3000);
		$(audio4).on('ended', function(){     
			$('#hideContainer').hide();		
						
		}); 
		audio4.play(); 
	}    	

	$('#refresh, #result-refresh').click(function(){
		location.reload();
	});
	
	$('#refresh').mouseover(function(){ $('#refresh-img').attr('src','./images/refresh-2.png'); audio2.play(); })
			     .mouseout(function(){ $('#refresh-img').attr('src','./images/refresh-1.png'); })	

	$('#refresh1, #result-refresh').click(function(){
		location.reload();
	});
	
	$('#refresh1').mouseover(function(){ $('#refresh-img1').attr('src','./images/refresh-2.png'); audio2.play(); })
			     .mouseout(function(){ $('#refresh-img1').attr('src','./images/refresh-1.png'); })					 
	
	$('#show').click(function(){
		$('#answer-line1').show();
		$('#answer-line2').show();
		$('#answer-line3').show();
		$('#answer-line4').show();
		$('#answer-line5').show();
		$('#answer-line6').show();
		$('.dragItem').hide();
		$('dropitem').show();

	});
	
		$('#show1').click(function(){
		$('#answer-line7').show();
		$('#answer-line8').show();
		$('#answer-line9').show();
		$('#answer-line10').show();
		$('#answer-line11').show();
		$('#answer-line12').show();
		$('.dragItem1').hide();
	});
