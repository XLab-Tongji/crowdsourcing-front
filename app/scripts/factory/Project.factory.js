'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
  .factory('ProjectFactory', function($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = xie_base_Url+'/project';
    return {

      getProjectList: function() {
        return $resource(XbaseUrl+ '/projects', {}, {
          'get': {
            method: 'GET',
            headers: SessionService.headers()
          }
        });
      },

      getProjectContent: function(){
        return $resource(baseUrl+ '/projects/:id/repository/tree', {id:'@id'}, {
          'get': {
            method: 'GET',
            headers: SessionService.headers(),
            isArray: true
          }
        });
      },

      getProjectMembers: function(){
        return $resource(XbaseUrl+ '/:id/members', {id:'@id'}, {
          'get': {
            method: 'GET',
            headers: SessionService.headers()
          }
        });
      },

      getProjectIssues: function(){
        return $resource(XbaseUrl+ '/:id/issues', {id:'@id'}, {
          'get': {
            method: 'GET',
            headers: SessionService.headers()
          }
        });
      }
    };
  });
