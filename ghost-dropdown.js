(function($) {
    "use strict";

    function load_ghost_dropdown_css() {
        // Get HTML head element
        const head = $("head");
        console.log(head);

        // Create new link Element
        const styleLink = document.createElement('link');
        console.log(styleLink);

        // set the attributes for link element 
        styleLink.rel = 'stylesheet';

        styleLink.type = 'text/css';

        styleLink.href = 'https://raw.githubusercontent.com/akashmdiu/ghost-dynamic-dropdown/master/ghost-dropdwon.css';

        // Append link element to HTML head
        head.prepend(styleLink);

    }

    function ghost_dropdown(tElement) {

        // Target Element
        const targetElement = "ul li";
        if (tElement) {
            targetElement = element;
        }

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
            if ($(this).text().indexOf("[has_child]") >= 0) {
                parentIndex.push(index); // Make dropdown parent array index
                parentLen++;

                $(this).push(element);
                $(this).addClass('menu-item-has-children'); // Add claas in dropdown   element

                $(this).append("<ul class='submenu'></ul>"); // Append submenu element
            }
        });

        $('.menu-item-has-children > a').append("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-caret-down' viewBox='0 0 16 16'><path d='M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z'/></svg>");

        // Using loop to reach dropdown parent element
        for (let i = 0; i < parentLen; i++) {

            elIndex = 0 // Initial elemet value

            // Find subitem element
            childEL.each(function(index, element) {
                let subitem = $(this).text().includes("[subitem]"); // Find subitem element

                if (subitem) {

                    if (elIndex < parentIndex[i + 1] || elIndex >= parentIndex[parentIndex.length - 1]) {

                        if (!indexPush.includes(index)) { //Check if not index already insert 
                            $(this).addClass('subitem'); // Add class in subitem element
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

        load_ghost_dropdown_css();

    }

    $(document).ready(function() {
        ghost_dropdown()
    });


}(jQuery));