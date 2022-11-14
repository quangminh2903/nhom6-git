const btnSearch = document.querySelector(".search-btn");
const productCartSideBar = document.querySelector(".product-cart-sidebar");
const message = document.querySelector(".message");
const addCart = document.querySelectorAll(".social .add-cart");
const cardJacketEl = document.querySelector(".product-list-jacket");
const cardTshirtEl = document.querySelector(".product-list-tshirt");
const cardPantsEl = document.querySelector(".product-list-pants");
const btnAddToCart = document.querySelector(".btn-add-to-cart");
const searchInput = document.querySelector(".search-input");
const searchFormInputEl = document.querySelector(".seach-input");
// searchFormInputEl.addEventListener('keydown', (e) => {
//   if (e.keyCode == 13) {
//     searchProduct();
//   }
// });
// btnSearch.addEventListener("click", () => {
//   searchProduct();
// });
// const searchProduct = () => {
//   let value = searchFormInputEl.value;
//   if (value == "") {
//     alert("Tên sản phẩm đang bị để trống");
//     return;
//   }
//   let productFilter = products.filter(p=>p.name.toLowerCase().includes(value.toLowerCase()));// Include tìm kiếm
//   renderCard(productFilter);
// };
let items = getDataFromLocalStorage();
const simple = (initial) => {
  let val = initial;
  return [
    () => val,
    (v) => {
      val = v;
    },
  ];
};

const [param, paramSet] = simple(1);
const [param1, param1Set] = simple(1);
const [param2, param2Set] = simple(1);

// let searchProductHeader = () =>{
//   let inputValue = searchInput.value
//   let productFilter = products.filter(p => p.name.toLowerCase().includes(inputValue.toLowerCase()))
//   renderSearchProducList(productFilter)
// }
// searchProductHeader(productFilter)
const addparam = (id) => {
  const abc = document.querySelector(`#a${id}`);
  paramSet(param() + 1);
  abc.innerHTML = `<span class="count py-1 px-2 d-inline-block fw-bold ">${param()}</span>`;
};
const exparam = (id) => {
  const abc = document.querySelector(`#a${id}`);
  paramSet(param() - 1);
  abc.innerHTML = `<span class="count py-1 px-2 d-inline-block fw-bold ">${param()}</span>`;
};

const addparam123 = (id) => {
  const cde = document.querySelector(`#b${id}`);
  param1Set(param1() + 1);
  cde.innerHTML = `<span class="count py-1 px-2 d-inline-block fw-bold ">${param1()}</span>`;
};
const exparam123 = (id) => {
  const abc = document.querySelector(`#b${id}`);
  param1Set(param1() - 1);
  abc.innerHTML = `<span class="count py-1 px-2 d-inline-block fw-bold ">${param1()}</span>`;
};
const addparam12 = (id) => {
  const cde = document.querySelector(`#c${id}`);
  param2Set(param2() + 1);
  cde.innerHTML = `<span class="count py-1 px-2 d-inline-block fw-bold ">${param2()}</span>`;
};
const exparam12 = (id) => {
  const cde = document.querySelector(`#c${id}`);
  param2Set(param2() - 1);
  cde.innerHTML = `<span class="count py-1 px-2 d-inline-block fw-bold ">${param2()}</span>`;
};

const selectorBtn = () => {
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".select-size");
    if (!btn) return;
    const parent = btn.parentElement;
    const b = parent.querySelector(".text-white");
    if (b) {
      b.classList.remove("text-white");
      b.classList.remove("bg-dark");
    }
    btn.classList.add("text-white");
    btn.classList.add("bg-dark");
    return btn.dataset.size;
  });
};
selectorBtn();

