const btnSearch = document.querySelector('.search-btn');
const productList = document.querySelector(".product-list");
const subTotal = document.getElementById("sub-total-money")
console.log(subTotal)
const message = document.querySelector(".message");
const totalMoneyEl = document.getElementById("total-money");
const totalMoneyElSidebar = document.getElementById("total-money-sidebar");

// Lấy ra sản phẩm có trong giỏ hàng
let items = getDataFromLocalStorage();

const productItemSidabar = document.querySelector(".product-item-sidebar")
const renderProductSidebar = () => {
  if (items.length == 0) {
    productList.classList.add("d-none");
    return
  } else {
    message.classList.add("d-none");
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
                    <span class="minus-sidebar px-2 d-inline-block fw-bold bg-light" onclick="minusCount(${p.id}, '${p.size}')">-</span>
                    <span class="px-2 d-inline-block fw-bold">${p.count}</span>
                    <span class="plus-sidebar px-2 d-inline-block fw-bold bg-light" onclick="plusCount(${p.id}, '${p.size}')">+</span>
                </span>
                <button class="text-primary border-0 bg-transparent fw-light" onclick="deleteProduct(${p.id}, '${p.size}')">
                  <span><i class="fa-solid fa-trash-can"></i></i></span>
              </button>
            </div>
            <h3 class="text-danger fw-bold text-start">
                ${formatMoney(p.price)}
              </h3>
        </div>
    </div>
  </div>`
  });
  productItemSidabar.innerHTML = html;
}




//  Hiển thị danh sách ra ngoài giao diện
const renderProduct = () => {
  // Kiểm tra giỏ hàng rỗng hay không
  if (items.length == 0) {
    productItemSidabar.innerHTML = "Chưa có sản phẩm";
    return
  } else {
    message.classList.add("d-none");
  }
  // Nếu có sản phẩm thì hiển thị
  let html = "";
  items.forEach((p) => {
    html += `<div class="product-item d-flex border mb-4">
    <div class="image ">
        <img src="${p.image}" alt="${p.name}" />
    </div>
    <div class="info d-flex flex-column justify-content-between flex-grow-1">
        <div class="info-clothes">
            <div class="">
                <p class="text-dark fw-bold mb-lg-3 mb-sm-1">
                ${p.name} (${p.size})
                </p>
                
            </div>
            <p class="text-black-50 d-flex justify-content-between my-3">
                <span class="border d-inline-block ">
                    <span class="count-product d-inline-block fw-bold bg-light" onclick="minusCount(${p.id}, '${p.size}')">-</span>
                    <span class="count-product  d-inline-block fw-bold">${p.count}</span>
                    <span class="count-product d-inline-block fw-bold bg-light" onclick="plusCount(${p.id}, '${p.size}')">+</span>
                </span>
                <button class="text-primary border-0 bg-transparent fw-light" onclick="deleteProduct(${p.id}, '${p.size}')">
                    <span><i class="fa-solid fa-trash-can mt-3"></i></span>
                </button>
            </p>
        </div>
        <div>
            
            <h2 class="price text-danger fw-bold" id="sub-total-money">
            ${formatMoney(p.price)}
            </h2>
        </div>
    </div>
</div>`;
  });
  productList.innerHTML = html;
};

//  Xóa sản phẩm
const deleteProduct = (id, size) => {
  let isConfirm = confirm("Bạn có muốn xóa không?");
  if (isConfirm) {
    items = items.filter((p) => p.id != id || p.size != size);
    setDataToLocalStorage(items);
    updateTotalCart();
    renderProduct(items);
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
  renderProduct(items);
  updateSubTotalMoney()
  updateTotalMoney()
  updateTotalMoneysidebar()
  renderProductSidebar(items)
};

// Giảm số lượng
const minusCount = (id, size) => {
  let product = items.find((p) => p.id == id && p.size == size);
  product.count--;
  if (product.count < 1) {
    product.count = 1;
  }
  setDataToLocalStorage(items);
  renderProduct(items);
  updateSubTotalMoney()
  updateTotalMoneysidebar()
  updateTotalMoney()
  renderProductSidebar(items)
};
// Format tiền VND
const formatMoney = (number) => {
  return number.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

// renderProduct(items);


//Tính tiền

const updateTotalMoney = () => {
  let totalMoney = 0;
  items.map((e) => {
    totalMoney += e.count * e.price;
  });
  totalMoneyEl.innerText = formatMoney(totalMoney);
};

const updateTotalMoneysidebar = () => {
  let totalMoney = 0;
  items.map((e) => {
    totalMoney += e.count * e.price;
  });
  totalMoneyElSidebar.innerText = formatMoney(totalMoney);
};
const updateSubTotalMoney = () => {
  let totalMoney = 0;
  items.map((e) => {
    totalMoney += e.count * e.price;
  });
  subTotal.innerText = formatMoney(totalMoney);
  console.log(totalMoney)
};
updateSubTotalMoney()
updateTotalMoneysidebar()
updateTotalMoney();
renderProduct(items);
renderProductSidebar(items)


// Hiện thị giỏ hàng
$(".shopping-cart").click(function(){
  $(".cart").css("right","0");
  $("#overlay").css("display", "block");
})
$(".close-cart").click(function(){
  $(".cart").css("right","-450px");
  $("#overlay").css("display", "none");
})
$("#overlay").click(function () {
  $(".cart").css("right", "-450px");
  $("#overlay").css("display", "none");
});

// Hiện thị menu c2
$('#navbarDropdown').click(function() {
  $('.dropdown-menu').slideToggle(300, "linear");
});

$('.dropdown-menu').mouseleave(function() {
  $(this).slideToggle(300, "linear");
});
$(function () {
  var url = window.location.href;
  $(".nav  a").each(function () {
    if (url == this.href) {
      $(this).closest("li").addClass("active");
    }
  });
});



// Nút search
btnSearch.addEventListener('click',function(){
  this.parentElement.classList.toggle('open');
  this.previousElementSibling.focus();
})

// Hiện ra menu
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
