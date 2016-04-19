angular.module('ngDirective',[])
.directive('stScroll',['$http',function($http){
    return  {
        restrict:'AC',
        scope : {
            array : '=array',
            index : '=index',
            size : '=size',
            min : '=dialogmin',
            type :'=type',
            name : '=name',
            date : '=dialogdate',
            id:'=id'
        },
        link : function(scope,element,attr){
            var scrollFunc = function (e) {
                var direct = 0;
                e = e || window.event;
                if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                    if (e.wheelDelta > 0) { //当滑轮向上滚动时
                        direct = 0;
                    }
                    if (e.wheelDelta < 0) { //当滑轮向下滚动时
                        direct = 1;
                    }
                } else if (e.detail) {  //Firefox滑轮事件
                    if (e.detail> 0) { //当滑轮向上滚动时
                        direct = 0;
                    }
                    if (e.detail< 0) { //当滑轮向下滚动时
                        direct = 1;
                    }
                }
                scope.$watch('index',function(){
                    if(scope.index == 1){
                        $('.loading').remove();
                    }
                })
                if(direct && scope.array.length != 0){
                    if(!$(this).parents('.dialog_content').find('.loading').hasClass('loading')){
                        var trHeight = 0;
                        $(this).find('tr').each(function(){
                            trHeight += $(this).outerHeight();
                        });
                        if(angular.element(element).height()+angular.element(element).scrollTop() >= trHeight){
                            angular.element(element).append('<div class="loading" style="text-align: center;">加载中</div>');
                            $http.get(angular.element(element).attr('url')).success(function(d){
                                scope.index = parseInt(scope.index) + 1;
                                scope.array = scope.array.concat(d);
                                angular.element(element).getNiceScroll().resize();
                                $('.loading').remove();
                            })
                        }
                    }
                }
            };
            function scrollajax(){
                //FF绑定滚动事件
                angular.element(element).each(function(){if (this.addEventListener) {
                    this.addEventListener('DOMMouseScroll', scrollFunc, false);
                }});
                //IE chorme绑定滚动事件
                angular.element(element).each(function(){
                    this.onmousewheel = scrollFunc;
                });
            };
            scrollajax();
        }
    }
}])
.directive('stRadio',function(){
   return {
       restrict: 'AC',
       scope: {
           ngModel: '='
       },
       link: function (scope, ele, attr) {
           if (angular.element(ele).is(':checked')) {
               angular.element(ele).wrap('<span class="selected radio"></span>');
           } else {
               angular.element(ele).wrap('<span class="radio"></span>');
           }
           scope.$watch('ngModel', function () {
               if (angular.element(ele).is(':checked')) {
                   angular.element(ele).parents('.radio').addClass('selected');
               } else {
                   angular.element(ele).parents('.radio').removeClass('selected');
               }
           })
       }
   }
})