const productJacket = products.filter((p) => {
  return p.category == "Jacket";
});
const productItemSidabar = document.querySelector(".product-item-sidebar");
const renderProductSidebar = () => {
  if (items.length == 0) {
    productItemSidabar.innerHTML = "Chưa có sản phẩm";
    return;
  }
  productItemSidabar.innerHTML = "";
  let html = "";
  items.forEach((p) => {
    html += `<div class="product-item d-flex border mb-2">
    <div class="image">
      <img src="${p.image}" alt="${p.name}" />
    </div>
    <div class="info d-flex justify-content-between px-1">
        <div>
            <div class="name-product">
                <h2 class="text-dark">
                ${p.name} (${p.size})
                </h2>
                
            </div>
            <div class="count-sidebar text-black-50 d-flex justify-content-between ">
                <span class="border d-inline-block me-3">
                    <span class="minus-sidebar px-2 d-inline-block fw-bold bg-light" onclick="minusCount(${
                      p.id
                    }, '${p.size}')">-</span>
                    <span class="px-2 d-inline-block fw-bold">${p.count}</span>
                    <span class="plus-sidebar px-2 d-inline-block fw-bold bg-light" onclick="plusCount(${
                      p.id
                    }, '${p.size}')">+</span>
                </span>
                <button class="text-primary border-0 bg-transparent fw-light" onclick="deleteProduct(${
                  p.id
                }, '${p.size}')">
                  <span><i class="fa-solid fa-trash-can"></i></i></span>
              </button>
            </div>
            <h3 class="text-danger fw-bold text-start">
                ${formatMoney(p.price)}
              </h3>
        </div>
    </div>
  </div>`;
  });
  productItemSidabar.innerHTML = html;
};

//  Xóa sản phẩm
const deleteProduct = (id, size) => {
  let isConfirm = confirm("Bạn có muốn xóa không?");
  if (isConfirm) {
    items = items.filter((p) => p.id !== id);
    setDataToLocalStorage(items);
    updateTotalCart();
    renderProductSidebar(items);
  }
};

// Thay đổi số lượng
// Tăng số lượng
const plusCount = (id, size) => {
  // Lấy ra sản phẩm tương ứng
  let product = items.find((p) => p.id == id && p.size == size);

  // Tăng số lượng
  product.count++;

  // Lưu lại vào localStorage
  setDataToLocalStorage(items);
  // Hiển thị lại giao diện
  updateTotalMoneysidebar();
  renderProductSidebar(items);
};

// Giảm số lượng
const minusCount = (id, size) => {
  let product = items.find((p) => p.id == id && p.size == size);
  product.count--;
  if (product.count < 1) {
    product.count = 1;
  }
  setDataToLocalStorage(items);
  updateTotalMoneysidebar();
  renderProductSidebar(items);
};

const renderCardJacket = (arr) => {
  cardJacketEl.innerHTML = "";
  let html = "";
  arr.forEach((p) => {
    html += `<div class="col-xl-2_4 col-lg-2_4 .col-xxl-2_4 col-md-4 col-sm-6 col-6">
      <div class="card-item">
        <div class="card-image position-relative">
          <a href="./detail.html?id=${p.id}"
            ><img
              src="${p.images[0]}"
              alt="${p.name}"
          /></a>
          <ul class="social position-absolute top-0 end-0">
            
            <li>
              <button
                class="button-discount"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal${p.id}"
                role="button"
              >
              <i class="fa-solid fa-eye"></i>
              </button>
            </li>
          </ul>
          
          <span class="flash-tag position-absolute">${p.tag}</span>
        </div>
        <div class="card-title">
          <h3>${p.name}</h3>
          <p>${formatMoney(p.price)}</p>
        </div>
        <button class="btn btn--detail">
          <a href="./detail.html?id=${p.id}">Chi tiết</a>
        </button>
        </div>
      <div class="modal fade render-modal"
            id="exampleModal${p.id}"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Chi tiết sản phẩm
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="product-detail">
                    <div class="product-modal d-flex border mb-4">
                      <div class = "col-lg-4 col-md-4 col-sm-4">
                      <div class="image">
                        <img src="${p.images[0]}" alt="${p.name}" />
                      </div>
                      </div>
                      <div class="col-lg-8 col-md-8 col-sm-9">
            <div id="detail ">
                <p class="product-name fw-bold mx-1">${p.name}</p>
                <p class="product-price text-danger  fw-bold mb-2 mx-1">${formatMoney(
                  p.price
                )}</p>
                <div class="size d-flex mx-1 mb-2">
                  <span class="fw-bold me-3">Kích cỡ:</span>
                <div class="product-size mb-2">
                    <span data-size = "S" class="select-size border py-1 px-2 border-dark me-2" >S</span>
                    <span data-size = "M" class="select-size border py-1 px-2 border-dark me-2">M</span>
                    <span data-size = "L" class="select-size border py-1 px-2 border-dark me-2">L</span>
                    <span data-size = "XL" class="select-size border py-1 px-2 border-dark me-2">XL</span>
                </div>
                </div>
                <div class="d-flex  align-items-center mb-2 flex-wrap">
                  <span class="fw-bold me-3 mx-1">Số lượng:</span>
                    <span class="count-product d-inline-block me-3">
                        <span onclick='exparam(${
                          p.id
                        })'  class="rounded-circle px-2 d-inline-block fw-bold btn-minus-count">-</span>
                        <span id='a${p.id}' class=" ">
                          <span class="count py-1 px-2 d-inline-block fw-bold ">1</span>
                        </span>
                        <span onclick='addparam(${
                          p.id
                        })' class="rounded-circle  px-2 d-inline-block fw-bold btn-plus-count">+</span>
                    </span>
                    <button onclick = 'addCartJacket(${
                      p.id
                    })' class="btn-icon btn-add-to-cart">Thêm vào giỏ hàng</button>
                </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>`;
  });
  cardJacketEl.innerHTML = html;
};
const addCartJacket = (id) => {
  let product = products.find((p) => p.id == id);
  let item = {
    id: product.id,
    name: product.name,
    price: product.price,
    size: "M",
    image: product.images[0],
    count: 1,
  };
  addItemToAdd(item);
  alert("Thêm vào giỏ hàng thành công");
  window.location.reload();
  renderProductSidebar(items);
  updateTotalMoneysidebar();
};

