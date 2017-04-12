require.config({
  paths: {
      'angular' : '../../node_modules/angular/angular.min',
	  
	  
  },
  shim: {
      angular: {
          exports : 'angular'
      }
  },
  baseUrl: './js'
});

require(['app'], function (app) {
  app.init();
});
