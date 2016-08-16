/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
 'use strict';

 var app =
   angular.module('crowdsourcing')
     .config(
     ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
       function($controllerProvider, $compileProvider, $filterProvider, $provide) {
         // lazy controller, directive and service
         app.controller = $controllerProvider.register;
         app.directive = $compileProvider.directive;
         app.filter = $filterProvider.register;
         app.factory = $provide.factory;
         app.service = $provide.service;
         app.constant = $provide.constant;
         app.value = $provide.value;
       }
     ])
    //  .config(['$provide', function ($provide) {
    //    $provide.decorator('taOptions', ['$delegate', function (taOptions) {
    //      taOptions.toolbar = [
    //        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
    //        ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
    //        ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
    //        ['insertImage', 'insertLink']
    //      ];
     //
    //      return taOptions;
    //    }]);
    //  }]);
     .config(function ($httpProvider){
      //  $httpProvider.interceptors.push('loadingInterceptor');
       $httpProvider.interceptors.push('authInterceptor');
     });
