'use strict';

angular.module('crowdsourcing')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

          $urlRouterProvider
                  .otherwise('/index/main');

          $stateProvider
            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "views/common/content.html",
                resolve: {

                }
            })
            .state('index.main', {
                url: "/main",
                controller:'MainController',
                templateUrl: "views/main.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'scripts/controller/main.controller.js',
                      ]);
                  }]
                }
            })
            .state('index.minor', {
                url: "/minor",
                templateUrl: "views/minor.html",
                resolve: {

                }
            })
            .state('portal', {
                url: "/portal",
                templateUrl: "views/portal/portal.html",
                data: { pageTitle: 'Landing page', specialClass: 'landing-page' },
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'lib/libs/cbpAnimatedHeader.js',
                          'lib/libs/classie.js',
                          'lib/libs/wow.min.js',
                          'lib/libs/inspinia.js',
                      ]);
                  }]
                }
            })
        }
    ])
  .run();
