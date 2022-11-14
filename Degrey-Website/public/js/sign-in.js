function signup(e) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var user = {
    username: username,
    email: email,
    password: password,
  };
  var json = JSON.stringify(user);
  localStorage.setItem(username, json);
  alert("dang ky thanh cong");
  window.location.href = "login.html";
}
function login(e) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var user = localStorage.getItem(username);
  var data = JSON.parse(user);
  if (!user) {
    alert("vui long nhap username password");
  } else if (
    // username == data.username &&
    email == data.email &&
    password == data.password
  ) {
    alert("dang nhap thanh cong");
    window.location.href = "index.html";
    
  } else {
    alert("dang nhap that bai");
  }
}
const btnSearch = document.querySelector('.search-btn');
const addCart = document.querySelectorAll('.social .add-cart')// Hiện thị giỏ hàng
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
