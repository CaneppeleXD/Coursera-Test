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
    var allcategories = "data/categories.json";
    var menu_categories = "telas/menu-categories.html"
    var categoryHtml = "telas/categories.html"
    var insertHtml = function (selector, html) {
        var target = document.querySelector(selector);
        target.innerHTML = html;
    };

    var showLoading = function (selector) {
        var html = "<div class='text-center'><img src='images/Infinity-1s-200px.gif'></div>";
        insertHtml(selector, html);

    };

    var insertProperty = function (string, propName, propValue){
        var propToReplace = "{{"+propName+"}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        showLoading("#main-content");

        $utilajax.sendGetRequest(homeHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);
    });

    dc.loadMenuCategories = function(){
        showLoading("#main-content");
        $utilajax.sendGetRequest(allcategories, buildAndShowCategoriesHTML, true);
    }

    function buildAndShowCategoriesHTML (categories) {
        $utilajax.sendGetRequest(
            menu_categories,
            function (categoriesTitleHtml){
                $utilajax.sendGetRequest(
                    categoryHtml,
                    function (categoryHtml) {
                        var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
                        insertHtml("#main-content", categoriesViewHtml)
                    },
                false);
            },
        false);
    }

    function buildCategoriesViewHtml (categories, categoriesTitleHtml, categoryHtml) {
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class = 'row'>";

        for(var i = 0;i < categories.length; i++){
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            finalHtml += html;
        }
        finalHtml += "</section>";
        return(finalHtml);
    }

    global.$dc = dc;
})(window);
