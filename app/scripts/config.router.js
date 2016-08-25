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
                          'scripts/factory/Project.factory.js',
                      ]);
                  }]
                }
            })
            .state('app.project-detail', {
                abstract:true,
                url: "/project/detail/:id",
                controller:'ProjectDetailController',
                data: { pageTitle: '项目'},
                templateUrl: "views/app/project/project_detail.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                        'scripts/controller/app/project/ProjectDetail.controller.js',
                        'scripts/factory/Project.factory.js',
                        'scripts/factory/HttpResponse.factory.js',
                        'scripts/factory/ErrorHandler.factory.js',
                        'lib/libs/icheck.min.js',
                        'lib/css/custom.css',
                        'ui.checkbox',
                      ]);
                  }]
                },
                params:{
                  data:null
                }
            })
            .state('app.project-detail.codes', {
                abstract:true,
                url: "/codes",
                data: { pageTitle: '项目'},
                templateUrl: "views/app/project/project_codes.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                      ]);
                  }]
                }
            })
            .state('app.project-detail.codes.commits', {
                url: "/commits",
                controller:'ProjectCommitsController',
                templateUrl: "views/app/project/project_commits.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                        'scripts/controller/app/project/ProjectCommits.controller.js',
                        'scripts/factory/Project.factory.js',
                      ]);
                  }]
                }
            })
            .state('app.project-detail.tasks', {
                url: "/tasks",
                templateUrl: "views/app/project/project_tasks.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                      ]);
                  }]
                }
            })
            .state('app.project-detail.issues', {
                url: "/issues",
                controller: "ProjectIssuesController",
                templateUrl: "views/app/project/project_issues.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                        'scripts/controller/app/project/ProjectIssue.controller.js',
                        'scripts/service/General.service.js',
                      ]);
                  }]
                }
            })
            .state('app.project-detail.issues-detail', {
                url: "/detail",
                controller: "IssueDetailController",
                templateUrl: "views/app/project/issue_detail.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                        'scripts/controller/app/project/IssueDetail.controller.js',
                      ]);
                  }]
                },
                params:{
                  data:null
                }
            })
            .state('app.project-detail.files', {
                url: "/files",
                templateUrl: "views/app/project/project_files.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                      ]);
                  }]
                }
            })
            .state('app.project-detail.members', {
                url: "/members",
                controller:'ProjectMembersController',
                templateUrl: "views/app/project/project_members.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                        'scripts/controller/app/project/ProjectMember.controller.js',
                        'scripts/factory/Project.factory.js',
                        'scripts/factory/HttpResponse.factory.js',
                        'scripts/factory/ErrorHandler.factory.js',
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
                data: { pageTitle: '任务'},
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
            .state('app.group', {
                url: "/group",
                controller:'GroupManagerController',
                data: { pageTitle: '团队', specialClass: 'fixed-sidebar'},
                templateUrl: "views/app/group/group_list.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          'scripts/controller/app/group/GroupManager.controller.js',
                      ]);
                  }]
                }
            })
            .state('app.contact', {
                abstract: true,
                url: "/contact",
                templateUrl: "views/app/contact/contact_container.html",
            })
            .state('app.contact.following', {
                url: "/following",
                templateUrl: "views/app/contact/following.html",
                resolve: {

                }
            })
            .state('app.contact.follower', {
                url: "/follower",
                templateUrl: "views/app/contact/follower.html",
                resolve: {

                }
            })
            .state('app.notification', {
                url: "/notification",
                data: { pageTitle: '通知'},
                templateUrl: "views/app/notification/notification.html",
                resolve: {
                  controller: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([

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
