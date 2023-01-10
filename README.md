## Brand
![TeTwix logo](https://raw.githubusercontent.com/danielamariei/tetwix/master/public/images/tetwix-logo-500.png)
### Nostalgia & Bonding
Puzzle games are one of the most fun and competitive out on the market. But most of us have one retro love of this type: **Tetris**  
**TeTwix** promises to bring back to you the thrill of achieving a new hi-score, of clearing a line in the last moment, of scoring a combo, of challenging your friends. If you love Tetris you have to try TeTwix.
### Name
We started out to create a collaborative Tetris game and we where inspired by the famous chocolate double-bar, Twix.
### Innovation
Unlike the old Tetris where you had you have the actual device and controlled one falling piece at a time, with TeTwix you can play right on your laptop or PC and you have a challenge of controlling two pieces.  
You can choose to play the traditional way by using the keyboard and mouse or a game controller, or you can play it using a LEAP Motion Controller which takes advantage of hand gestures. Spoiler alert: it's crazy fun!
### Business
While playing the game you will notice some levels sponsored by our partners. When you complete such a level you will receive a special achievement trophy on behalf of our sponsors.  
These levels are easily recognizable, the sponsor logo will be placed on the game board background.


Node Boilerplate Version 2
==========================
*Requires Node v0.6.6 (or newer)*
node-boilerplate takes html-boilerplate, express, connect, jade and Socket.IO and organizes them into a ready to use website project. It's a fast way to get working on your Node website without having to worry about the setup. It takes care of all the boring parts, like setting up your views, 404 page, 500 page, getting the modules organized, etc... 

Node Boilerplate has 4 goals:

1. To end the repetition involved with starting a new Node website project
2. To never install anything outside of the project directory (For easier production deployment)
3. To make it easy to install additional modules within the project directory
4. To enable easy upgrade or freezing of project dependencies  
(These goals are much easier to meet now that node includes the node_modules convention)

To start a project:
		
		git clone git://github.com/robrighter/node-boilerplate.git mynewproject
		cd mynewproject
		./initproject.sh
This will copy down all of the boilerplate files, organize them appropriately and init a fresh new git repository within which you can build your next big thing.


To run the boilerplate template app:

		node server.js

Go to http://0.0.0.0:8081 and click on the send message link to see socket.io in action.


Additional Features:

1. Creates a package.json file consistent with associated best practices (http://blog.nodejitsu.com/package-dependencies-done-right)
2. Adds .gitignore for the node_modules directory
3. Includes 404 page and associated route
4. Includes 500 page

To add additional modules:

Update the package.json file to include new module dependencies and run 'npm install'.

**If you have a different set of default modules that you like to use, the structure is setup such that you can fork the project and replace the module dependencies outlined in the ./templates/apps/package.json file to best fit your needs and the initproject.sh script will initialize projects with your new set of modules.**

Deployment
===============

node-boilerplate is setup to be easily deployed on a Joyent Node SmartMachine. This means that:

1. The version of Node is defined in config.json and in package.json
2. The main script to run is server.js
3. The web server port is pulled from process.env.PORT 

