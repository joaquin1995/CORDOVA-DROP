$(document).ready(function() {
    // are we running in native app or in a browser?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

function onDeviceReady() {
    // phonegap ready
    init();
    $( "#draggable" ).draggable();
    // $("#msg").prepend("starting<br/>");
}

function init() {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);   
}
function touchHandler(event) {
  var touches = event.changedTouches,
  first = touches[0],
  type = "";
  switch(event.type)
  {
      case "touchstart": type = "mousedown";
        // $("#msg").prepend("touchstart<br/>");
        break;
      case "touchmove":  type="mousemove"; break;        
      case "touchend":   type="mouseup"; break;
      default: return;
  }
  var simulatedEvent = document.createEvent("MouseEvent");
   simulatedEvent.initMouseEvent(type, true, true, window, 1,
                      first.screenX, first.screenY,
                      first.clientX, first.clientY, false,
                      false, false, false, 0/*left*/, null);
  first.target.dispatchEvent(simulatedEvent); 
  event.preventDefault();
}