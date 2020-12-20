/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/modules/footer/footer.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/footer/footer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/blocks/modules/header/header.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/header/header.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_$) {/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var slick_lightbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! slick-lightbox */ "./node_modules/slick-lightbox/dist/slick-lightbox.js");
/* harmony import */ var slick_lightbox__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(slick_lightbox__WEBPACK_IMPORTED_MODULE_2__);
var _this = undefined;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




__webpack_provided_window_dot_$ = jquery__WEBPACK_IMPORTED_MODULE_0___default.a;
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("click", ".count__btn", function (e) {
  e.preventDefault();
  var input = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings(".count__input");

  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass("count__plus")) {
    input.val(parseInt(input.val()) + 1);
  } else if (parseInt(input.val()) !== 1) {
    input.val(parseInt(input.val()) - 1);
  }

  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest(".product__count").length) {
    return;
  }

  var productId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest("[data-product-id]").data("productId");
  updateProduct(productId, input.val());
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("click", ".b-product__remove", function (e) {
  e.preventDefault();
  var productId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest(".b-product").data("product-id");
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest(".b-product").remove();
  removeProduct(productId);
  setBasketCount();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".burger").click(function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this).toggleClass("active");
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".header__nav .nav").slideToggle().toggleClass("active");
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".catalog__list").slick({
  slidesToShow: 3,
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: true
    }
  }, {
    breakpoint: 992,
    settings: {
      slidesToShow: 2,
      // variableWidth: true,
      dots: true // arrows: false,

    }
  }] // variableWidth: true,

});
jquery__WEBPACK_IMPORTED_MODULE_0___default()("iframe").each(function (index, el) {
  setTimeout(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).attr("src", jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).data("src"));
  }, 2500);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".b-addition__title").click(function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings(".b-addition__body").slideToggle();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".portfolio-main").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".portfolio-nav"
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".portfolio-nav").slick({
  slidesToShow: 11,
  slidesToScroll: 1,
  asNavFor: ".portfolio-main",
  dots: true,
  arrows: true,
  focusOnSelect: true,
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 8,
      arrows: false
    }
  }, {
    breakpoint: 768,
    settings: {
      slidesToShow: 4,
      variableWidth: true,
      arrows: false
    }
  } // {
  //   breakpoint: 480,
  //   settings: {
  //     slidesToShow: 1,
  //     slidesToScroll: 1
  //   }
  // }
  // You can unslick at a given breakpoint now by adding:
  // settings: "unslick"
  // instead of a settings object
  ]
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".portfolio-main").slickLightbox({
  src: "src",
  itemSelector: ".portfolio-main__item > img"
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function () {
  init();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".sidebar__close").click(function (params) {
    closeSidebar();
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).click(function (e) {
    console.log();

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).hasClass("sidebar-active")) {
      closeSidebar();
    }
  });
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".faq__head").click(function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).toggleClass("active").siblings(".faq__body").slideToggle();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".burger").click(function () {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).toggleClass("active");
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".nav-mob").toggleClass("active");
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal__close, .modal__overlay, .btn-close-modal").on("click", function () {
  closePop();
});

function closePop() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal").removeClass("active");
}

function openPop(modal) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal__content.active").removeClass("active");
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(modal).addClass("active");
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal").addClass("active");
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("click", ".modal-trigger", function (e) {
  e.preventDefault();
  var modal = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data("modal");
  openPop(modal);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".contacts__form").submit(function (e) {
  e.preventDefault();
  var form_data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).serialize();
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
    type: "POST",
    url: "./send.php",
    data: form_data,
    success: function success(data) {
      alert("Success!");
      document.querySelector(".contacts__form").reset();
    },
    error: function error(response) {
      alert("Error!");
    }
  });
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".basket-total__buy").click(function (e) {
  e.preventDefault();
  var basket = JSON.stringify(getBasket());
  var data = "basket=" + basket + "&step=0";
  basketTelegram(data);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal-buy__next").click(function (e) {
  // e.preventDefault();
  var step = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal-buy__step.active").data("step");
  var data = "step=" + step + "&";
  var err = false;

  if (step == "1") {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal-buy__form .input").each(function (index, el) {
      if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).val().trim()) {
        err = true;
        return;
      }
    });

    if (!err) {
      e.preventDefault();
    }

    data += jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal-buy__form").serialize();
  }

  if (step == "2") {
    data += "payment=ideal";
  }

  if (step == "3") {
    var bankName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal-buy__bank.active").text();
    data += "bank=" + bankName;
  }

  console.log(data);
  console.log(err);

  if (!err) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal-buy__step.active").slideToggle().removeClass("active").next().slideToggle().addClass("active");
    basketTelegram(data);
  }
});

