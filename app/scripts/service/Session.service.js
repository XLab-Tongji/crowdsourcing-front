'use strict';

angular.module('crowdsourcing').service('SessionService',
	function categoryService ($localStorage, $location,
		$rootScope, $state) {

      this.saveToken = function(token) {
  			$localStorage.token = token;
        $state.go('app.project');
  		};

      this.saveUser = function(user){
        $localStorage.currentUser = user;
      }

      this.delToken = function() {
        delete $localStorage.token;
        delete $localStorage.currentUser;
        $state.go('login');
      };

      this.getToken = function(){
  			if($localStorage.token){
  				$rootScope.token = $localStorage.token;
  				return $localStorage.token;
  			}else{
  				return null;
  			}
  		};

      this.getCurrentUser = function(){
        if($localStorage.currentUser){
          $rootScope.currentUser = $localStorage.currentUser;
          return $localStorage.currentUser;
        }else{
          return null;
        }
      };

    }
);
