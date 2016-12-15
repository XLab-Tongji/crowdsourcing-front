'use strict';

app.controller('MilestoneDetailController', ['$scope', '$state', '$stateParams', 'ToasterTool', 'ProjectFactory', 'HttpResponseFactory', 'ErrorHandlerFactory', 'SessionService', 'UserFactory', function ($scope,

  $state, $stateParams, ToasterTool, ProjectFactory, HttpResponseFactory, ErrorHandlerFactory, SessionService, UserFactory) {

  $scope.tab = 1;

  var project_id = $stateParams.id;
  var milestoneId = $stateParams.milestoneId;

  $scope.projectName = "";
  $scope.assignee_id;

  var errorHandler = ErrorHandlerFactory.handle;

  var statelist = ["open", "close", "reopen"]

  init();

  function init() {


    getMilestoneDetail();
    getNowUserId(SessionService.getCurrentUser().username);

    console.log($scope.assignee_id);
  }

  $scope.issuelistBacklog = [];
  $scope.issuelistOngoing = [];
  $scope.issuelistDone = [];



  //get milestone info
  function getMilestoneDetail() {
    ProjectFactory.getMilestoneDetails().get({
      'id': project_id,
      'milestoneId': milestoneId
    })
      .$promise
      .then(function (response) {
        if (HttpResponseFactory.isResponseSuccess(response)) {
          var data = HttpResponseFactory.getResponseData(response);
          $scope.milestone = data.milestone;
          $scope.milestoneissue = data.milestone.issues;
          statusFilter($scope.milestoneissue);


        } else {
          errorHandler(response);
        }
      })
      .catch(errorHandler);
  }

  //filter milestone issue by state 
  function statusFilter(issuelist) {

    for (var i = 0; i < issuelist.length; i++) {
      if ((issuelist[i].state == "opened" || issuelist[i].state == "reopened") && (issuelist[i].assignee != null)) {
        $scope.issuelistOngoing.push(issuelist[i]);
      } else if (issuelist[i].state == "closed") {
        $scope.issuelistDone.push(issuelist[i]);
      } else {
        $scope.issuelistBacklog.push(issuelist[i]);
      }

    }


  }
  var itemid;
  /*option for sortable, a life cycle in move, B-->C, B remove(),update()，C receive(),update() 
  */
  function createOptions(listName) {
    // var issuename=item.context.textContent;
    var _listName = listName;
    var options = {
      placeholder: "agile-detail",
      connectWith: ".sortable-list",

      helper: function (e, item) {
        console.log("list " + _listName + ": helper" + item);
        itemid = getIssuesID(item.context.textContent);
        console.log(itemid);
        itemid = getIssueRealId(itemid);
        return item;
      },
      activate: function () {
        console.log("list " + _listName + ": activate");
      },
      beforeStop: function () {
        console.log("list " + _listName + ": beforeStop");
      },
      change: function () {
        console.log("list " + _listName + ": change");
      },
      create: function () {
        console.log("list " + _listName + ": create");
      },
      deactivate: function () {
        console.log("list " + _listName + ": deactivate");
      },
      out: function () {
        console.log("list " + _listName + ": out");
      },
      over: function () {
        console.log("list " + _listName + ": over");
      },
      receive: function () {
        console.log(itemid);

        if (_listName == "A") {
          // changeState(itemid, "open", "null");
        } else if (_listName == "B") {

          changeState(itemid, "reopen", $scope.assignee_id);

        } else if (_listName == "C") {
          changStateToClose(itemid, "close");
        }


        console.log("list " + _listName + ": receive");

      },
      remove: function () {
        console.log("list " + _listName + ": remove");
      },
      sort: function () {
        console.log("list " + _listName + ": sort");
      },
      start: function () {
        console.log("list " + _listName + ": start");
      },
      stop: function () {
        console.log("list " + _listName + ": stop");
      },
      update: function () {
        console.log("list " + _listName + ": update");
      }
    };
    return options;
  }

  $scope.sortableOptionsList = [createOptions('A'), createOptions('B'), createOptions('C')];



  //put milestone function
  function changeState(issue_id, state, assignee_id) {

    ProjectFactory.changeMilestoneIssueState().put({
      'id': project_id,
      'issue_id': issue_id,
      'state': state,
      'assignee_id': assignee_id
    })
      .$promise
      .then(function (response) {
        if (HttpResponseFactory.isResponseSuccess(response)) {
          var data = HttpResponseFactory.getResponseData(response);
          if (response.code == 200) {
            ToasterTool.success('issue变更成功', '');
          } else {
            ToasterTool.error('issue 变更失败', '');
          }
        }
      })
  }
  //put milestone function to close 
  function changStateToClose(issue_id, state) {
    ProjectFactory.changeMilestoneIssueState().put({
      'id': project_id,
      'issue_id': issue_id,
      'state': state
    })
      .$promise
      .then(function (response) {
        if (HttpResponseFactory.isResponseSuccess(response)) {
          var data = HttpResponseFactory.getResponseData(response);
          if (response.code == 200) {
            ToasterTool.success('issue关闭成功', '');
          } else {
            ToasterTool.error('issue 关闭失败', '');
          }
        }
      })

  }


  //get issue id 
  function getIssuesID(str) {
    //获得第一个空格之前的数字
    var result;

    result = str.split(/ /);
    return result[1];
  }


  //获得当前用户登录id

  function getNowUserId(str) {
    UserFactory.getUserListbyUserName().get({
      'username': str
    })
      .$promise
      .then(function (response) {
        var data = response.data;
        $scope.assignee_id = data[0].id;
      })

  }

  //通过issue iid 获取issue id
  function getIssueRealId(id) {

    var realid;

    for (var i = 0; i < $scope.milestoneissue.length; i++) {

      if (id == $scope.milestoneissue[i].iid) {
        realid = $scope.milestoneissue[i].id;
      }

    }

    return realid;
  }

  //判断是在open或者reopen状态下是否具有assignee
  function assigneeIsOrNo(issue) {





  }

  /*判断undo和doing状态。open状态下到backlog状态，如果assigne已分配，则assign状态变为null,statues不变（还是open）,
  即在on doing状态下都是已分配的issue，如果用户自己移动，则分配给当前用户。close状态则改变state即可。从close移动出来的issue状态是reopen。
  即reopen open close三种状态，区分open在backlog或者是ondoing状态需要判定assign是否为空，为空就是backlog，不为空就是ondoing
  close 状态不能设置为null。否则gitlab会出bug。assigned null状态只有在backlog
  ***gitlab 不会将assignee设置为null时将issue放回backlog？？再进行分配就会有问题（reopen才可以进行分配）
  ***系统限制，如果是reopen状态不能将assignee设置为null,只能改变assignee id。
  ***即不存在再将问题移动到backlog里的操作逻辑***
  */





  // function getMilestoneLabels(){
  //   ProjectFactory.getMilestoneLabels().get({
  //     'id':project_id,
  //     'milestone':$scope.milestone.title
  //   })
  //   .$promise
  //   .then(function(response){
  //     if(HttpResponseFactory.isResponseSuccess(response)){
  //       var data = HttpResponseFactory.getResponseData(response);
  //       $scope.backlog = data[0];
  //       $scope.ongoing = data[1];
  //       $scope.completed = data[2];

  //       for(var x = 0; x < $scope.backlog.length; x ++) {
  //         $scope.backlog[x].index = x;
  //       }
  //       for(var x = 0; x < $scope.backlog.length; x ++) {
  //         $scope.ongoing[x].index = x;
  //       }
  //       for(var x = 0; x < $scope.backlog.length; x ++) {
  //         $scope.completed[x].index = x;
  //       }

  //     }else{
  //       errorHandler(response);
  //     }
  //   })
  //   .catch(errorHandler);
  // }

  // $scope.sortableOptions = {
  //   connectWith: ".connectList",
  //   update: function (event, ui) {
  //     if (ui.item.sortable.received) {
  //       console.log("aaa");
  //         ProjectFactory.updateMilestoneIssue().put({
  //         'id':project_id,
  //         'issue_id':$scope.issue.id,

  //       })
  //     }

  //   }
  // };


}]);