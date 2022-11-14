const totalMoneyElSidebar = document.getElementById("total-money-sidebar");
let items = getDataFromLocalStorage();

const formatMoney = (number) => {
  return number.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
const productItemSidabar = document.querySelector(".product-item-sidebar")
const renderProductSidebar = () => {
  if (items.length == 0) {
    productItemSidabar.innerHTML = "Chưa có sản phẩm";
    return
  } 
  // else {
  //   message.classList.add("d-none");
  // }
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
                    <span class="px-2 d-inline-block fw-bold bg-light" onclick="minusCount(${p.id}, '${p.size}')">-</span>
                    <span class="px-2 d-inline-block fw-bold">${p.count}</span>
                    <span class="px-2 d-inline-block fw-bold bg-light" onclick="plusCount(${p.id}, '${p.size}')">+</span>
                </span>
                <button class="text-primary border-0 bg-transparent fw-light"  onclick="deleteProduct(${p.id}, '${p.size}')">
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
renderProductSidebar(items)

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



$('#navbarDropdown').click(function() {
    $('.dropdown-menu').slideToggle(300, "linear");
  });
  
  $('.dropdown-menu').mouseleave(function() {
    $(this).slideToggle(300, "linear");
  });
  
const btnSearch = document.querySelector('.search-btn');
  btnSearch.addEventListener('click',function(){
    this.parentElement.classList.toggle('open');
    this.previousElementSibling.focus();
  })

  
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
  $(function () {
    var url = window.location.href;
    $(".nav  a").each(function () {
      if (url == this.href) {
        $(this).closest("li").addClass("active");
      }
    });
  });