/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 6/8/14
 * Time: 2:39 PM
 * To change this template use File | Settings | File Templates.
 */


/* Class that helps debugging */
var Debugging = function () {
    this.output = document.getElementById('debugging');

    this.LOG = function (text) {
        this.output.innerHTML += text;
    };

    this.LOG_LINE = function (text) {
        this.LOG(text + "<br />");
    };
};

//var Debug = new Debugging();
