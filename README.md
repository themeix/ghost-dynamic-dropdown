# Ghost Dynamic Dropdown Menu
Ghost does not have the options to  create a dropdown menu from the ghost admin dashboard. So we tried to make that feature for ghost users.

## Installation

 [Download Latest Release](https://github.com/themeix/ghost-dynamic-dropdown/releases/latest)

**Include CSS**

```html
<script src="{{asset "css/ghost-dynamic-dropdown.css"}}"></script>
```

**Include script**

```html
<script src="{{asset "js/ghost-dynamic-dropdown.js"}}"></script>
```

At the  bottom of the script there has option   to change the value for child dropdown item selector, menu select,  css class etc.  Here following the options : 

### Options

| Name                 | Options Value       | Details         |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| targetElement                | `nav.ul li` | DOM selector of Menu `ul`                         |
| hasChildrenClasses           | `menu-item-has-children` | add class for the  parrent  item. ( has CSS dependency )         |
| hasChildrenIcon              | ▼ (SVG icon)  |  Use any SVG icon or text as dropdown icon                      |
| hasChildDetectText        | `[has_child]` **used in admin  dashboard** | Parrent menu item selector                         |
| submenuUlClasses       | `ghost-submenu`          | CSS class for the submenu items `ul`  ( has CSS dependency )  |
| subitemDetectText | `[subitem]` **used in admin  dashboard** | child menu item selector                                    |
| subitemLiClasses       | subitem                 | CSS class for the submenu item  |
| multi_level          | true    | Support Multi Level  Dropdown |
| mega_menu          | true    |  Support Mega Menu |

#### SVG Icon Example 
```
<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-caret-down' viewBox='0 0 16 16'><path d='M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z'/></svg>
```

#### Example Code

```js
     $(document).ready(function () {
        ghost_dropdown({
            targetElement: "nav.ul li",
            hasChildrenClasses: "menu-item-has-children",
            hasChildrenIcon:  "<svg width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.74805 1.52002L9.54883 9.00002L17.3496 1.52002' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
            hasChildDetectText: "[has_child]",
            submenuUlClasses: "ghost-submenu",
            subitemDetectText: "[subitem]",
            subitemLiClasses: "subitem",
            multi_level: false,
            mega_menu: false
        });
    });
```
