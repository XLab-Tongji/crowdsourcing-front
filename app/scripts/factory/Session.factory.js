'use strict';

/**
 * 登录 api
 */
angular.module('crowdsourcing')
  .factory('SessionFactory', function($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = xie_base_Url + '/account';
    return {
      login: function(){
        return $resource(XbaseUrl+ '/authentication', {}, {
          'post': {
            method: 'POST'
          }
        });
      },

      register: function(){
        return $resource(XbaseUrl, {}, {
          'post': {
            method: 'POST'
          }
        });
      },

    };

  });
