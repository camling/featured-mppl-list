/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");


wp.blocks.registerBlockType("ourplugin/featured-mppl-list", {
  title: "Featured MPPL List",
  description: "Include a list from our lists and suggestions system",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    listId: {
      type: "string"
    },
    adultListsLoaded: {
      type: "string"
    },
    adultLists: {
      type: "array"
    },
    teenListsLoaded: {
      type: "string"
    },
    teenLists: {
      type: "array"
    },
    youthListsLoaded: {
      type: "string"
    },
    youthLists: {
      type: "array"
    }
  },
  edit: EditComponent,
  save: function () {
    return null;
  }
});

function EditComponent(props) {
  function get_lists_array(list_type) {
    async function fetchAllLists(list_type) {
      const response = await fetch(`https://mppl.org/list_system/api.php/${list_type}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const lists = await response.json();
      return lists;
    }

    let all_lists = fetchAllLists(list_type);
    return all_lists;
  }

  function makeOptions(database, list) {
    return wp.element.createElement("option", {
      value: database + "/" + list.list_name
    }, list.list_name + " - " + list.category);
  }

  if (props.attributes.adultLists == undefined) {
    get_lists_array("adultlists").then(lists => {
      props.setAttributes({
        adultLists: lists
      });
      props.setAttributes({
        adultListsLoaded: "loaded"
      });
    });
  }

  if (props.attributes.teenLists == undefined) {
    get_lists_array("teenlists").then(lists => {
      props.setAttributes({
        teenLists: lists
      });
      props.setAttributes({
        teenListsLoaded: "loaded"
      });
    });
  }

  if (props.attributes.youthLists == undefined) {
    get_lists_array("youthlists").then(lists => {
      props.setAttributes({
        youthLists: lists
      });
      props.setAttributes({
        youthListsLoaded: "loaded"
      });
    });
  }

  if (props.attributes.adultListsLoaded == "loaded" && props.attributes.teenListsLoaded == "loaded" && props.attributes.youthListsLoaded == "loaded") {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "featured-mppl-list-wrapper"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "list-select-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      onChange: e => {
        props.setAttributes({
          listId: e.target.value
        });
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      disable: "true",
      selected: "true",
      value: "none"
    }, "Choose an Adult list"), props.attributes.adultLists.map(function (x) {
      return makeOptions("adultlists", x);
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "list-select-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      onChange: e => {
        props.setAttributes({
          listId: e.target.value
        });
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      disable: "true",
      selected: "true",
      value: "none"
    }, "Choose an Teen list"), props.attributes.teenLists.map(function (x) {
      return makeOptions("teenlists", x);
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "list-select-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      onChange: e => {
        props.setAttributes({
          listId: e.target.value
        });
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      disable: "true",
      selected: "true",
      value: "none"
    }, "Choose an Youth list"), props.attributes.youthLists.map(function (x) {
      return makeOptions("youthlists", x);
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "list-name-in-editor"
    }, "Display the list: ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, props.attributes.listId)));
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Loading ...");
}
}();
/******/ })()
;
//# sourceMappingURL=index.js.map