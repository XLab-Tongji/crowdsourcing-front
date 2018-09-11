'use strict';
/**
 * 登录的检测，修改完毕后可以使用
 * 	~ 目前是还没有启用的
 * @param  {[type]} 'nevermore' [description]
 * @return {[type]}             [description]
 */
angular.module('crowdsourcing')
  .factory('authInterceptor', function loadingHttpInterceptor($q, $timeout,
    $rootScope, $sessionStorage, $localStorage, $location) {
    var whiteList = [
      'views/portal',
      '/sign_up'
    ];
    function checkToken(){
      if (!$localStorage.token ) {
				$location.path('/login');
				return false;
			}else{
				// $rootScope.currentUser = $localStorage.currentUser;
				$rootScope.token = $localStorage.token;
			}
    };
    function isNotInWithList(url) {
      for(var i = 0; i < whiteList.length; i++) {
        var regExp = new RegExp(whiteList[i]);
        if(regExp.test(url)) {
          return false;
        }
      }
      return true;
    };
    return {
      request: function (config) {
        //检查是否已经登录，如果没有登录强制跳转到登录框
        if(config && isNotInWithList(config.url)){
            checkToken();
        }
        return config || $q.when(config);
      },
      requestError: function (config) {
        return $q.reject(rejection);
      },
      response: function (response) {
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        return $q.reject(rejection);
      }
    };
  });
