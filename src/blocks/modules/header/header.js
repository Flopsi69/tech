import $ from "jquery";
import "slick-carousel";
import slickLightbox from "slick-lightbox";
window.$ = $;

$(document).on("click", ".count__btn", function (e) {
  e.preventDefault();
  let input = $(this).siblings(".count__input");
  if ($(this).hasClass("count__plus")) {
    input.val(parseInt(input.val()) + 1);
  } else if (parseInt(input.val()) !== 1) {
    input.val(parseInt(input.val()) - 1);
  }

  if ($(this).closest(".product__count").length) {
    return;
  }
  let productId = $(this).closest("[data-product-id]").data("productId");
  updateProduct(productId, input.val());
});

$(document).on("click", ".b-product__remove", function (e) {
  e.preventDefault();
  let productId = $(this).closest(".b-product").data("product-id");
  $(this).closest(".b-product").remove();
  removeProduct(productId);
  setBasketCount();
});

$(".burger").click(() => {
  $(this).toggleClass("active");
  $(".header__nav .nav").slideToggle().toggleClass("active");
});

$(".catalog__list").slick({
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        // variableWidth: true,
        dots: true,
        // arrows: false,
      },
    },
  ],

  // variableWidth: true,
});

$("iframe").each((index, el) => {
  setTimeout(() => {
    $(el).attr("src", $(el).data("src"));
  }, 2500);
});

$(".b-addition__title").click(function () {
  $(this).siblings(".b-addition__body").slideToggle();
});

$(".portfolio-main").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".portfolio-nav",
});
$(".portfolio-nav").slick({
  slidesToShow: 11,
  slidesToScroll: 1,
  asNavFor: ".portfolio-main",
  dots: true,
  arrows: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 8,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        variableWidth: true,
        arrows: false,
      },
    },
    // {
    //   breakpoint: 480,
    //   settings: {
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    //   }
    // }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});
$(".portfolio-main").slickLightbox({
  src: "src",
  itemSelector: ".portfolio-main__item > img",
});

$(document).ready(function () {
  init();
  $(".sidebar__close").click(function (params) {
    closeSidebar();
  });

  $(document).click(function (e) {
    console.log();
    if ($(e.target).hasClass("sidebar-active")) {
      closeSidebar();
    }
  });
});

$(".faq__head").click(function () {
  $(this).toggleClass("active").siblings(".faq__body").slideToggle();
});

$(".burger").click(function () {
  $(this).toggleClass("active");
  $(".nav-mob").toggleClass("active");
});

$(".modal__close, .modal__overlay, .btn-close-modal").on("click", function () {
  closePop();
});

function closePop() {
  $(".modal").removeClass("active");
}

function openPop(modal) {
  $(".modal__content.active").removeClass("active");
  $(modal).addClass("active");
  $(".modal").addClass("active");
}

$(document).on("click", ".modal-trigger", function (e) {
  e.preventDefault();
  let modal = $(this).data("modal");
  openPop(modal);
});

$(".contacts__form").submit(function (e) {
  e.preventDefault();
  let form_data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "./send.php",
    data: form_data,
    success: function (data) {
      alert("Success!");
      document.querySelector(".contacts__form").reset();
    },
    error: function (response) {
      alert("Error!");
    },
  });
});

$(".basket-total__buy").click(function (e) {
  e.preventDefault();
  let basket = JSON.stringify(getBasket());
  let data = "basket=" + basket + "&step=0";
  basketTelegram(data);
});

$(".modal-buy__next").click(function (e) {
  // e.preventDefault();
  let step = $(".modal-buy__step.active").data("step");
  let data = "step=" + step + "&";
  let err = false;
  if (step == "1") {
    $(".modal-buy__form .input").each((index, el) => {
      if (!$(el).val().trim()) {
        err = true;
        return;
      }
    });
    if (!err) {
      e.preventDefault();
    }
    data += $(".modal-buy__form").serialize();
  }

  if (step == "2") {
    data += "payment=ideal";
  }

  if (step == "3") {
    let bankName = $(".modal-buy__bank.active").text();
    data += "bank=" + bankName;
  }

  console.log(data);
  console.log(err);
  if (!err) {
    $(".modal-buy__step.active")
      .slideToggle()
      .removeClass("active")
      .next()
      .slideToggle()
      .addClass("active");
    basketTelegram(data);
  }
});

