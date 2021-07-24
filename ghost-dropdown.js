(function ($) {
    "use strict";

    $(document).ready(function () {
        // Target Element
        const targetElement = ".gh-head-menu .nav li";

        // Declare neccesary variable
        let parentEl = $(targetElement);
        let childEL = $(targetElement);
        let parentLen = 0;
        let domArrayElement = [];
        let indexPush = [];
        let elIndex = 0;
        let parentIndex = [];


        // Find Dropdown parent element
        parentEl.each(function (index, element) {
            if ($(this).text().indexOf("[has_child]") >= 0) {
                parentIndex.push(index);  // Make dropdown parent array index
                parentLen++;

                $(this).push(element);
                $(this).addClass('menu-item-has-children'); // Add claas in dropdown   element

                $(this).append('<ul class="submenu"></ul>'); // Append submenu element
            }
        });


        // Using loop to reach dropdown parent element
        for (let i = 0; i < parentLen; i++) {

            elIndex = 0 // Initial elemet value

            // Find subitem element
            childEL.each(function (index, element) {
                let subitem = $(this).text().includes("[subitem]"); // Find subitem element

                if (subitem) {

                    if (elIndex < parentIndex[i + 1] || elIndex >= parentIndex[parentIndex.length - 1]) {

                        if (!indexPush.includes(index)) {   //Check if not index already insert 
                            $(this).addClass('subitem');  // Add class in subitem element
                            let st = $(this).children().text(); // Find subitem inner text
                            $(this).children().text(st.replaceAll("[subitem]", "")); // Replace subitem inner text
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


            $(`.menu-item-has-children ul.submenu:eq(${i})`).append(domArrayElement); // Append related subitem dom element into submenu 

            domArrayElement = []; // Make dom array element empty. 

        }

    });



}(jQuery));