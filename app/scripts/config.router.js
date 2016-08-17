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
            .state('app', {
                abstract: true,
                url: "/index",
                controller:'AppController',
                templateUrl: "views/common/content.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'scripts/controller/app/App.controller.js',
                      ]);
                  }]
                }
            })
            .state('app.main', {
                url: "/main",
                controller:'MainController',
                templateUrl: "views/app/main.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'scripts/controller/app/Main.controller.js',
                      ]);
                  }]
                }
            })
            .state('app.project', {
                url: "/project",
                controller:'ProjectManagerController',
                data: { pageTitle: '项目'},
                templateUrl: "views/app/project/project_list.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'scripts/controller/app/project/ProjectManager.controller.js',
                      ]);
                  }]
                }
            })
            .state('app.minor', {
                url: "/minor",
                templateUrl: "views/minor.html",
                resolve: {

                }
            })
            .state('app.task', {
                url: "/task",
                controller:'TaskController',
                templateUrl: "views/app/task/task.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'scripts/controller/app/task/Task.controller.js',
                          'ui.sortable',
                      ]);
                  }]
                }
            })
            .state('portal', {
                url: "/portal",
                templateUrl: "views/portal/portal.html",
                data: { pageTitle: '首页', specialClass: 'landing-page' },
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
            .state('login', {
                url: "/login",
                controller:'LoginController',
                templateUrl: "views/portal/login.html",
                data: { pageTitle: '登录', specialClass: 'gray-bg'},
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'scripts/controller/portal/Login.controller.js',
                          'scripts/factory/Session.factory.js',
                      ]);
                  }]
                }
            })
            .state('register', {
                url: "/register",
                controller:'RegisterController',
                templateUrl: "views/portal/register.html",
                data: { pageTitle: '注册', specialClass: 'gray-bg'},
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'scripts/controller/portal/Register.controller.js',
                          'scripts/factory/Session.factory.js',
                      ]);
                  }]
                }
            })
        }
    ])
  .run();