function basketTelegram(data) {
  $.ajax({
    type: "POST",
    url: "./basket.php",
    data: data,
    success: function (data) {
      if (data) {
        $(".modal-buy__bill").remove();
        location.href = data;
        // $(".modal-buy__finish").removeClass("disabled").prop("href", data);
      }
      console.log(data);
    },
    error: function (response) {
      alert("Ошибка. Данные не отправлены. Попробуйте позже");
    },
  });
}

$(".modal-buy__bank").click(function (e) {
  e.preventDefault();
  $(this).parent().siblings(".modal-buy__next").removeClass("disabled");
  $(this).addClass("active").siblings(".active").removeClass("active");
});

const products = [
  {
    id: 605,
    name: "iRobot Roomba 605",
    imagePreview: "img/products/605/1.jpeg",
    oldPrice: "€ 226.00",
    newPrice: "€ 169.00",
  },
  {
    id: 606,
    name: "iRobot Roomba 606",
    imagePreview: "img/products/606/1.jpg",
    oldPrice: "€ 249.00",
    newPrice: "€ 199.00",
  },
  {
    id: 671,
    name: "iRobot Roomba 671",
    imagePreview: "img/products/671/1.jpeg",
    oldPrice: "€ 309.00",
    newPrice: "€ 259.00",
  },
  {
    id: 698,
    name: "iRobot Roomba 698",
    imagePreview: "img/products/698/1.jpeg",
    oldPrice: "€ 299.00",
    newPrice: "€ 249.00",
  },
  {
    id: 960,
    name: "iRobot Roomba 960",
    imagePreview: "img/products/960/1.jpeg",
    oldPrice: "€ 439.00",
    newPrice: "€ 379.00",
  },
  {
    id: 975,
    name: "iRobot Roomba 975",
    imagePreview: "img/products/975/1.jpeg",
    oldPrice: "€ 599.00",
    newPrice: "€ 429.00",
  },
  {
    id: 976,
    name: "iRobot Roomba 976",
    imagePreview: "img/products/976/1.jpg",
    oldPrice: "€ 499.00",
    newPrice: "€ 429.00",
  },
  {
    id: "e5",
    name: "iRobot Roomba e5",
    imagePreview: "img/products/e5/1.jpeg",
    oldPrice: "€ 319.00",
    newPrice: "€ 299.00",
  },
  {
    id: "i7",
    name: "iRobot Roomba i7",
    imagePreview: "img/products/i7/1.jpeg",
    oldPrice: "€ 699.00",
    newPrice: "€ 599.00",
  },
  {
    id: "i7+",
    name: "iRobot Roomba i7+",
    imagePreview: "img/products/i7+/1.jpeg",
    oldPrice: "€ 999.00",
    newPrice: "€ 899.00",
  },
  {
    id: "s9+",
    name: "iRobot Roomba s9+",
    imagePreview: "img/products/s9+/1.jpeg",
    newPrice: "€ 1399.00",
  },
];

function updateProduct(productId, count) {
  console.log(productId);
  let basket = getBasket();
  let product = basket.find((el) => {
    return el["id"] == productId;
  });
  if (product) {
    let productIndex = basket.findIndex((el) => {
      return el["id"] == productId;
    });
    basket[productIndex] = product;
  } else {
    product = products.find((obj) => {
      if (obj.id == productId) {
        return obj;
      }
    });
    basket.push(product);
    $(".items-count").text(basket.length);
  }
  product["count"] = parseInt(count);

  setBasket(basket);
  renderTotal();
}

function removeProduct(productId) {
  let basket = getBasket();
  let productIndex = basket.findIndex((el) => {
    return el["id"] == productId;
  });
  basket.splice(productIndex, 1);
  setBasket(basket);
  renderTotal();
}

function showSidebar() {
  $("body").addClass("sidebar-active");
  $("sidebar").addClass("active");
}

function closeSidebar() {
  $("body").removeClass("sidebar-active");
  $(".sidebar").removeClass("active");
}

