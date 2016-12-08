'use strict';

/**
 * Git 项目 api
 */
angular.module('crowdsourcing')
    .factory('ProjectFactory', function($resource, $rootScope, SessionService) {
        var baseUrl = base_Url;
        var XbaseUrl = xie_base_Url + '/projects';
        var XXbaseUrl = xie_base_Url + '/project';
        var XXXbaseUrl = xie_base_Url + '/issues'

        return {

            createProject: function() {
                return $resource(XbaseUrl + '/', {}, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectList: function() {
                return $resource(XbaseUrl + '/', {}, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectDetail: function() {
                return $resource(XbaseUrl + '/:id', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectContent: function() {
                return $resource(XXbaseUrl + '/:id/tree?path=:path', { id: '@id', path: '{{path}}' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers(),
                        //isArray: true
                    }
                });
            },


            //获取项目下的issue
            getProjectIssues: function() {
                return $resource(XXXbaseUrl + '/project/:id', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectIssueDetail: function() {
                return $resource(XbaseUrl + '/:id/issues/:issueId', { id: '@id', issueId: 'issueId' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            deleteProject: function() {
                return $resource(XbaseUrl + '/:id', { id: '@id' }, {
                    'delete': {
                        method: 'DELETE',
                        headers: SessionService.headers()
                    }
                });
            },
            getProjectFileDetail: function() {
                return $resource(XXbaseUrl + '/:id/files?filepath=:path', { id: '@id', path: '{{path}}' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectBranchesList: function() {
                return $resource(XbaseUrl + '/:id/repository/branches', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            createBranch: function() {
                return $resource(XbaseUrl + '/:id/repository/branches/:branchname/:ref', { id: '@id', branchname: '@branchname', ref: '@ref' }, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectBranchesNameList: function() {
                return $resource(XbaseUrl + '/:id/repository/branches/names', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },

            getProjectBranchDetail: function() {
                return $resource(XXbaseUrl + '/:id/tree?path=:path&ref_name=:ref_name', { id: '@id', path: '{{path}}', ref_name: '{{ref_name}}' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },
            getProjectBranchFileDetail: function() {
                return $resource(XXbaseUrl + '/:id/files?sha=:ref_name&filepath=:path', { id: '@id', ref_name: '{{ref_name}}', path: '{{path}}' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },
            //获取项目issue标签
            getProjectIssueLabels: function() {
                return $resource(XXbaseUrl + '/:id/labels', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            },
            //新建issue
            createProjectIssue: function() {
                return $resource(XXXbaseUrl + '/project/:id', { id: '@id' }, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                })
            },
            //新建label
            createLabels: function() {
                return $resource(XXbaseUrl + '/:id/labels', { id: '@id' }, {
                    'post': {
                        method: 'POST',
                        headers: SessionService.headers()
                    }
                })

            },
            resetProject: function() {
                return $resource(XbaseUrl + '/:id', { id: '@id' }, {
                    'put': {
                        method: 'PUT',
                        headers: SessionService.headers()
                    }
                });
            },

            getMilestonelist: function() {
                return $resource(XbaseUrl + '/:id/milestone', { id: '@id' }, {
                    'get': {
                        method: 'GET',
                        headers: SessionService.headers()
                    }
                });
            }



        };
    });
