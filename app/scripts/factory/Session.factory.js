'use strict';

/**
 * 登录 api
 */
angular.module('crowdsourcing')
  .factory('SessionFactory', function($resource, $rootScope) {
    var baseUrl = base_Url;
    return {
      login: function(){
        return $resource(baseUrl+ '/session', {}, {
          'post': {
            method: 'POST'
          }
        });
      },

      register: function(){
        return $resource(baseUrl+ '/sign_up', {}, {
          'post': {
            method: 'POST'
          }
        });
      }

    };

  });
