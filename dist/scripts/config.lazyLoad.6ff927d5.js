'use strict';

angular.module('crowdsourcing')
  // .constant('JQ_CONFIG', {
  //   slimScroll: ['../bower_components/slimscroll/jquery.slimscroll.min.js'],
  //   slider: [
  //     '../bower_components/bootstrap-slider/bootstrap-slider.js'
  //   ]
  // })
  // oclazyload config
  .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      modules: [
        {
          name: 'ui.sortable',
          files: [
            'lib/libs/sortable.js'
          ]
        },
        {
          name: 'ui.checkbox',
          files: [
            'lib/libs/angular-bootstrap-checkbox.js'
          ]
        }
      ]
    });
  }]);
