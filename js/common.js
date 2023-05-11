$(function(){    
    // page 로드이후 주소값 가져오기
    var currentHref = splitHref($(location));
    
    if( currentHref == 'index' || currentHref == '' ){
        $('#header').load('./include/header.html');
        $('#footer').load('./include/footer.html');
    }else{
        $('#header').load('../include/header.html');
        $('#footer').load('../include/footer.html');
    }

    // console.log($('body'));
    // console.log(window.location.href);
    // console.log($(location).attr('href'));
    /*
    실습:
    #lnb의 메뉴와 같은 서브페이지의 주소값을 매칭하여 
    해당 메뉴에 'on' class를 추가하시오.
    */
   function splitHref(el){
       var href = el.attr('href').split('/');
       href = href[href.length - 1].split('.');// split를 사용하여 받은 배열중 마지막요소를 반환
       href = href[0];
       return href;
    }
    
    $('#lnb a').each(function(){        
        var matchHref = splitHref($(this));
        if( currentHref == matchHref ){
            $(this).addClass('on');
        }
    });

    // gallery slider
    var liElem = $('#navi .page-wrap .page ul li');
    var liElemWidth = liElem.width(); // 너비 : 120
    var liLeng = liElem.length;
    $('#navi .page-wrap').css('width',liLeng*liElemWidth);
    
    // thumb nail 이미지로 작동 하는 스크립트
    $('#navi a').click(function(){
    var imgHref = $(this).attr('href');
    // animate 진행 중 판단 코드
    var checkAni = $('#main img:last').is(':animated');

    //animate 진행 중이 아닐때만 스크립트 적용
    if(!checkAni){
        $('#main img:last').animate({opacity: 0},{
            duration: 400,
            easing: 'swing',
            start: function(){
                $('#main img:last').before('<img src="'+imgHref+'" alt="">');
            },
            complete: function(){
                $(this).remove();
            }
        });
    }
        return false;
    });

    // prev, next 버튼을 클릭시 li의 너비 크기 만큼 이동하는 로직으로 변경하시오.
    var marginNumber = $('#navi .page-wrap .page ul li').width();
    function pagingBtnFunc(el){
        el.click(function(){          
            var pwElem = $('#navi .page-wrap');
            var liLeng = pwElem.find('.page ul li').length;
            var marginLeftPw = parseInt(pwElem.css('margin-left'));
            var isAni = pwElem.is(':animated');
            if(!isAni){
                if(el.hasClass('next') && marginLeftPw > -(marginNumber*(liLeng - 5)) ){//-1200
                    pwElem.animate({marginLeft: marginLeftPw - marginNumber},'fast');
                }else if(el.hasClass('prev') && marginLeftPw < 0){//0
                    pwElem.animate({marginLeft: marginLeftPw + marginNumber},'fast');
                }else{
                    alert('더 이상 이미지가 없습니다.');
                }
            }
        });
    }

    $('.navi-wrap > img').each(function(){
        pagingBtnFunc($(this));
    });
});