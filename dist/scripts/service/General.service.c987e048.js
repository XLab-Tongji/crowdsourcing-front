'use strict';

angular.module('crowdsourcing')
  .service('generalService', function ($rootScope, $location, $sessionStorage, $localStorage) {

    this.DEFAULT_PAGINATOR_TEMPLATE = {
          "page": 1,
          "items": 0,
          "itemsPerPage": 10,
          "totalPages": 0,
          "totalItems":0
    	};

    this.pageSize = function(){
      return 10;
    };

  });
