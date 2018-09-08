'use strict';

/**
 * Git Group api
 */
angular.module('crowdsourcing')
  .factory('ProjectGroupFactory', function ($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = xie_base_Url + '/group';

    return {

      createProjectGroup: function () {
        return $resource(XbaseUrl + '/', {}, {
          'post': {
            method: 'POST',
            headers: SessionService.headers()
          }
        });
      },

      getProjectGroupList: function () {
        return $resource('http://172.16.101.90:8080/api/v4/groups', {}, {
          'get': {
            method: 'GET',
            isArray: true,
            headers: SessionService.headers()
          }
        });
      },

      getProjectGroupDetail: function () {
        return $resource('http://172.16.101.90:8080/api/v4/groups/:id', { id: '@id' }, {
          'get': {
            method: 'GET',
            headers: SessionService.headers()
          }
        });
      },

       deleteProjectGroup: function () {
        return $resource(XbaseUrl + '/:id', { id: '@id' }, {
          'delete': {
            method: 'DELETE',
            headers: SessionService.headers()
          }
        });
      },

    };
  });
