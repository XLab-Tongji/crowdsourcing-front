/**
 * 统一的 SweetAlert 提示框服务
 *  ~ 如果要扩展，参考 http://t4t5.github.io/sweetalert/
 *
 * 调用方式
 *
 *  通用alert(single button)
 *  AlertTool.alert(options).then(function() {
 *
 *  });
 *
 *  success alert(single button)
 *  AlertTool.success(options).then(function() {
 *
 *  });
 *
 *  warning alert(single button)
 *  AlertTool.warning(options).then(function() {
 *
 *  });
 *
 *  error alert(single button)
 *  AlertTool.error(options).then(function() {
 *
 *  });
 *
 *  confirm alert(double button)
 *  AlertTool.confirm(options).then(function(isConfirm) {
 *    if(isConfirm) {
 *      AlertTool.close();
 *    }
 *  });
 *
 *  delete confirm alert(double button)
 *  AlertTool.deleteConfirm(options).then(function(isConfirm) {
 *    if(isConfirm) {
 *      AlertTool.close();
 *    }
 *  });
 */
angular.module('crowdsourcing')
  .service('AlertTool', ['SweetAlert', '$popover', '$q', '$window', function (SweetAlert, $popover, $q, $window) {
    this.alert = function (options) {
      var deferred = $q.defer();

      options = options || {};
      options.confirmButtonText = options.confirmButtonText || '确定';
      options.cancelButtonText = options.cancelButtonText || '取消';

      SweetAlert.swal(options, function (data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    };

    this.confirm = function (options) {
      var deferred = $q.defer();

      options = options || {};
      options.showCancelButton = true;
      options.closeOnConfirm = false;
      options.confirmButtonText = options.confirmButtonText || '确定';
      options.cancelButtonText = options.cancelButtonText || '取消';

      SweetAlert.swal(options, function (isConfirm) {
        deferred.resolve(isConfirm);
      });

      return deferred.promise;
    };

    this.deleteConfirm = function (options) {
      options.type = options.type ? options.type : 'error';
      return this.confirm(options);
    };

    this.success = function (options) {
      options.type = options.type ? options.type : 'success';
      return this.alert(options);
    };

    this.warning = function (options) {
      options.type = options.type ? options.type : 'warning';
      return this.alert(options);
    };

    this.error = function (options) {
      options.type = options.type ? options.type : 'error';
      return this.alert(options);
    };

    this.close = function () {
      $window.swal.close();
    };

    this.popover = function(element, content, isShow, trigger){
      var trig = trigger || 'click';
      var pop = $popover(element, {content:content, trigger:trig});
      if(isShow){
        pop.$promise.then(pop.toggle);
      }
      return pop;
    };



  }]);