function basketTelegram(data) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
    type: "POST",
    url: "./basket.php",
    data: data,
    success: function success(data) {
      if (data) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal-buy__bill").remove();
        location.href = data; // $(".modal-buy__finish").removeClass("disabled").prop("href", data);
      }

      console.log(data);
    },
    error: function error(response) {
      alert("Ошибка. Данные не отправлены. Попробуйте позже");
    }
  });
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()(".modal-buy__bank").click(function (e) {
  e.preventDefault();
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().siblings(".modal-buy__next").removeClass("disabled");
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass("active").siblings(".active").removeClass("active");
});
var products = [{
  id: 605,
  name: "iRobot Roomba 605",
  imagePreview: "img/products/605/1.jpeg",
  oldPrice: "€ 226.00",
  newPrice: "€ 169.00"
}, {
  id: 606,
  name: "iRobot Roomba 606",
  imagePreview: "img/products/606/1.jpg",
  oldPrice: "€ 249.00",
  newPrice: "€ 199.00"
}, {
  id: 671,
  name: "iRobot Roomba 671",
  imagePreview: "img/products/671/1.jpeg",
  oldPrice: "€ 309.00",
  newPrice: "€ 259.00"
}, {
  id: 698,
  name: "iRobot Roomba 698",
  imagePreview: "img/products/698/1.jpeg",
  oldPrice: "€ 299.00",
  newPrice: "€ 249.00"
}, {
  id: 960,
  name: "iRobot Roomba 960",
  imagePreview: "img/products/960/1.jpeg",
  oldPrice: "€ 439.00",
  newPrice: "€ 379.00"
}, {
  id: 975,
  name: "iRobot Roomba 975",
  imagePreview: "img/products/975/1.jpeg",
  oldPrice: "€ 599.00",
  newPrice: "€ 429.00"
}, {
  id: 976,
  name: "iRobot Roomba 976",
  imagePreview: "img/products/976/1.jpg",
  oldPrice: "€ 499.00",
  newPrice: "€ 429.00"
}, {
  id: "e5",
  name: "iRobot Roomba e5",
  imagePreview: "img/products/e5/1.jpeg",
  oldPrice: "€ 319.00",
  newPrice: "€ 299.00"
}, {
  id: "i7",
  name: "iRobot Roomba i7",
  imagePreview: "img/products/i7/1.jpeg",
  oldPrice: "€ 699.00",
  newPrice: "€ 599.00"
}, {
  id: "i7+",
  name: "iRobot Roomba i7+",
  imagePreview: "img/products/i7+/1.jpeg",
  oldPrice: "€ 999.00",
  newPrice: "€ 899.00"
}, {
  id: "s9+",
  name: "iRobot Roomba s9+",
  imagePreview: "img/products/s9+/1.jpeg",
  newPrice: "€ 1399.00"
}];

function updateProduct(productId, count) {
  console.log(productId);
  var basket = getBasket();
  var product = basket.find(function (el) {
    return el["id"] == productId;
  });

  if (product) {
    var productIndex = basket.findIndex(function (el) {
      return el["id"] == productId;
    });
    basket[productIndex] = product;
  } else {
    product = products.find(function (obj) {
      if (obj.id == productId) {
        return obj;
      }
    });
    basket.push(product);
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".items-count").text(basket.length);
  }

  product["count"] = parseInt(count);
  setBasket(basket);
  renderTotal();
}

function removeProduct(productId) {
  var basket = getBasket();
  var productIndex = basket.findIndex(function (el) {
    return el["id"] == productId;
  });
  basket.splice(productIndex, 1);
  setBasket(basket);
  renderTotal();
}

function showSidebar() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").addClass("sidebar-active");
  jquery__WEBPACK_IMPORTED_MODULE_0___default()("sidebar").addClass("active");
}

function closeSidebar() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()("body").removeClass("sidebar-active");
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".sidebar").removeClass("active");
}

function setBasketCount() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".items-count").text(getBasket().length);
}

function getBasket() {
  if (!!localStorage.getItem("basket")) {
    var basket = JSON.parse(localStorage.getItem("basket"));
    return basket;
  } else {
    return [];
  }
}

function setBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
  console.log(basket);
}

function renderTotal() {
  var basket = getBasket();
  var totalSum = basket.reduce(function (acc, product) {
    var currentSum = parseFloat(product.newPrice.split(" ")[1]) * product.count;
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".b-product[data-product-id='".concat(product.id, "']")).find(".b-product__total").text("€ " + currentSum.toFixed(2));
    var productPrice = parseFloat(acc) + currentSum;
    return productPrice.toFixed(2);
  }, 0);
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".js-basket__total").text("€ " + totalSum);
}

