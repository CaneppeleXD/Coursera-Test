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
    var menu_categories = "telas/menu-categories.html";
    var categoryHtml = "telas/categories.html";
    var menuItems = "data/menu_items/";
    var menuItemsTitleHtml = "telas/menu_item_title.html";
    var menuItemsHtml = "telas/menu_item.html";
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

    function buildAndShowMenuItemsHTML (categoryMenuItems){
        $utilajax.sendGetRequest(
            menuItemsTitleHtml,
            function(menuItemsTitleHtml){
                $utilajax.sendGetRequest(
                    menuItemsHtml,
                    function(menuItemHtml){
                        var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml);
                        insertHtml("#main-content", menuItemsViewHtml);
                    },
                false)
            },
            
        false)
    }

    function buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml){
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", categoryMenuItems.name);
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "special_instructions");
        var finalHtml = menuItemsTitleHtml;
        var carShortName = categoryMenuItems.short_name;
        finalHtml += "<section class='row'>";
        for(var i = 0;i<categoryMenuItems.items.length;i++){
            var html = menuItemHtml;
            html = insertProperty(html, "short_name", categoryMenuItems.items[i].short_name);
            html = insertItemPrice(html, "price_small",  categoryMenuItems.items[i].small_price);
            html = insertPortionName(html, "small_portion_name", categoryMenuItems.items[i].small_portion_name);
            html = insertItemPrice(html, "price_large",  categoryMenuItems.items[i].large_price);
            html = insertPortionName(html, "large_portion_name", categoryMenuItems.items[i].large_portion_name);
            html = insertProperty(html, "name", categoryMenuItems.items[i].name);
            html = insertProperty(html, "description", categoryMenuItems.items[i].description);

            if(i % 2 != 0){
                html += "<div class='clearfix visible-lg-block' visible-md-block></div>";
            }

            finalHtml += html;
        }
        finalHtml += "</section>";
        return finalHtml;
    }

    function insertItemPrice(html, pricePropName, priceValue){
        if(priceValue == ""){
            return insertProperty(html, pricePropName, "");
        }

        priceValue = "$" + priceValue.toFixed(2);
        html = insertProperty(html, pricePropName, priceValue);
        return html;
    }

    function insertPortionName(html, propName, portionName){
        if(portionName == ""){
            return insertProperty(html, propName, "");
        }

        html = insertProperty(html, propName, portionName);
        return html;   
    }

    dc.loadMenuItems = function (categoryShort) {
        showLoading("#main-content");
        $utilajax.sendGetRequest(
            menuItems+categoryShort,
            buildAndShowMenuItemsHTML, true);
    }

    global.$dc = dc;
})(window);
