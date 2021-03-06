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
                    ncyBreadCrumb: {
                        label: 'Project List'
                    },
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
                    ncyBreadCrumb: {
                        label: 'Project Create'
                    },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/ProjectCreate.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/service/Session.service.js',
                                'scripts/factory/ProjectGroup.factory.js',
                            ]);
                        }]
                    }
                })

                .state('app.project-detail', {
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
                    controller: "ProjectCodesController",
                    data: { pageTitle: '项目' },
                    templateUrl: "views/app/project/project_codes.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                                'scripts/controller/app/project/ProjectCodes.controller.js',
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
                .state('app.project-issues-detail', {
                    url: "/:id/issue/:issueId",
                    controller: "IssueDetailController",
                    templateUrl: "views/app/project/issue_detail.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/IssueDetail.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
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
                .state('app.contact.follower', {
                    url: "/follower",
                    templateUrl: "views/app/contact/follower.html",
                    resolve: {

                    }
                })

                .state('app.project_group', {
                    url: "/project_group",
                    controller: 'ProjectGroupManagerController',
                    data: { pageTitle: '项目组', specialClass: 'fixed-sidebar' },
                    templateUrl: "views/app/project_group/project_group_list.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project_group/ProjectGroupManager.controller.js',
                                'scripts/factory/ProjectGroup.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
                                'scripts/service/Session.service.js',

                            ]);
                        }]
                    }
                })

                .state('app.project_group-create', {
                    url: "/project_group/create",
                    controller: 'ProjectGroupCreateController',
                    data: { pageTitle: '新建项目组' },
                    templateUrl: "views/app/project_group/create_projectgroup.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project_group/ProjectGroupCreate.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/service/Session.service.js',
                            ]);
                        }]
                    }
                })

                .state('app.project_group-detail', {
                    url: "/project_group/detail/:id",
                    controller: 'ProjectGroupDetailController',
                    data: { pageTitle: '项目组详情' },
                    templateUrl: "views/app/project_group/project_group_detail.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project_group/ProjectGroupDetail.controller.js',
                                'scripts/factory/ProjectGroup.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
                                'lib/libs/icheck.min.js',
                                'lib/css/custom.css',
                                'ui.checkbox',
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
                    url: "/memberDetail/:userid",
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

                //分支文件查看页面
                .state('app.project-detail.codes.branchescommits', {
                    url: "/:project_id/branches/:branch_name/commits?path",
                    controller: "ProjectBranchesCommitsController",
                    templateUrl: "views/app/project/project_branch_commits.html",
                    data: { pageTitle: '分支查看' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                                'scripts/controller/app/project/ProjectBranchesCommits.controller.js',
                                'scripts/factory/Project.factory.js',
                            ]);
                        }]
                    }
                })
                //用户所有issue
                .state('app.issue', {
                    url: "/myissue",
                    controller: 'IssueManagerController',
                    data: { pageTitle: '问题' },
                    templateUrl: "views/app/issue/issue_list.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/issue/IssueManager.controller.js',
                                'scripts/factory/Issue.factory.js',
                            ]);
                        }]
                    }
                })


                //新issue创建页面
                .state('app.issue-create', {
                    url: "/:project_id/issuecreate",
                    controller: "ProjectIssueCreateController",
                    templateUrl: "views/app/project/project_issue_create.html",
                    data: { pageTitle: '创建issues' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                                'scripts/controller/app/project/ProjectIssueCreate.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
                                'scripts/service/General.service.js'

                            ]);
                        }]
                    }
                })


                .state('app.labels-create', {
                    url: "/:project_id/labelscreate",
                    controller: "ProjectLabelsCreate",
                    templateUrl: "views/app/project/create_labels.html",
                    data: { pageTitle: '创建label' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                                'scripts/controller/app/project/LabelsCreate.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
                                'scripts/service/General.service.js'

                            ]);
                        }]
                    }
                })


                //项目重新设置
                .state('app.project-reset', {
                    url: "/project/reset/:id",
                    controller: 'ProjectResetController',
                    data: { pageTitle: '项目设置' },
                    templateUrl: "views/app/project/project_reset.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/ProjectReset.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/service/Session.service.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
                            ]);
                        }]
                    }
                })
                //获取milestone
                .state('app.milestone', {
                    url: "/:id/milestones",
                    controller: 'MilestoneManagerController',
                    data: { pageTitle: '里程碑' },
                    templateUrl: "views/app/milestone/milestone.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/MilestoneManager.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
                            ]);
                        }]
                    }
                })
                .state('app.milestone-detail', {
                    url: "/:id/milestonedetail/:milestoneId",
                    controller: 'MilestoneDetailController',
                    data: { pageTitle: '里程碑' },
                    templateUrl: "views/app/milestone/milestone_detail.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/MilestoneDetail.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
                                'lib/css/custom.css',
                                'scripts/factory/User.factory.js'
                            ]);
                        }]
                    }
                })

                //项目没有文件
                .state('app.project-detail.nocontent', {
                    url: "/nocontent",
                    data: { pageTitle: '里程碑' },
                    templateUrl: "views/common/nofilecontent.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([

                            ]);
                        }]
                    }
                })
                //新建milestone
                .state('app.milestone-create', {
                    url: "/:id/milestone/create",
                    controller: 'MilestoneCreateController',
                    data: { pageTitle: '新建项目' },
                    templateUrl: "views/app/milestone/create_milestone.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/MilestoneCreate.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/service/Session.service.js',
                                'scripts/factory/HttpResponse.factory.js',
                                'scripts/factory/ErrorHandler.factory.js',
                            ]);
                        }]
                    }
                })
                //代码检测页面
                .state('app.codeAnalysis', {
                    url: "/codeAnalysis",
                    controller: 'CodeMeasureController',
                    data: { pageTitle: '代码分析' },
                    templateUrl: "views/app/codemeasures/CAContainer.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/code_analysis/CodeMeasure.controller.js',
                                'scripts/controller/app/code_analysis/TaskRecord.controller.js',
                                'scripts/controller/app/code_analysis/ModuleMeasure.controller.js',
                                'scripts/factory/Project.factory.js',
                                'scripts/factory/CodeAnalysis.factory.js',
                                'styles/rotate.css',
                                'styles/spinner.css'
                            ]);
                        }]
                    }
                })
                .state('app.codeAnalysis.sonarqube', {
                    url: "/sonarqube",
                    params: {"projectUrl":null},
                    controller:'CodeMeasureController',
                    templateUrl: "views/app/codemeasures/sonarqube.html",
                    resolve: {

                    }
                })
                .state('app.codeAnalysis.recordslist', {
                    url: "/recordslist",
                    controller:'CodeMeasureController',
                    templateUrl: "views/app/codemeasures/recordsList.html",
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'styles/footable/footable.core.css',
                                'lib/footable/footable.all.min.js'
                            ]);
                        }]
                    }
                })
                // 机器学习报告汇总页
                .state('app.codeAnalysis.measureslist', {
                    url: "/measureslist",
                    controller:'CodeMeasureController',
                    templateUrl: "views/app/codemeasures/measuresList.html",
                    resolve: {

                    }
                })
                .state('app.codeAnalysis.records', {
                    url: "/records/:id",
                    params: {"name":null, "id":"id"},
                    // 新的TaskRecordController来处理
                    controller:'TaskRecordController',
                    templateUrl: "views/app/codemeasures/records.html",
                    resolve: {

                    }
                })
                .state('app.codeAnalysis.measures', {
                    url: "/measures/:id",
                    params: {"id":"id"},
                    controller:'ModuleMeasureController',
                    templateUrl: "views/app/codemeasures/measures.html",
                    resolve: {
                        // controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                        //     return $ocLazyLoad.load([
                        //         'scripts/controller/app/code_analysis/ModuleMeasure.controller.js'
                        //     ]);
                        // }]
                    }
                })
                .state('app.codeAnalysis.issues', {
                    url: "/issues",
                    templateUrl: "views/app/codemeasures/issues.html",
                    resolve: {

                    }
                })

                //项目提交信息统计页面
                .state('app.project-detail.codes.commitStatistic', {
                    url: "/:project_id/commitStatistic",
                    controller: "ProjectCommitStatisticController",
                    templateUrl: "views/app/project/project_commit_display.html",
                    data: { pageTitle: '项目提交统计' },
                    resolve: {
                        controller: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'scripts/controller/app/project/ProjectCommitDisplay.controller.js',
                                'scripts/factory/Project.factory.js',
                            ]);
                        }]
                    }
                })




        }
    ])
    .run();
