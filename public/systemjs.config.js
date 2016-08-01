/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app': 'build/', // 'dist',
    '@angular': 'assets/@angular',
    'angular2-in-memory-web-api': 'assets/angular2-in-memory-web-api',
    'rxjs': 'assets/rxjs',
    // 'ng2-bootstrap': 'assets/ng2-bootstrap/',
    'moment': 'assets/moment',
    'angular2-locker': 'assets/angular2-locker'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': {
      main: 'main.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'angular2-locker': {
      main: '/dist/locker',
      defaultExtension: 'js'
    },
    'moment': {
      main: 'moment.js',
      defaultExtension: 'js'
    }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // var materialPkgs = [
  //   'core',
  //   'button',
  //   'card',
  //   'checkbox',
  //   'grid-list',
  //   'icon',
  //   'input',
  //   'list',
  //   'menu',
  //   'progress-bar',
  //   'progress-circle',
  //   'radio',
  //   'slidenav',
  //   'slide-toggle',
  //   'tabs',
  //   'toolbar'
  // ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = {
      main: '/bundles/' + pkgName + '.umd.js',
      defaultExtension: 'js'
    };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };

  // materialPkgs.forEach(function(pkg) {
  //   packages[("@angular2-material/" + pkg)] = {
  //     main: pkg + ".js"
  //   };
  // });
  System.config(config);
})(this);