const productTshirt = products.filter((p) => {
  return p.category == "Tshirt";
});
const renderCardTshirt = (arr) => {
  cardTshirtEl.innerHTML = "";
  let html = "";
  arr.forEach((p) => {
    html += `<div class="col-xl-2_4 col-lg-2_4 .col-xxl-2_4 col-md-4 col-sm-6 col-6">
    <div class="card-item">
      <div class="card-image position-relative">
        <a href="./detail.html?id=${p.id}"
          ><img
            src="${p.images[0]}"
            alt="${p.name}"
        /></a>
        <ul class="social position-absolute top-0 end-0">
          <li>
            <button
              class="button-discount"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal${p.id}"
              role="button"
            >
            <i class="fa-solid fa-eye"></i>
            </button>
          </li>
        </ul>
        
        <span class="flash-tag position-absolute">${p.tag}</span>
      </div>
      <div class="card-title">
        <h3>${p.name}</h3>
        <p>${formatMoney(p.price)}</p>
      </div>
      <button class="btn btn--detail">
        <a href="./detail.html?id=${p.id}">Chi tiết</a>
      </button>
      </div>
    <div class="modal fade render-modal"
          id="exampleModal${p.id}"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Chi tiết sản phẩm
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="product-detail">
                  <div class="product-modal d-flex border mb-4">
                    <div class = "col-lg-4 col-md-4 col-sm-4">
                    <div class="image">
                      <img src="${p.images[0]}" alt="${p.name}" />
                    </div>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-9">
          <div id="detail ">
              <p class="product-name fw-bold mx-1">${p.name}</p>
              <p class="product-price text-danger  fw-bold mb-2 mx-1">${formatMoney(
                p.price
              )}</p>
              <div class="size d-flex mx-1 mb-2">
                <span class="fw-bold me-3">Kích cỡ:</span>
              <div class="product-size mb-2">
                  <span class="border py-1 px-2 border-dark me-2 select-size" >M</span>
                  <span class="border py-1 px-2 border-dark me-2 select-size">S</span>
                  <span class="border py-1 px-2 border-dark me-2 select-size">L</span>
                  <span class="border py-1 px-2 border-dark me-2 select-size">XL</span>
              </div>
              </div>
              <div class="d-flex  align-items-center mb-2 flex-wrap">
                <span class="fw-bold me-3 mx-1">Số lượng:</span>
                  <span class="count-product d-inline-block me-3">
                      <span onclick='exparam123(${
                        p.id
                      })' class="rounded-circle px-2 d-inline-block fw-bold btn-minus-count">-</span>
                      <span id='b${p.id}' class=" ">
                        <span class="count py-1 px-2 d-inline-block fw-bold ">1</span>
                       </span>
                      <span onclick='addparam123(${
                        p.id
                      })' class="rounded-circle  px-2 d-inline-block fw-bold btn-plus-count">+</span>
                  </span>
                  <button onclick = 'addCartTshirt(${
                    p.id
                  })' class="btn-icon  btn-add-to-cart">Thêm vào giỏ hàng</button>
              </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>`;
  });
  cardTshirtEl.innerHTML = html;
};
// Thêm sản phẩm Tshirt vào cart
let addCartTshirt = (id) => {
  let product = products.find((p) => p.id == id);
  let item = {
    id: product.id,
    name: product.name,
    price: product.price,
    size: "M",
    image: product.images[0],
    count: 1,
  };
  addItemToAdd(item);
  alert("Thêm vào giỏ hàng thành công");
  // let productCartSideBar = getDataCartFromLocalStorage()
  renderProductSidebar(productCartSideBar);
  updateTotalMoneysidebar();
};

