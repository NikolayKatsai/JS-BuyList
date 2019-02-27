import './scss/main.scss';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;


function addItemInfo(productName) {
    const label = $("<div></div>").attr({
        "class": "rounded-label"
    });
    const labelTitle = $("<div>" + productName + "</div>");
    label.append(labelTitle);
    const labelCount = $("<span>1</span>");
    label.append(labelCount);

    const itemWrapper = $("<div></div>").attr({
            "class": "item-info top-bordered"
        }
    );
    const productTitle = $("<div>" + productName + "</div>").attr({
        "class": "editable",
        "contenteditable": "true"
    });
    $(productTitle).focusout(function () {
            productName = $(productTitle).text();
            $(labelTitle).text(productName);
        }
    );
    itemWrapper.append(productTitle);
    const middleController = $("<div> </div>").attr({
            "class": "q-controller"
        }
    );
    const reduceBtn = $("<button>-</button>").attr({
            "class": "reduce-button page-styled-btn disable",
            "data-tooltip": "Зменшити кількість",
            "disabled": true
        }
    );
    const itemCountController =
        $("<span class=\"item-count rounded-label\">1</span>");
    const addBtn = $("<button>+</button>").attr({
            "class": "add-button page-styled-btn",
            "data-tooltip": "Збільшити кількість"
        }
    );
    $(addBtn).click(function () {
        let counter = itemCountController.text();
        counter = +counter + 1;
        itemCountController.text(counter);
        labelCount.text(counter);
        reduceBtn.attr({
            "disabled": false
        }).removeClass("disable");
    });
    $(reduceBtn).click(function () {
        let counter = itemCountController.text();
        counter = +counter - 1;
        itemCountController.text(counter);
        labelCount.text(counter);
        if (counter <= 1)
            reduceBtn.attr({
                "disabled": true
            }).addClass("disable");
    });
    middleController.append(reduceBtn, itemCountController, addBtn);

    const stateController = $("<div></div>");
    const stateNotBoughtBtn = $("<button>Куплено</button>").attr({
        "class": "page-styled-btn status-not-bought",
        "data-tooltip": "Купити товар"
    });
    const stateBoughtBtn = $("<button>Не куплено</button>").attr({
        "class": "page-styled-btn status-bought",
        "data-tooltip": "Вилучити товар з купленого"
    });
    const refuseBtn = $("<button>x</button>").attr({
        "class": "refuse-btn page-styled-btn",
        "data-tooltip": "Видалити товар"
    });
    $(refuseBtn).click(function () {
        itemWrapper.slideUp(500, function () {
            itemWrapper.remove();
        });
        label.animate({width: 0, "padding-left": 0, "padding-right": 0}, 500, function () {
            label.remove();
        });
    });
    $(stateNotBoughtBtn).click(function () {
        $(itemWrapper).fadeOut(function () {
            $(refuseBtn).hide();
            $(stateNotBoughtBtn).hide();
            $(addBtn).hide();
            $(reduceBtn).hide();
            $(stateBoughtBtn).show();
            $(productTitle).addClass("crossed");
            $(productTitle).attr({
                "contenteditable": "false"
            });
        }).fadeIn();
        $(".manege-items .content .bought-items").append(label);

    });
    $(stateBoughtBtn).click(function () {
        $(itemWrapper).fadeOut(function () {
            $(refuseBtn).show();
            $(stateNotBoughtBtn).show();
            $(addBtn).show();
            $(reduceBtn).show();
            $(stateBoughtBtn).hide();
            $(productTitle).removeClass("crossed");
            $(productTitle).attr({
                "contenteditable": "true"
            });
        }).fadeIn();
        $(".manege-items .content .items-to-buy").append(label);

    });
    stateController.append(stateNotBoughtBtn, refuseBtn, $(stateBoughtBtn).hide());
    itemWrapper.append(middleController, stateController);


    $(".select-items .content").append(itemWrapper);
    $(".manege-items .content .items-to-buy").append(label);
}

$(document).ready(function () {
    addItemInfo("Помідори");
    addItemInfo("Печиво");
    addItemInfo("Сир");
    $("#add-pr-btn").click(function () {
        let prName = $("#search-pr");
        if (prName.val() != null && prName.val() !== "" && prName.val() !== " ") {
            addItemInfo(prName.val());
            $(prName).val("").focus();
        }
    });
});





