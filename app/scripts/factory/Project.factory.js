'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
    .factory('ProjectFactory', function ($resource, $rootScope, SessionService) {
        var baseUrl = base_Url;
        var XbaseUrl = xie_base_Url + '/projects';
        var XXbaseUrl = xie_base_Url + '/project';
        var XXXbaseUrl = xie_base_Url + '/issues';
        var XXXXbaseUrl=xie_base_Url+'/commit';

        return {

            getUserList: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/users', {}, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers(),
                        isArray: true
                    }
                });
            },

            createProject: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects', {}, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectList: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects?membership=true' , {}, {
                    'get': {
                        method: 'GET',
                        isArray: true,
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectDetail: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectContent: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/repository/tree?path=:path', { id: '@id', path: '{{path}}' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers(),
                        isArray: true
                    }
                });
            },


            //获取项目下的issue
            getProjectIssues: function () {
                return $resource("http://172.16.101.91:8000/proxy/api/v4/projects/:id/issues", { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        isArray: true,
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectIssueDetail: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/issues/:issueId', { id: '@id', issueId: '@issueId' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            deleteProject: function () {
                return $resource(XbaseUrl + '/:id', { id: '@id' }, {
                    'delete': {
                        method: 'DELETE',
                        headers: SessionService.headers()
                    }
                });
            },
            getProjectFileDetail: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/repository/files/:path/raw?ref=master', { id: '@id', path: '{{path}}' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectBranchesList: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/repository/branches', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers(),
                        isArray: true
                    }
                });
            },

            createBranch: function () {
                return $resource(XbaseUrl + '/:id/repository/branches/:branchname/:ref', { id: '@id', branchname: '@branchname', ref: '@ref' }, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectBranchesNameList: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/repository/branches/names', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectBranchDetail: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/repository/tree?path=:path&ref_name=:ref_name', { id: '@id', path: '{{path}}', ref_name: '{{ref_name}}' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers(),
                        isArray:true
                    }
                });
            },
            getProjectBranchFileDetail: function () {
                return $resource(XXbaseUrl + '/:id/files?sha=:ref_name&filepath=:path', { id: '@id', ref_name: '{{ref_name}}', path: '{{path}}' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },
            //获取项目issue标签
            getProjectIssueLabels: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/labels', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        isArray: true,
                        headers: SessionService.headers()
                    }
                });
            },
            //新建issue
            createProjectIssue: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/issues', { id: '@id' }, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                })
            },
            //新建label
            createLabels: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/labels', { id: '@id' }, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                })

            },
            resetProject: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id', { id: '@id' }, {
                    'put': {
                        method: 'PUT',
                        headers: SessionService.headers()
                    }
                });
            },

            getMilestonelist: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id/milestones', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        isArray: true,
                        headers: SessionService.headers()
                    }
                });
            },

            createMilestone: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id/milestones', { id: '@id' }, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                });
            },

            getMilestoneDetails: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id/milestones/:milestoneId', { id: '@id', milestoneId: '@milestoneId' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getMilestoneIssues: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id/milestones/:milestoneId/issues', { id: '@id', milestoneId: '@milestoneId'}, {
                    'get': {
                        method: 'GET',
                        isArray: true,
                        headers: SessionService.headers()
                    }
                });
            },

            getMilestoneLabels: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id/labels?milestone=:milestone', { id: '@id', milestone: '@milestone' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            updateMilestoneIssue: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id/issueid/:issue_id', { id: '@id', issue_id: '@issue_id' }, {
                    put: {
                        method: 'PUT',
                        headers: SessionService.headers()
                    }
                })
            },

            closeMilestone: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id/milestones/:milestoneId', { id: '@id', milestoneId: '@milestoneId' }, {
                    put: {
                        method: 'PUT',
                        headers: SessionService.headers()
                    }
                })
            },

            changeMilestoneIssueState: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects' + '/:id/issues/:issue_id?state_event=:state', { id: '@id', issue_id: '@issue_id', state: '@state' }, {
                    put: {
                        method: 'PUT',
                        headers: SessionService.headers()
                    }
                })
            },
            //get issue comment or activtities 
            getIssueComment: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/issues/:issue_id/notes', { id: '@id', issue_id: '@issue_id' }, {
                    get: {
                        method: 'GET',
                        isArray: true,
                        headers: SessionService.headers()
                    }
                })
            },
            //post a new issue comment
            postIssueComment: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/issues/:issue_id/notes', { id: '@id', issue_id: '@issue_id' ,body: '@body'}, {
                    post: {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                })
            },
            //get repository commit statistic data
            getCommitStatistic: function(){
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:project_id/repository/contributors',{project_id: '@project_id'},{
                    get:{
                        method: 'GET',
                        headers: SessionService.headers(),
                        isArray: true
                    }
                })
            },
            //get project members
            getProjectMembers: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/members', { id: '@id' }, {
                    get: {
                        method: 'GET',
                        isArray: true,
                        headers: SessionService.headers()
                    }
                })
            },
            //add new project member
            addProjectMember: function () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/members', { id: '@id'}, {
                    post: {
                        method: "POST",
                        headers: SessionService.headers()
                    }
                })
            },

            updateProjectMemberAccessLevel () {
                return $resource('http://172.16.101.91:8000/proxy/api/v4/projects/:id/members/:user_id?access_level=:access_level', {id: '@id', user_id: '@user_id', access_level: '@access_level'},{
                    put: {
                        method: "PUT",
                        headers: SessionService.headers()
                    }
                })
            }

        };
    });