// Render Pant
const productPants = products.filter((p) => {
  return p.category == "Pants";
});
const renderCardPants = (arr) => {
  cardPantsEl.innerHTML = "";
  let html = "";
  arr.forEach((p) => {
    html += `<div class="col-xl-2_4 col-lg-2_4 .col-xxl-2_4 col-md-4 col-sm-6 col-6">
    <div class="card-item">
      <div class="card-image position-relative">
        <a href="./detail.html?id=${p.id}"
          ><img
            src="${p.images[0]}"
            alt="${p.name}"
        /></a>
        <ul class="social position-absolute top-0 end-0">
          <li>
            
          </li>
          <li>
            <button
              class="button-discount"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal${p.id}"
              role="button"
            >
              <i class="fa-solid fa-bag-shopping"></i>
            </button>
          </li>
        </ul>
        
        <span class="flash-tag position-absolute">${p.tag}</span>
      </div>
      <div class="card-title">
        <h3>${p.name}</h3>
        <p>${formatMoney(p.price)}</p>
      </div>
      <button class="btn btn--detail">
        <a href="./detail.html?id=${p.id}">Chi tiết</a>
      </button>
      </div>
    <div class="modal fade render-modal"
          id="exampleModal${p.id}"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Chi tiết sản phẩm
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="product-detail">
                  <div class="product-modal d-flex border mb-4">
                    <div class = "col-lg-4 col-md-4 col-sm-4">
                    <div class="image">
                      <img src="${p.images[0]}" alt="${p.name}" />
                    </div>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-9">
          <div id="detail ">
              <p class="product-name fw-bold mx-1">${p.name}</p>
              <p class="product-price text-danger  fw-bold mb-2 mx-1">${formatMoney(
                p.price
              )}</p>
              <div class="size d-flex mx-1 mb-2">
                <span class="fw-bold me-3">Kích cỡ:</span>
              <div class="product-size mb-2">
                  <span class="border py-1 px-2 border-dark me-2 select-size" >M</span>
                  <span class="border py-1 px-2 border-dark me-2 select-size">S</span>
                  <span class="border py-1 px-2 border-dark me-2 select-size">L</span>
                  <span class="border py-1 px-2 border-dark me-2 select-size">XL</span>
              </div>
              </div>
              <div class="d-flex  align-items-center mb-2 flex-wrap">
                <span class="fw-bold me-3 mx-1">Số lượng:</span>
                  <span class="count-product d-inline-block me-3">
                      <span onclick='exparam12(${
                        p.id
                      })'  class="rounded-circle px-2 d-inline-block fw-bold btn-minus-count">-</span>
                      <span id='c${p.id}' class=" ">
                        <span class="count py-1 px-2 d-inline-block fw-bold ">1</span>
                       </span>
                      <span onclick='addparam12(${
                        p.id
                      })'  class="rounded-circle  px-2 d-inline-block fw-bold btn-plus-count">+</span>
                  </span>
                  <button onclick = 'addCartPants(${
                    p.id
                  })' class="btn-icon btn-add-to-cart">Thêm vào giỏ hàng</button>
              </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>`;
  });
  cardPantsEl.innerHTML = html;
};
let addCartPants = (id) => {
  let product = products.find((p) => p.id == id);
  let item = {
    id: product.id,
    name: product.name,
    price: product.price,
    size: "M",
    image: product.images[0],
    count: 1,
  };
  addItemToAdd(item);
  alert("Thêm vào giỏ hàng thành công");
  // let productCartSideBar = getDataCartFromLocalStorage()
  renderProductSidebar(productCartSideBar);
  updateTotalMoneysidebar();
};
const formatMoney = (number) => {
  return number.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
// const totalMoneyElProduct = document.getElementById("total-product");
// const updateTotalMoneyProduct = () => {
//   let totalMoney = 0;
//   items.map((e) => {
//     totalMoney += e.count * e.price;
//   });
//   totalMoneyElProduct.innerText = formatMoney(totalMoney);
// };
const totalMoneyElSidebar = document.getElementById("total-money-sidebar");
const updateTotalMoneysidebar = () => {
  let totalMoney = 0;
  items.map((e) => {
    totalMoney += e.count * e.price;
  });
  totalMoneyElSidebar.innerText = formatMoney(totalMoney);
};
updateTotalMoneysidebar(totalMoneyElSidebar);
renderCardPants(productPants);
renderCardJacket(productJacket);
renderCardTshirt(productTshirt);
renderProductSidebar(items);

$("#navbarDropdown").click(function () {
  $(".dropdown-menu").slideToggle(300, "linear");
});

$(".dropdown-menu").mouseleave(function () {
  $(this).slideToggle(300, "linear");
});

btnSearch.addEventListener("click", function () {
  this.parentElement.classList.toggle("open");
  this.previousElementSibling.focus();
});

$(".shopping-cart").click(function () {
  $(".cart").css("right", "0");
  $("#overlay").css("display", "block");
});
$(".close-cart").click(function () {
  $(".cart").css("right", "-450px");
  $("#overlay").css("display", "none");
});
$("#overlay").click(function () {
  $(".cart").css("right", "-450px");
  $("#overlay").css("display", "none");
});

$(".menu-icon").click(function () {
  $(".menu ul").css("left", "0");
  $("#overlay").css("display", "block");
});

$("#overlay").click(function () {
  $(".menu ul").css("left", "-250px");
  $("#overlay").css("display", "none");
});
$(window).resize(() => {
  if ($(window).innerWidth() > 768) {
    $(".menu ul").css("left", "-250px");
    $("#overlay").css("display", "none");
  }
});
function loadPopup() {
  $(".popup-coupon").css("top", "50%");
  $("#overlay").css("display", "block");
}
setTimeout(function () {
  loadPopup();
}, 1500);

$(".cancel-popup").click(function () {
  $(".popup-coupon").css("display", "none");
  $("#overlay").css("display", "none");
});
$("#overlay").click(function () {
  $(".popup-coupon").css("display", "none");
  $("#overlay").css("display", "none");
});

$(".image-slider").slick({
  dots: true,
  infinite: true,
  speed: 300,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: `<button type='button' class='slick-prev pull-left slick-arrow'><i class='fa fa-angle-left' aria-hidden='true'></i></button>`,
  nextArrow: `<button type='button' class='slick-next pull-right slick-arrow'><i class='fa fa-angle-right' aria-hidden='true'></i></button>`,
  responsive: [
    {
      breakpoint: 568,
      settings: {
        arrows: false,
      },
    },
  ],
});

$(".image-mini").slick({
  infinite: true,
  speed: 300,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  centerMode: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        centerPadding: "40px",
      },
    },
  ],
});

