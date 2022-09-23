/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
function display_description() {
  let list_of_items = document.getElementsByClassName('list_item');

  for (let i = 0; i < list_of_items.length; i++) {
    let more_description = list_of_items[i].querySelector('.more_description');
    let less_description = list_of_items[i].querySelector('.less_description');
    let full_description = list_of_items[i].querySelector('.full_description');
    let description = list_of_items[i].querySelector('.description');
    more_description.addEventListener("click", () => {
      show_full_description("more", full_description, description);
    });
    less_description.addEventListener("click", () => {
      show_full_description("less", full_description, description);
    });
  }
}

function show_full_description(trigger, full_description, description) {
  if (trigger === "more") {
    full_description.classList.remove('hidden');
    description.classList.add('hidden');
  } else if (trigger === "less") {
    full_description.classList.add('hidden');
    description.classList.remove('hidden');
  }
}

display_description();
/******/ })()
;
//# sourceMappingURL=frontend.js.map