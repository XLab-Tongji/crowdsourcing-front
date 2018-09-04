'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
  .factory('UserFactory', function ($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = xie_base_Url + '/users';
   
    return {

      getUserListbyUserName: function () {
        return $resource(XbaseUrl + '?username=:username', {username:'@username'}, {
          'get': {
            method: 'get',
            isArray: true,
            headers: SessionService.headers()
          }
        });
      },

      getUserbyId: function () {
        return $resource(XbaseUrl + '/:userid', {userid: '@userid'}, {
          'get': {
            method: 'get',
            headers: SessionService.headers()
          }
        });
      }
    };

    

  });
