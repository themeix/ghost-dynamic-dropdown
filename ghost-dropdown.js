/**
 * ghost-dynamic-dropdown 1.1.0 (https://github.com/themeix/ghost-dynamic-dropdown)
 * A simple script for dynamic dorpdown & mega menu for Ghost Blogging Platform.
 * Copyright 2022 Themeix (https://themeix.com)
 * Released under MIT License
 * Released on:  Jul 25, 2021
 */



(function ($) {
    "use strict";

    function multiLevel(targetElement = "ul li", mLhasSubmenu = "mL-has-submenu", mLsubmenu = "mL-submenu") {
        let mLparentDetecttext = "[-]";
        let mLchildDetectText = "[--]";
        let mLdomArrayElement = [];
        let mLparentIndex = [];
        let mLparentLen = 0;

        // Find Dropdown parent element
        $(`${targetElement} li`).each(function (index, element) {
            if ($(this).text().includes(mLparentDetecttext)) {
                mLparentIndex.push(index); // Make dropdown parent array index
                mLparentLen++;

                $(this).push(element);
                if (!$(this).hasClass('menu-item-has-children')) {
                    $(this).addClass(mLhasSubmenu); // Add claas in dropdown   element
                }
                $(this).append(`<ul class="${mLsubmenu}"></ul>`); // Append submenu element
            }
        });



        let elIndex;
        // Code last multilevel 
        let lastMlElementText = $(`.${mLhasSubmenu}`).last().text();
        // console.log(lastMlElement);

        // Using loop to reach dropdown parent element
        for (let i = 0; i < mLparentLen; i++) {

            elIndex = 0 // Initial elemet value

            // Find subitem element
            $(`${targetElement} li`).each(function (index, element) {
                let mLsubitem = $(this).text().includes(mLchildDetectText); // Find subitem element


                if (mLsubitem) {

                    if (elIndex + 1 >= mLparentIndex[i + 1] + 1) { // Each loop will be break
                        return false; //Stoped each loop 
                    }

                    if (elIndex <= mLparentIndex[i + 1] || elIndex >= mLparentIndex[mLparentIndex.length - 1]) {

                        if (!mLparentIndex.includes(index)) { //Check if not index already insert 
                            mLdomArrayElement.push(element); // Incert subitem element in dom array
                            mLparentIndex.push(index); // incert subitem index in indexPush array
                        }
                    }

                }
                elIndex++; // increase element index value
            });


            $(`.${mLhasSubmenu} ul.${mLsubmenu}:eq(${i})`).append(mLdomArrayElement); // Append related subitem dom element into submenu 

            mLdomArrayElement = []; // Make dom array element empty. 
        }

        let lastMlElementIndex = 0; // Find subitem element
        let lastChildIndex = 0, lastChildElementText;


        $(`${targetElement} li`).each(function (index, element) {
            let lastMlElement = $(this).text().includes(lastMlElementText); // Find subitem element

            if (lastMlElement) {
                if (!$(this).hasClass('mLlastPrentElement')) {
                    $(this).addClass('mLlastPrentElement');
                    lastChildElementText = $(this).parent().children('li').last().text();
                    lastMlElementIndex = index;
                }

            }

            if ($(this).text().includes(lastChildElementText)) {
                lastChildIndex = index;
            }

            if (lastMlElementIndex < index && lastMlElementIndex > 0) {
                $(this).addClass('mLlastChildElements');
                $(".mLlastPrentElement ul").append($(`.mLlastChildElements`));
                if (lastChildIndex == index) {
                    return false;
                }
            }
        });

        remove_text(mLhasSubmenu, mLparentDetecttext);
        remove_text('subitem', mLchildDetectText);

    }

    function remove_text(textClass, replacedText) {

        const mLhasSubmenuEL = $(`.${textClass}`);
        mLhasSubmenuEL.each(function () {
            if ($(this).find("> a:first").text().includes(replacedText)) {
                let textFull = $(this).find("> a:first").text(); // Find has child inner text
                $(this).find("> a:first").text(textFull.replaceAll(replacedText, ""));
            }
        });
    }


    function megamenu(hasMegaMenuClasses = "menu-item-has-megamenu", col = 3, item_slice = 4, hasMegaMenuDetectText = "[has_megamenu]", submenuUlClasses = "ghost-submenu") {
        let megaMenuEl = $(`.${hasMegaMenuClasses} li`);
        $(`.${hasMegaMenuClasses} .${submenuUlClasses}`).addClass('row');
        let titleText = [];
        let titleIndex = 0;
        megaMenuEl.each(function (index, element) {
            if ($(this).text().includes("[title]")) {
                titleIndex++;
                $(this).addClass("megamenu-title");
                titleText.push($(this).text())
                $(".megamenu-title").empty();
            }
        });

        for (let i = 0; i < megaMenuEl.length; i += item_slice) {
            megaMenuEl.slice(i, i + item_slice).wrapAll(`<div class='col-md-${col}'></div>`);
            // console.log(titleText[i]);
            // console.log(titleText);
        }

        for (let i = 0; i < titleText.length; i++) {
            $(`.${submenuUlClasses} > div:eq(${i})`).prepend(`<h6 class="megamenu-title-text text-danger">${titleText[i]}</h6>`);
            $(".megamenu-title-text").text(titleText[i].replaceAll("[title]", ""));
        }
        remove_text(hasMegaMenuClasses, hasMegaMenuDetectText);
    }

    function ghost_dropdown(options) {

        // Default options
        let defultOptions = {
            targetElement: "nav.ul li",
            hasChildrenClasses: "menu-item-has-children",
            hasChildDetectText: "[has_child]",
            hasChildrenIcon: "<svg width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.74805 1.52002L9.54883 9.00002L17.3496 1.52002' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
            hasMegaMenuDetectText: "[has_megamenu]",
            hasMegaMenuClasses: "menu-item-has-megamenu",
            submenuUlClasses: "ghost-submenu",
            subitemDetectText: "[subitem]",
            subitemLiClasses: "subitem"
        }

        //Marge defaultOptions 
        options = {
            ...defultOptions,
            ...options
        }


        // Target Element
        let targetElement = options.targetElement;

        //Default value 
        let hasChildrenClasses = options.hasChildrenClasses;
        let hasChildDetectText = options.hasChildDetectText;
        let hasMegaMenuClasses = options.hasMegaMenuClasses;
        let hasMegaMenuDetectText = options.hasMegaMenuDetectText;
        let hasChildrenIcon = options.hasChildrenIcon;
        let submenuUlClasses = options.submenuUlClasses;
        let subitemDetectText = options.subitemDetectText;
        let subitemLiClasses = options.subitemLiClasses;


        // Declare neccesary variable
        let parentEl = $(targetElement);
        let childEL = $(targetElement);
        let parentLen = 0;
        let domArrayElement = [];
        let indexPush = [];
        let elIndex = 0;
        let parentIndex = [];

        $(`${targetElement}`).parent().addClass('ghost-dropdown-menu');

        let that;
        // Find Dropdown parent element
        parentEl.each(function (index, element) {
            if ($(this).text().indexOf(hasChildDetectText) >= 0) {
                parentIndex.push(index); // Make dropdown parent array index
                parentLen++;

                $(this).push(element);
                $(this).addClass(hasChildrenClasses); // Add claas in dropdown   element

                $(this).append(`<ul class='${submenuUlClasses}'></ul>`); // Append submenu element

                $(targetElement).css("opacity", "1");
            }

            if ($(this).text().includes(hasMegaMenuDetectText)) {
                $(this).addClass(hasMegaMenuClasses);
                that = $(this);
            }
        });

        $(targetElement).css("opacity", "1");

        $(`.${hasChildrenClasses}`).append(hasChildrenIcon);

        if(!$(hasChildrenClasses).length){
            $(targetElement).css("opacity", "1");
        }

        // Using loop to reach dropdown parent element
        for (let i = 0; i < parentLen; i++) {

            elIndex = 0 // Initial elemet value

            // Find subitem element
            childEL.each(function (index, element) {
                let subitem = $(this).text().includes(subitemDetectText); // Find subitem element

                if (subitem) {

                    if (elIndex >= parentIndex[i + 1]) { // Each loop will be break
                        return false; //Stoped each loop 
                    }

                    if (elIndex <= parentIndex[i + 1] || elIndex >= parentIndex[parentIndex.length - 1]) {

                        if (!indexPush.includes(index)) { //Check if not index already insert 
                            $(this).addClass(subitemLiClasses); // Add class in subitem element
                            let st = $(this).children().text(); // Find subitem inner text
                            $(this).children().text(st.replaceAll(subitemDetectText, "")); // Replace subitem inner text

                            domArrayElement.push(element); // Incert subitem element in dom array
                            indexPush.push(index); // incert subitem index in indexPush array

                        }
                    }

                }
                elIndex++; // increase element index value
            });


            $(`.${hasChildrenClasses} ul.${submenuUlClasses}:eq(${i})`).append(domArrayElement); // Append related subitem dom element into submenu 

            domArrayElement = []; // Make dom array element empty. 

        }
        remove_text(hasChildrenClasses, hasChildDetectText);


        if (options.multi_level) {
            multiLevel();
        }
        if (options.mega_menu) {
            megamenu(hasMegaMenuClasses, 3, 4, hasMegaMenuDetectText, submenuUlClasses);
        }
       

    }

    $(document).ready(function () {
        ghost_dropdown({
            targetElement: "nav.ul li",
            hasChildrenClasses: "menu-item-has-children",
            hasChildrenIcon: "<svg width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.74805 1.52002L9.54883 9.00002L17.3496 1.52002' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
            hasChildDetectText: "[has_child]",
            submenuUlClasses: "ghost-submenu",
            subitemDetectText: "[subitem]",
            subitemLiClasses: "subitem",
            multi_level: true,
            mega_menu: true
        });
    });


}(jQuery));
