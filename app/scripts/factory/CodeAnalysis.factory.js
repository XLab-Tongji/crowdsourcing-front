'use strict';

angular.module('crowdsourcing')
  .factory('CodeAnalysisFactory', function ($resource, $rootScope, SessionService) {
    var baseUrl = base_Url;
    var XbaseUrl = 'http://115.159.126.118:7887/SwQualityAssesment/api/task';

    return {

      codeAnalysis: function () {
        return $resource(XbaseUrl , {}, {
          'post': {
            method: 'POST',
            headers: SessionService.headers()
          }
        });
      },

    };
  });