$(".suggest-content").slick({
  infinite: true,
  speed: 300,
  arrows: false,
  autoplay: true,
  slidesToShow: 3,
  centerMode: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        centerPadding: "40px",
      },
    },
  ],
});

$(".slider-for").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".slider-nav",
});
$(".slider-nav").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".slider-for",
  dots: false,
  centerMode: false,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});

$(function () {
  var url = window.location.href;
  $(".nav  a").each(function () {
    if (url == this.href) {
      $(this).closest("li").addClass("active");
    }
  });
});

const BtnCoppyRight = document.querySelectorAll(".btn-test");
Array.from(BtnCoppyRight).forEach((btn) => {
  btn.addEventListener("click", () => {
    // lọc những btn có đã sao chép thành sao chép mã
    Array.from(BtnCoppyRight).forEach((btn) => {
      if (btn.innerHTML.includes("Đã")) {
        btn.innerHTML = "Sao chép mã";
      }
    });
    navigator.clipboard.writeText(btn.dataset.disscount);
    // gán lại cho btn
    btn.innerHTML = "Đã chép mã";
  });
});

$(document).ready(function () {
  $(".navbar a.dropdown-toggle").on("click", function (e) {
    var $el = $(this);
    var $parent = $(this).offsetParent(".dropdown-menu");
    $(this).parent("li").toggleClass("open");
    if (!$parent.parent().hasClass("menu")) {
      $el.next().css({ top: $el[0].offsetTop, left: $parent.outerWidth() - 4 });
    }
    $(".nav li.open").not($(this).parents("li")).removeClass("open");
    return false;
  });
});

mybutton = document.getElementById("myBtn");
const header = document.getElementById("header");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const floating_btn = document.querySelector(".floating-btn");
const close_btn = document.querySelector(".close-btn");
const social_panel_container = document.querySelector(
  ".social-panel-container"
);

floating_btn.addEventListener("click", () => {
  social_panel_container.classList.toggle("visible");
});

close_btn.addEventListener("click", () => {
  social_panel_container.classList.remove("visible");
});
