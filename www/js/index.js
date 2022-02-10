// --------------------------------------------------------------------------

var SERVER = '18.234.196.143'; 
var PORT = '5060';
var PASS = 'password1';

// --------------------------------------------------------------------------

document.addEventListener('deviceready', onDeviceReady, false);

function showB(p) {
    $("#p_llamar").addClass("oculto");
    $("#p_colgar").addClass("oculto");
    $("#p_conectar").addClass("oculto");
    $("#p_error").addClass("oculto");

    $(p).removeClass("oculto");
}



function onDeviceReady() {

    SERVER = prompt("enter ip server: ", SERVER);
    PORT = prompt("enter port server: ", PORT);

    var posibles = ["8080", "8081", "8082", "8083"];
    var ext = null;

    do {
        ext = prompt("enter your extension number: \n" + posibles, '8080');
    } while (!posibles.includes(ext));

    PASS = prompt("password : ", PASS);

    var sipManager = {
        extension: ext,
        register: function () {
            $("#msg").html("Connecting " +  SERVER + ':' + PORT);

            showB("#p_conectar");

            cordova.plugins.sip.login(sipManager.extension, PASS, SERVER + ':' + PORT, function (e) {

                $("#msg").html(e);

                if (e == 'RegistrationSuccess') {
                    $("#msg").html("Ready to Call");
                    showB("#p_llamar");
                    sipManager.listen();
                } else {
                    showB("#p_error");
                }

            }, function (e) { alert(e) })
        },
        logout: function(){
            var closeApp = function(){  navigator.app.exitApp(); };
            cordova.plugins.sip.logout(closeApp, closeApp);
        },
        call: function () {

            var ext = prompt("Extension number to call");

            $("#msg").html("Calling");
            showB("#p_conectar");
            cordova.plugins.sip.call('sip:'+ ext +'@' + SERVER, sipManager.extension, sipManager.events, sipManager.events)
        },
        listen: function () {
            cordova.plugins.sip.listenCall(sipManager.events, sipManager.events);
        },
        hangup: function () {
            $("#msg").html("Hanging up");
            showB("#p_conectar");
            cordova.plugins.sip.hangup(function (e) { console.log(e) }, function (e) { console.log(e) })
        },
        events: function (e) {

            $("#msg").html(e);

            showB("#p_conectar");

            if (e == 'Incoming') {
                var r = confirm("Incoming Call");
                if (r) {
                    cordova.plugins.sip.accept(true, sipManager.events, sipManager.events);
                } else {

                }
            }
            if (e == 'Connected') {
                showB("#p_colgar");
                sipManager.listen();
            }
            if (e == 'Error') {
                showB("#p_llamar");
                sipManager.listen();
            }
            if (e == 'End') {
                showB("#p_conectar");
                sipManager.listen();

                window.setTimeout(function () {
                    showB("#p_llamar");
                }, 2000);
            }

        }
    }

    sipManager.register();

    $("#p_llamar").click(function () {
        sipManager.call();
    });

    $("#p_colgar").click(function () {
        sipManager.hangup();
    });

    $("#p_close").click(function () {
        sipManager.logout();
    });

    document.addEventListener("backbutton", function () {
        alert('Back Button Disabled');
        console.log('Back Button Disabled');
    }, false);

}
