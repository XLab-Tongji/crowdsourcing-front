'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
  .factory('UserFactory', function ($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = xie_base_Url + '/account';
   
    return {

      getUserListbyUserName: function () {
        return $resource(XbaseUrl + '/:username', {username:'@username'}, {
          'get': {
            method: 'get',
            headers: SessionService.headers()
          }
        });
      }
    };

    

  });