function renderProduct(product) {
  var totalProduct = product.newPrice.split(" ")[0] + " " + (product.count * parseFloat(product.newPrice.split(" ")[1])).toFixed(2);
  return "\n  <div class=\"b-product row-flex\" data-product-id='".concat(product.id, "'>\n    <div class=\"b-product__image col\">\n      <img src=\"").concat(product.imagePreview, "\" alt=\"\">\n    </div>\n    <div class=\"b-product__info col\">\n      <div class=\"b-product__title\">").concat(product.name, "</div>\n      <div class=\"b-product__price flex a-center\">\n        <div class=\"b-product__price-old\">").concat(product.oldPrice || "", "</div>\n        <div class=\"b-product__price-new\">").concat(product.newPrice, "</div>\n      </div>\n      <div class=\"count b-product__count flex\">\n        <button class=\"btn count__btn count__minus\">-</button>\n        <input value=\"").concat(product.count, "\" class=\"count__input\" type=\"text\" disabled=\"disabled\">\n        <button class=\"btn count__btn count__plus\">+</button>\n      </div>\n    </div>\n    <div class=\"b-product__total col\">").concat(totalProduct, "</div>\n    <a href=\"#\" class=\"b-product__remove col\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512.001 512.001\" width=\"512\" height=\"512\">\n        <path d=\"M294.111 256.001L504.109 46.003c10.523-10.524 10.523-27.586 0-38.109-10.524-10.524-27.587-10.524-38.11 0L256 217.892 46.002 7.894C35.478-2.63 18.416-2.63 7.893 7.894s-10.524 27.586 0 38.109l209.998 209.998L7.893 465.999c-10.524 10.524-10.524 27.586 0 38.109 10.524 10.524 27.586 10.523 38.109 0L256 294.11l209.997 209.998c10.524 10.524 27.587 10.523 38.11 0 10.523-10.524 10.523-27.586 0-38.109L294.111 256.001z\"></path>\n      </svg>\n    </a>\n  </div>\n  ");
}

function init() {
  var productId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".product").data("product-id");

  if (productId) {
    var product = products.find(function (obj) {
      if (obj.id == productId) {
        return obj;
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".js-product").each(function (index, el) {
      var data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).data("product-value");

      if (data) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).text(product[data]);
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".product__buy").click(function () {
      updateProduct(productId, jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings(".product__count-wrap").find(".input").val());
      var basket = getBasket();
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(".b-product__list").html("");
      console.log("basket", basket);

      var _iterator = _createForOfIteratorHelper(basket),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _product = _step.value;
          console.log("product", _product);
          var productEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(renderProduct(_product));
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(".b-product__list").prepend(productEl);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      showSidebar();
    });
  }

  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(".basket").length || jquery__WEBPACK_IMPORTED_MODULE_0___default()(".sidebar")) {
    renderTotal();
    var basket = getBasket();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".b-product__list").html("");

    var _iterator2 = _createForOfIteratorHelper(basket),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _product2 = _step2.value;
        var productEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(renderProduct(_product2));
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(".b-product__list").prepend(productEl);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".count__input").change(function () {
      console.log(this.value);
    });
  }

  setBasketCount();
}

setProductsPrice();

function setProductsPrice() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(".p-product").length) {
    var _loop = function _loop(i) {
      var productEl = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".p-product")[i];
      var productId = jquery__WEBPACK_IMPORTED_MODULE_0___default()(productEl).data("product-id");
      var product = void 0;

      if (productId) {
        product = products.find(function (obj) {
          if (obj.id == productId) {
            return obj;
          }
        });
        productEl.querySelector(".p-product__title").textContent = product.name;
        productEl.querySelector(".p-product__price-old").textContent = product.oldPrice;
        productEl.querySelector(".p-product__price-new").textContent = product.newPrice;
      }
    };

    for (var i = 0; i < jquery__WEBPACK_IMPORTED_MODULE_0___default()(".p-product").length; i++) {
      _loop(i);
    }
  }
} // let tableWraps = document.createElement("div");
// tableWraps.classList.add("product__spec");
// document
//   .querySelectorAll(".product-specs:not(.product-specs--horizontal)")
//   .forEach((element) => {
//     let table = document.createElement("table");
//     table.classList.add('product__table');
//     let wrap = document.createElement("div");
//     let titleEl = document.createElement("div");
//     titleEl.classList.add("product__table-title");
//     titleEl.innerText = element.parentElement.querySelector("h3").innerText;
//     wrap.classList.add("product__spec-block");
//     element.querySelectorAll("dl").forEach((row) => {
//       let rowColOne = row
//         .querySelector(".product-specs__item-title")
//         .innerText.trim();
//       let rowColTwo = row
//         .querySelector(".product-specs__item-spec")
//         .innerText.trim();
//       if (rowColTwo == "Ja") {
//         rowColTwo = "+";
//       }
//       if (rowColTwo == "Nee") {
//         rowColTwo = "-";
//       }
//       let tableOne = document.createElement("td");
//       tableOne.innerText = rowColOne;
//       let tableTwo = document.createElement("td");
//       tableTwo.innerText = rowColTwo;
//       let tableRow = document.createElement("tr");
//       tableRow.insertAdjacentElement("afterbegin", tableTwo);
//       tableRow.insertAdjacentElement("afterbegin", tableOne);
//       table.insertAdjacentElement("beforeend", tableRow);
//     });
//     wrap.insertAdjacentElement("afterbegin", table);
//     wrap.insertAdjacentElement("afterbegin", titleEl);
//     tableWraps.insertAdjacentElement('beforeend', wrap);
//   });
// console.log(tableWraps);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/header/header */ "./src/blocks/modules/header/header.js");
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/footer/footer */ "./src/blocks/modules/footer/footer.js");
/* harmony import */ var _modules_footer_footer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_footer_footer__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map