function setBasketCount() {
  $(".items-count").text(getBasket().length);
}

function getBasket() {
  if (!!localStorage.getItem("basket")) {
    let basket = JSON.parse(localStorage.getItem("basket"));
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
  let basket = getBasket();
  let totalSum = basket.reduce((acc, product) => {
    let currentSum = parseFloat(product.newPrice.split(" ")[1]) * product.count;
    $(`.b-product[data-product-id='${product.id}']`)
      .find(".b-product__total")
      .text("€ " + currentSum.toFixed(2));

    let productPrice = parseFloat(acc) + currentSum;
    return productPrice.toFixed(2);
  }, 0);
  $(".js-basket__total").text("€ " + totalSum);
}

function renderProduct(product) {
  let totalProduct =
    product.newPrice.split(" ")[0] +
    " " +
    (product.count * parseFloat(product.newPrice.split(" ")[1])).toFixed(2);

  return `
  <div class="b-product row-flex" data-product-id='${product.id}'>
    <div class="b-product__image col">
      <img src="${product.imagePreview}" alt="">
    </div>
    <div class="b-product__info col">
      <div class="b-product__title">${product.name}</div>
      <div class="b-product__price flex a-center">
        <div class="b-product__price-old">${product.oldPrice || ""}</div>
        <div class="b-product__price-new">${product.newPrice}</div>
      </div>
      <div class="count b-product__count flex">
        <button class="btn count__btn count__minus">-</button>
        <input value="${
          product.count
        }" class="count__input" type="text" disabled="disabled">
        <button class="btn count__btn count__plus">+</button>
      </div>
    </div>
    <div class="b-product__total col">${totalProduct}</div>
    <a href="#" class="b-product__remove col">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" width="512" height="512">
        <path d="M294.111 256.001L504.109 46.003c10.523-10.524 10.523-27.586 0-38.109-10.524-10.524-27.587-10.524-38.11 0L256 217.892 46.002 7.894C35.478-2.63 18.416-2.63 7.893 7.894s-10.524 27.586 0 38.109l209.998 209.998L7.893 465.999c-10.524 10.524-10.524 27.586 0 38.109 10.524 10.524 27.586 10.523 38.109 0L256 294.11l209.997 209.998c10.524 10.524 27.587 10.523 38.11 0 10.523-10.524 10.523-27.586 0-38.109L294.111 256.001z"></path>
      </svg>
    </a>
  </div>
  `;
}

function init() {
  const productId = $(".product").data("product-id");
  if (productId) {
    const product = products.find((obj) => {
      if (obj.id == productId) {
        return obj;
      }
    });

    $(".js-product").each((index, el) => {
      let data = $(el).data("product-value");
      if (data) {
        $(el).text(product[data]);
      }
    });

    $(".product__buy").click(function () {
      updateProduct(
        productId,
        $(this).siblings(".product__count-wrap").find(".input").val()
      );
      let basket = getBasket();
      $(".b-product__list").html("");
      console.log("basket", basket);
      for (let product of basket) {
        console.log("product", product);
        let productEl = $(renderProduct(product));
        $(".b-product__list").prepend(productEl);
      }

      showSidebar();
    });
  }

  if ($(".basket").length || $(".sidebar")) {
    renderTotal();
    let basket = getBasket();
    $(".b-product__list").html("");
    for (let product of basket) {
      let productEl = $(renderProduct(product));
      $(".b-product__list").prepend(productEl);
    }
    $(".count__input").change(function () {
      console.log(this.value);
    });
  }

  setBasketCount();
}

setProductsPrice();

function setProductsPrice() {
  if ($(".p-product").length) {
    for (let i = 0; i < $(".p-product").length; i++) {
      let productEl = $(".p-product")[i];
      let productId = $(productEl).data("product-id");
      let product;
      if (productId) {
        product = products.find((obj) => {
          if (obj.id == productId) {
            return obj;
          }
        });

        productEl.querySelector(".p-product__title").textContent = product.name;
        productEl.querySelector(".p-product__price-old").textContent =
          product.oldPrice;
        productEl.querySelector(".p-product__price-new").textContent =
          product.newPrice;
      }
    }
  }
}

// let tableWraps = document.createElement("div");
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
