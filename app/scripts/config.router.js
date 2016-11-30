'use strict';

angular.module('crowdsourcing')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
    )
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/portal');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: "/index",
                    controller: 'AppController',
                    templateUrl: "views/common/content.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/App.controller.js',
                            ]);
                        }]
                    }
                })
                .state('app.main', {
                    url: "/main",
                    controller: 'MainController',
                    templateUrl: "views/app/main.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/Main.controller.js',
                            ]);
                        }]
                    }
                })
                .state('app.project', {
                    url: "/project",
                    controller: 'ProjectManagerController',
                    data: { pageTitle: '项目' },
                    templateUrl: "views/app/project/project_list.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/ProjectManager.controller.js',
                                'scripts/factory/Project.factory.js',
                            ]);
                        }]
                    }
                })

                .state('app.project-crud', {
                    abstract: true,
                    url: "/project/:id",
                    controller: 'ProjectManagerController',
                    data: { pageTitle: '项目' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/ProjectManagerController.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/service/Session.service.js',
                            ]);
                        }]
                    }
                })

                .state('app.project-create', {
                    url: "/project/create",
                    controller: 'ProjectCreateController',
                    data: { pageTitle: '新建项目' },
                    templateUrl: "views/app/project/create_project.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/ProjectCreate.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/service/Session.service.js',
                            ]);
                        }]
                    }
                })


                .state('app.project-detail', {
                    abstract: true,
                    url: "/project/detail/:id",
                    controller: 'ProjectDetailController',
                    data: { pageTitle: '项目' },
                    templateUrl: "views/app/project/project_detail.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                    }
                })
                .state('app.project-detail.codes', {
                    abstract: true,
                    url: "/codes",
                    controller:"ProjectCommitsController",
                    data: { pageTitle: '项目' },
                    templateUrl: "views/app/project/project_codes.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                               
                                'scripts/controller/app/project/ProjectCommits.controller.js',
                                'scripts/factory/Project.factory.js',


                            ]);
                        }]
                    }
                })
                .state('app.project-detail.codes.commits', {
                    url: "/commits?path",
                    controller: 'ProjectCommitsController',
                    templateUrl: "views/app/project/project_commits.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/ProjectIssue.controller.js',
                                'scripts/service/General.service.js',
                            ]);
                        }]
                    }
                })
                .state('app.project-detail.issues-detail', {
                    url: "/detail/:issueId",
                    controller: "IssueDetailController",
                    templateUrl: "views/app/project/issue_detail.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/IssueDetail.controller.js',
                            ]);
                        }]
                    }
                })
                .state('app.project-detail.files', {
                    url: "/files",
                    templateUrl: "views/app/project/project_files.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                            ]);
                        }]
                    }
                })
                //项目成员信息
                .state('app.project-detail.members', {
                    url: "/members",
                    controller: 'ProjectMembersController',
                    templateUrl: "views/app/project/project_members.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                    controller: 'TaskController',
                    data: { pageTitle: '任务' },
                    templateUrl: "views/app/task/task.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/task/Task.controller.js',
                                'ui.sortable',
                            ]);
                        }]
                    }
                })
                .state('app.group', {
                    url: "/group",
                    controller: 'GroupManagerController',
                    data: { pageTitle: '团队', specialClass: 'fixed-sidebar' },
                    templateUrl: "views/app/group/group_list.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/group/GroupManager.controller.js',
                                'scripts/factory/Group.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
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
                    data: { pageTitle: '通知' },
                    templateUrl: "views/app/notification/notification.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
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
                    controller: 'LoginController',
                    templateUrl: "views/portal/login.html",
                    data: { pageTitle: '登录', specialClass: 'gray-bg' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/portal/Login.controller.js',
                                'scripts/factory/Session.factory.js',
                            ]);
                        }]
                    }
                })
                .state('register', {
                    url: "/register",
                    controller: 'RegisterController',
                    templateUrl: "views/portal/register.html",
                    data: { pageTitle: '注册', specialClass: 'gray-bg' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/portal/Register.controller.js',
                                'scripts/factory/Session.factory.js',
                            ]);
                        }]
                    }

                })
                //开发者详情页
                .state('app.memberDetail', {
                    url: "/memberDetail/:username",
                    controller: "UserDetailController",
                    templateUrl: "views/app/contact/member_detail.html",
                    data: { pageTitle: '个人详情' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                                'scripts/controller/app/account/UserDetail.controller.js',
                                'scripts/factory/User.factory.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js'


                            ]);
                        }]
                    }
                })

                //分支列表
                .state('app.project-detail.codes.branches', {
                    url: "/:project_id/branches",
                    controller: "ProjectBranchesController",
                    templateUrl: "views/app/project/project_branches_list.html",
                    data: { pageTitle: '项目分支' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([



                                'scripts/controller/app/project/ProjectBranches.controller.js',
                                'scripts/factory/Project.factory.js',


                            ]);
                        }]
                    }
                })
                //分支创建页面
                .state('app.branch-create', {
                    url: "/:project_id/branchcreate",
                    controller: "ProjectBranchesController",
                    templateUrl: "views/app/project/project_branches_create.html",
                    data: { pageTitle: '创建分支' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([


                                'scripts/controller/app/project/ProjectBranches.controller.js',
                                'scripts/factory/Project.factory.js',


                            ]);
                        }]
                    }
                })

        }
    ])
    .run();
