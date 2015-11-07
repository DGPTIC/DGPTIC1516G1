#La palma Outdoor sport

This is a app to sync outdoors activities located in la Palma. This app used openddata format provided by [la palma opendata](http://www.opendatalapalma.es)

#Main requirement:

1. Install [nodejs](http://nodejs.org/)
2. Install Cordova: sudo npm install -g cordova
3. Install Ionic: sudo npm install -g ionic@alpha
4. Android SDK: for Andorid sdk you can install [Android studio](https://developer.android.com/sdk/index.html) or [Android sdk sntad alone](https://developer.android.com/sdk/installing/index.html)

#Building for iOS

To build for iOS, we need to add the iOS platform module to Cordova:


### 
```bash
$  ionic platform add ios
$  npm install ios-sim //for emulate IOS you can use Xcode iOS emulator, (Mac os users only)
$  ionic prepare ios
$  ionic buld ios
$  ionic emulate ios
```

#Building for Android

To build for Android, we need to add the Android platform module to Cordova:

###
```bash
$ ionic platform add android
$ ionic prepare android
$ ionic build android
$ ionic emulate ios // You can use Android emulator, this is included with Android studio
-For test in a android Devices
$ ionic run android // For a test directly in an android device
#
```

#Building for web
For a web test you need start the ionic server. For start the server go to root project and run

###
```bash
$ ionic serve
```
This instruction will be compile your code each time that you modify any file and reload a page automatically.
You need keep open console run server for check your changes.


# Documentation 

For this project we will use the following technologies:

-For Ionic Vs2  [http://ionicframework.com/docs/v2/](http://ionicframework.com/docs/v2/)
-For Angular 2 [https://angular.io/](https://angular.io/)
-For Typescript [http://www.typescriptlang.org/](http://www.typescriptlang.org/)
-For Sass [http://sass-lang.com](http://sass-lang.com)


# Project structure
The main folder where you need to put your code is www/app. This folder containg all project code. *Please don't change any file with out this folder*


# Ionic 2 Starter: 

Ionic 2 is based on the new [2.x version of AngularJS](https://angular.io/), and comes with many significant performance, usability, and feature improvements.


## Getting Started

1. Clone repo
2. `npm install`
3. `gulp watch`

The `gulp watch` task will build Ionic2, which may take a few moments for the initial build. After the files have finished building, a browser will open with the Ionic2 starter app. Any source file changes will rebuild the app and live reload the page. Also be sure to emulate the app in iOS and Android devices ([Chrome Screen Emulation](https://developer.chrome.com/devtools/docs/device-mode#screen-emulator)).

#### Notes:
- To develop against the ionic2 master branch (or any commit/release/tag), you'll need to do the following:
```bash
# you can install from either a local ionic2 or from github
# use ~/git/ionic2#commit for a specific commit

# npm install driftyco/ionic2  #github
$ npm install ~/git/ionic2  #local
$ cd node_modules/ionic2 && npm install
$ gulp src
```
And then update your [`webpack.config.js`](https://github.com/driftyco/ionic2-starter/blob/master/webpack.config.js#L32) file:
```js
resolve: {
  modulesDirectories: [
    "node_modules",
  //"node_modules/ionic-framework/src/es5/common"
    "node_modules/ionic2/dist/src/es5/common"
  ]
}
```
As well as your [`gulpfile.js`](https://github.com/driftyco/ionic2-starter/blob/master/gulpfile.js#L19):
```js
//var IONIC_DIR = "node_modules/ionic-framework/"
var IONIC_DIR = "node_modules/ionic2/dist/"
```


__* Ionic 2 will be integrated within the [Ionic CLI](https://www.npmjs.com/package/ionic), [Ionic Lab](http://lab.ionic.io/), [Ionic Creator](http://creator.ionic.io/) (basically every Ionic tool), to make building an Ionic app even easier.__


### ES6/Typescript

- Ionic's source is written using [Typescript](http://www.typescriptlang.org/)
- Ionic apps can be written in ES6 or TypeScript
- Typescript is an optional feature to be used at the developers discretion
- Ionic 2 starters come with the necessary build tools to transpile both ES6 and Typescript


### CSS Attribute Selectors:

- Simple
- Smaller markup
- Easier to read and understand
- [Not an issue](https://twitter.com/paul_irish/status/311610425617838081) for today's mobile browsers
- No performance impacts have been found


### Distribution

 - [npm: ionic-framework](https://www.npmjs.com/package/ionic-framework)


#### Webpack

- Starter project is already setup to build Ionic using [Webpack](http://webpack.github.io/)
