/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 6/10/14
 * Time: 8:07 PM
 * To change this template use File | Settings | File Templates.
 */
window.fbAsyncInit = function() {
    FB.init({
        appId      : '811672858845207',
        xfbml      : true,
        version    : 'v2.0'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
