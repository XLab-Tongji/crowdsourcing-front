'use strict';

app.controller('TaskController', ['$scope', '$state', 'ToasterTool', 'SessionService',  function($scope,
    $state, ToasterTool, SessionService) {

    $scope.todoList = [
        {
            content: 'Simply dummy text of the printing and typesetting industry.',
            date: '12.10.2015',
            statusClass: 'warning',
            tagName: 'Mark'
        },
        {
            content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
            date: '05.04.2015',
            statusClass: 'success',
            tagName: 'Tag'
        },
        {
            content: 'Sometimes by accident, sometimes on purpose (injected humour and the like).',
            date: '16.11.2015',
            statusClass: 'info',
            tagName: 'Mark'
        },
        {
            content: 'All the Lorem Ipsum generators',
            date: '06.10.2015',
            statusClass: 'danger',
            tagName: 'Tag'
        },
        {
            content: 'Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
            date: '09.12.2015',
            statusClass: 'warning',
            tagName: 'Mark'
        },
        {
            content: 'Packages and web page editors now use Lorem Ipsum as',
            date: '08.04.2015',
            statusClass: 'warning',
            tagName: 'Mark'
        },
        {
            content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
            date: '05.04.2015',
            statusClass: 'success',
            tagName: 'Tag'
        },
        {
            content: 'Sometimes by accident, sometimes on purpose (injected humour and the like).',
            date: '16.11.2015',
            statusClass: 'info',
            tagName: 'Tag'
        }
    ];
    $scope.inProgressList = [
        {
            content: 'Quisque venenatis ante in porta suscipit.',
            date: '12.10.2015',
            statusClass: 'success',
            tagName: 'Mark'
        },
        {
            content: ' Phasellus sit amet tortor sed enim mollis accumsan in consequat orci.',
            date: '05.04.2015',
            statusClass: 'success',
            tagName: 'Tag'
        },
        {
            content: 'Nunc sed arcu at ligula faucibus tempus ac id felis. Vestibulum et nulla quis turpis sagittis fringilla.',
            date: '16.11.2015',
            statusClass: 'warning',
            tagName: 'Mark'
        },
        {
            content: 'Ut porttitor augue non sapien mollis accumsan. Nulla non elit eget lacus elementum viverra.',
            date: '09.12.2015',
            statusClass: 'warning',
            tagName: 'Tag'
        },
        {
            content: 'Packages and web page editors now use Lorem Ipsum as',
            date: '08.04.2015',
            statusClass: 'info',
            tagName: 'Tag'
        },
        {
            content: 'Quisque lacinia tellus et odio ornare maximus.',
            date: '05.04.2015',
            statusClass: 'success',
            tagName: 'Mark'
        },
        {
            content: 'Enim mollis accumsan in consequat orci.',
            date: '11.04.2015',
            statusClass: 'danger',
            tagName: 'Tag'
        }
    ];
    $scope.completedList = [
        {
            content: 'Sometimes by accident, sometimes on purpose (injected humour and the like).',
            date: '16.11.2015',
            statusClass: 'info',
            tagName: 'Mark'
        },
        {
            content: 'Ut porttitor augue non sapien mollis accumsan. Nulla non elit eget lacus elementum viverra.',
            date: '09.12.2015',
            statusClass: 'warning',
            tagName: 'Tag'
        },
        {
            content: 'Which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
            date: '09.12.2015',
            statusClass: 'warning',
            tagName: 'Tag'
        },
        {
            content: 'Packages and web page editors now use Lorem Ipsum as',
            date: '08.04.2015',
            statusClass: 'warning',
            tagName: 'Tag'
        },
        {
            content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
            date: '05.04.2015',
            statusClass: 'success',
            tagName: 'Mark'
        },
        {
            content: 'Sometimes by accident, sometimes on purpose (injected humour and the like).',
            date: '16.11.2015',
            statusClass: 'info',
            tagName: 'Tag'
        },
        {
            content: 'Simply dummy text of the printing and typesetting industry.',
            date: '12.10.2015',
            statusClass: 'warning',
            tagName: 'Mark'
        },
        {
            content: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
            date: '05.04.2015',
            statusClass: 'success',
            tagName: 'Mark'
        }
    ];

    $scope.sortableOptions = {
        connectWith: ".connectList"
    };
    
    init();

    function init(){
      // if (SessionService.getToken()) {
      //   ToasterTool.success('登录成功','欢迎回到众包平台!');
      // }
    }

}]);
