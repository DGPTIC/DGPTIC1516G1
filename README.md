#La palma Outdoor sport

This is a app to sync outdoors activities located in la Palma. This app used openddata format provided by [la palma opendata](http://www.opendatalapalma.es)

#Main requirement:

1. Install [nodejs](http://nodejs.org/)
*with nodejs installed*
2. Install Cordova: `sudo npm install -g cordova`
3. Install Ionic: `sudo npm install -g ionic@alpha`
4. Android SDK: for Andorid sdk you can install [Android studio](https://developer.android.com/sdk/index.html) or [Android sdk sntad alone](https://developer.android.com/sdk/installing/index.html)

#Clone your project 

You can use [Sourcetree](https://www.sourcetreeapp.com) for manager your source gits projects.
Form console you can clone your project using: 

`$ git clone user@https://github.com/DGPTIC/DGPTIC1516G1.git outdoor-sports`

#Coding instruction 

1. For create your modules first create a branch from master *Don't work directly in the master branch*
2. When your module is ok and tested you can merge with master branch
3. Each module is independe for core app. Create a forlder module in www/app/your-module

#Module structure

Each file inside of you module will be have the same name with different extention this is important when app load your module

- your-module.ts or your-module.js this file containg the typescript(javascript) logic of your module
- your-module.scss here your will put the modules styles using scss or simple css
- your-module.html here your will be put html module structure


#Building for iOS

To build for iOS, we need to add the iOS platform module to Cordova:


### 
```bash
$  ionic platform add ios
$  npm install ios-sim #for emulate IOS you can use Xcode iOS emulator, (Mac os users only)
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
$ ionic emulate ios # You can use Android emulator, this is included with Android studio
#For test in a android Devices
$ ionic run android # For a test directly in an android device
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
