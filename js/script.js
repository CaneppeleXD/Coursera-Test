$(function () {
    $("#navBarToggle").blur(function (event) {

        if (window.innerWidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }
    });

    $("#navBarToggle").click(function (event) {
        $(event.target).focus();
    });
});

(function (global) {
    var dc = {};
    var homeHtml = "telas/home.html";
    var insertHtml = function (selector, html) {
        var target = document.querySelector(selector);
        target.innerHTML = html;
    };

    var showLoading = function (selector) {
        var html = "<div class='text-center'><img src='images/Infinity-1s-200px.gif'></div>";
        insertHtml(selector, html);

    };

    document.addEventListener("DOMContentLoaded", function (event) {
        showLoading("#main-content");

        $utilajax.sendGetRequest(homeHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);
    });

    global.$dc = dc;
})(window);
