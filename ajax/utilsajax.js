(function (global) {

    var utilajax = {};

    function getRequestObject() {
        if (global.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else if (global.ActiveXObject) {
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported");
            return (null);
        }
    }


    utilajax.sendGetRequest = function (requestUrl, responseHandler, isJson) {
        var request = getRequestObject();
        request.onreadystatechange = function () { handleResponse(request, responseHandler, isJson); };
        request.open("GET", requestUrl, true);
        request.send(null);
    }

    function handleResponse(request, responseHandler, isJson) {
        if ((request.readyState == 4) && (request.status == 200)) {
            

            if (isJson == undefined) {
                responseHandler(JSON.parse(request.responseText));
            }
            else{
                responseHandler(request.responseText);
            }
        }
    }

    global.$utilajax = utilajax;
})(window);