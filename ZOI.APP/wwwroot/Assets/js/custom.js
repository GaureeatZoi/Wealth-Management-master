$( document ).ready(function() {
	
  $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
	
//   
	$('.listmain').click(function(){
		$('.listmain').removeClass('boxlistAct');
		$(this).addClass('boxlistAct');
	});
	
//	
	$('.listList').click(function(){
		$('.boxesList').addClass('boxesListLine');
 	});	
//	
	
	//$('.multipleSelc').fSelect();
//
	$('.listBox').click(function(){
		$('.boxesList').removeClass('boxesListLine');
 	});	
//
	$('.searchIc').click(function(){
		$('.searchBox').slideToggle();
		return false;
 	}); 

	$('.sercClose').click(function(){
		$('.searchBox').slideToggle();
		return false;
 	}); 

	$('.filIc').click(function(){
		$('.filterOpen').slideToggle();
		$(this).toggleClass('boxlistAct')
		return false;
 	});
	
	$('.dropdownLink').click(function(){
		$('.overlayer').slideToggle();
		$(this).parent().parent().find('.dropdown-menu').slideToggle();
		return false;
 	});
	$('.overlayer').click(function(){
		$('.overlayer').slideToggle();
		$('.dropdown-menu').slideUp();
		$("#appreBox, #rejreBox, #reportBox, #reqSub").hide();
		return false;
 	});
//
	$('#openSubBox').click(function(){
		$('#reqSub').show();
		$('.overlayer').show();
 		return false;
 	});
	
	$('.appBtn').click(function(){
		$('.appredBox').show();
 		return false;
 	});

//	
	$('.dotIcon2').click(function(){
		$(this).parent().parent().parent().parent().children('.favIconImg').toggle();
		$(this).text($(this).text() == 'Mark to Favorite' ? 'Remove Favorite' : 'Mark to Favorite');
		return false;
 	});
	
	$('.slideNav').mouseover(function(){
		$(this).addClass('slideNavover')
		return false;
 	});
	
	$('.slideNav').mouseleave(function(){
		$(this).removeClass('slideNavover')
		return false;
 	});
	
	$('.menuBt').click(function(){
		$(".slideNav.navHide").addClass('menuLeft0 slideNavover');
		$('.overlayer2').show();
		return false;
 	});
	
	$('.overlayer2').click(function(){
		$(".slideNav.navHide").removeClass('menuLeft0 slideNavover');
		$('.overlayer2').hide();
		return false;
 	});
	
	$('.tabsMob select').on('change', function () {
          var url = $(this).val(); // get selected value
          if (url) { // require a URL
              window.location = url; // redirect
          }
          return false;
      });
	
	
	/*$('.slideNav').mouseleave(function(){
		$('.slideNav ').animate({
		width: '60px'
	},100);
		return false;
 	});
	*/
/*	
	$('.slideNav').mouseover(function(){
		$('.slideNav ').animate({
		width: '320px'
	},100,	function () {
		$('#msgDiv').append('Animation completed');
	});
		return false;
 	});
	
	*/
	
//

/*
$('.Count').each(function () {
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
*/	
	
//
	$('.addtags a').click(function(){
		$(this).toggleClass('tagsActive')
		return false;
 	});
//
$('.boxesList2 li a').click(function(){
		$(this).addClass('visited')
		return false;
 	});
//
  $('input').data('holder',$('input').attr('placeholder'));
    $('input').focusin(function(){
        $(this).attr('placeholder','');
    });
    $('input').focusout(function(){
        $(this).attr('placeholder',$(this).data('holder'));
    });
	
//

 $(".custom-select#sectId").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".dropShowDiv").not("." + optionValue).hide();
                $("." + optionValue).show();
            } else{
                $(".dropShowDiv").hide();
            }
        });
    }).change();



 





// accordian
	function hidden(a){
		$(a).removeClass('selected');
		$(a).parent().find('ul:first').slideUp();
	}
	function visible(b){
		$(b).parent().siblings().find('a').removeClass('selected');
		$(b).parent().parent().find('li ul:visible').slideUp();
		$(b).addClass('selected');
		$(b).parent().find('ul:first').slideDown();
	}
	function check(c){
		if($(c).parent().find('ul:first').is(':hidden')) {
		   visible(c);
		}else{
		   hidden(c);
		}
	}
	$(function(){
		$(".firstpane li:has(ul) > a").click(function(){
		   check($(this));
		   return false;
		});
	});
	
	
	///
// $('.input-images-1').imageUploader();
	
	
});	


function showDialog2() {
    $("#appReq").removeClass("fade").modal("hide");
		$('.overlayer').show();
		$("#appreBox").show();
}


$(".appBtn").on("click", function() {
    showDialog2();
});

 function showDialog3() {
    $("#appReq").removeClass("fade").modal("hide");
		$('.overlayer').show();
		$("#rejreBox").show();
}


$(".rejBtn").on("click", function() {
    showDialog3();
})

 function showDialog4() {
    $("#chanRepot").removeClass("fade").modal("hide");
		$('.overlayer').show();
		$("#reportBox").show();
}


$(".repBtn").on("click", function() {
    showDialog4();
})