(function($) {
    "use strict";

    function removeOpacity() {
        $('ul').css("opacity", "1");
    }
    setTimeout(removeOpacity, 1000);

    function ghost_dropdown(tElement) {

        // Target Element
        const targetElement = "ul li";
        if (tElement) {
            targetElement = tElement;
        }

        //Default value 
        const hasChildrenClasses = "menu-item-has-children";
        const hasChildrenIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-caret-down' viewBox='0 0 16 16'><path d='M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z'/></svg>";
        const hasChildDetectText = "[has_child]";
        const submenuUlClasses = "ghost-submenu";
        const subitemDetectText = "[subitem]";
        const subitemLiClasses = "subitem";




        // Declare neccesary variable
        let parentEl = $(targetElement);
        let childEL = $(targetElement);
        let parentLen = 0;
        let domArrayElement = [];
        let indexPush = [];
        let elIndex = 0;
        let parentIndex = [];


        // Find Dropdown parent element
        parentEl.each(function(index, element) {
            if ($(this).text().indexOf(hasChildDetectText) >= 0) {
                parentIndex.push(index); // Make dropdown parent array index
                parentLen++;

                $(this).push(element);
                $(this).addClass(hasChildrenClasses); // Add claas in dropdown   element

                $(this).append(`<ul class='${submenuUlClasses}'></ul>`); // Append submenu element


            }
        });

        $(`.${hasChildrenClasses}`).append(hasChildrenIcon);

        // Using loop to reach dropdown parent element
        for (let i = 0; i < parentLen; i++) {

            elIndex = 0 // Initial elemet value

            // Find subitem element
            childEL.each(function(index, element) {
                let subitem = $(this).text().includes(subitemDetectText); // Find subitem element

                if (subitem) {

                    if (elIndex < parentIndex[i + 1] || elIndex >= parentIndex[parentIndex.length - 1]) {

                        if (!indexPush.includes(index)) { //Check if not index already insert 
                            $(this).addClass(subitemLiClasses); // Add class in subitem element
                            let st = $(this).children().text(); // Find subitem inner text
                            $(this).children().text(st.replaceAll(subitemDetectText, "")); // Replace subitem inner text
                            domArrayElement.push(element); // Incert subitem element in dom array
                            indexPush.push(index); // incert subitem index in indexPush array
                        }
                    }


                    if (elIndex + 1 >= parentIndex[i + 1]) { // Each loop will be break
                        return false; // Each loop stoped
                    }
                }
                elIndex++; // increase element index value
            });


            $(`.${hasChildrenClasses} ul.${submenuUlClasses}:eq(${i})`).append(domArrayElement); // Append related subitem dom element into submenu 

            domArrayElement = []; // Make dom array element empty. 

        }

        const hasChildEl = $(`.${hasChildrenClasses}`);
        hasChildEl.each(function() {
            if ($(this).find("> a").text().includes(hasChildDetectText)) {
                let hasChildText = $(this).find("> a").text(); // Find has child inner text
                $(this).find("> a").text(hasChildText.replaceAll(hasChildDetectText, ""));
            }
        });


    }

    $(document).ready(function() {
        ghost_dropdown()
    });


}(jQuery));