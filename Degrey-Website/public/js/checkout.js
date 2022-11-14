const checkOutProduct = document.querySelector(".product-list");
const discountBox = document.querySelector(".discount-box");
const discountMoneyEl = document.getElementById("discount-money");
const discountInput = document.getElementById("discount-form-input");
const btnDiscount = document.getElementById("btn-apply");
const citis = document.getElementById("city");
const districts = document.getElementById("district");
const wards = document.getElementById("ward");
const Parameter = {
  url: "../public/data/vietnam.json", //Đường dẫn đến file chứa dữ liệu hoặc api do backend cung cấp
  method: "GET",
  responseType: "application/json",
};

//gọi ajax = axios => nó trả về cho chúng ta là một promise
let promise = axios(Parameter);
//Xử lý khi request thành công
promise.then(function (result) {
  renderCity(result.data);
});

function renderCity(data) {
  for (const x of data) {
    citis.options[citis.options.length] = new Option(x.Name, x.Id);
  }

  // xứ lý khi thay đổi tỉnh thành thì sẽ hiển thị ra quận huyện thuộc tỉnh thành đó
  citis.onchange = function () {
    district.length = 1;
    ward.length = 1;
    if (this.value != "") {
      const result = data.filter((n) => n.Id === this.value);

      for (const k of result[0].Districts) {
        district.options[district.options.length] = new Option(k.Name, k.Id);
      }
    }
  };

  // xứ lý khi thay đổi quận huyện thì sẽ hiển thị ra phường xã thuộc quận huyện đó
  district.onchange = function () {
    ward.length = 1;
    const dataCity = data.filter((n) => n.Id === citis.value);
    if (this.value != "") {
      const dataWards = dataCity[0].Districts.filter(
        (n) => n.Id === this.value
      )[0].Wards;

      for (const w of dataWards) {
        wards.options[wards.options.length] = new Option(w.Name, w.Id);
      }
    }
  };
}

let items = getDataFromLocalStorage();
const renderProductCheckout = () => {
  checkOutProduct.innerHTML = "";
  let html = "";
  items.forEach((p) => {
    html += ` <div class="product-item d-flex border mb-4">
    <div class="image">
      <img src="${p.image}" alt="${p.Name}" />
    </div>
    <div
      class="info d-flex flex-column justify-content-between px-4 py-3 flex-grow-1"
    >
      <div>
        <div class="d-flex">
          <h2 class="text-dark fs-5">${p.name} (${p.size})</h2>
        </div>
      </div>
      <div>
        <h3 class="fs-5 fw-bold">${formatMoney(p.price)}</h3>
      </div>
    </div>
  </div>`;
  });
  checkOutProduct.innerHTML = html;
};

const formatMoney = (number) => {
  return number.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

renderProductCheckout(items);

const subTotalMoneyEl = document.getElementById("sub-total-money");
const updateSubTotalMoney = () => {
  let totalMoney = 0;
  items.map((e) => {
    totalMoney += e.count * e.price;
  });
  subTotalMoneyEl.innerText = formatMoney(totalMoney);
};
updateSubTotalMoney();

let discountCode = {
  FREESHIPCOD: 10,
  DEGREYRATYEUBAN: 20,
  HANOIKHONGVOIDUOCDAU: 30,
  DEGREYVIETNAM: 40,
};
const checkDiscountCode = () => {
  let value = discountInput.value;
  if (discountCode[value]) {
    return discountCode[value];
  }
  return 0;
};
const totalMoneyEl = document.getElementById("total-money");
const updateTotalMoney = () => {
  let totalMoney = 0;
  items.map((e) => {
    totalMoney += e.count * e.price;
  });
  // subTotalMoney.innerText = formatMoney(totalMoney);
  totalMoneyEl.innerText = formatMoney(totalMoney);

  let data = checkDiscountCode();
  if (data) {
    discountMoney = (totalMoney * data) / 100;
    discountBox.classList.remove("d-none");
    discountMoneyEl.innerText = formatMoney(discountMoney);
    totalMoneyEl.innerText = formatMoney(totalMoney - discountMoney);
  } else {
    discountBox.classList.add("d-none");
  }
};

updateTotalMoney();

btnDiscount.addEventListener("click", () => {
  let value = discountInput.value;
  if (discountCode[value]) {
    btnDiscount.style.backgroundColor = "#338dbc";
    return updateTotalMoney(items);
  } else {
    alert("Nhập mã không hợp lệ");
  }
});

const BtnCoppyRight = document.querySelectorAll(".btn-test");
Array.from(BtnCoppyRight).forEach((btn) => {
  btn.addEventListener("click", () => {
    // lọc những btn có đã sao chép thành sao chép mã
    Array.from(BtnCoppyRight).forEach((btn) => {
      if (btn.innerHTML.includes("Đã")) {
        btn.innerHTML = "Áp dụng ";
      }
    });
    navigator.clipboard.writeText(btn.dataset.disscount);
    // gán lại cho btn
    btn.innerHTML = "Đã áp dụng";
  });
});

async function paste(input) {
  const text = await navigator.clipboard.readText();
  input.value = text;
}

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const btnCheckout = document.querySelector(".footer-payment button");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
let inputEles = document.querySelectorAll(".form-control");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   checkInputs();
// });

btnCheckout.addEventListener("click", (e) => {
  Array.from(form).map((ele) => ele.classList.remove("success", "error"));
  e.preventDefault();
  let isValid = checkInputs();
  if (isValid) {
    alert("Thanh toán thành công");
  }
});
function checkInputs() {
  // trim to remove the whitespaces
  let isCheck = true;
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const addressValue = address.value.trim();
  const phoneValue = phone.value.trim();
  if (usernameValue === "") {
    setErrorFor(username, "Họ và tên không được để trống");
    isCheck = false;
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email không được để trống");
    isCheck = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email không hợp lệ");
    isCheck = false;
  } else {
    setSuccessFor(email);
  }

  if (addressValue === "") {
    setErrorFor(address, "Địa chỉ không được để trống");
    isCheck = false;
  } else {
    setSuccessFor(address);
  }
  if (phoneValue === "") {
    setErrorFor(phone, "Số điện thoại không được để trống");
    isCheck = false;
  } else if (!isPhone(phoneValue)) {
    setErrorFor(phone, "Số điện thoại không hợp lệ");
    isCheck = false;
  } else {
    setSuccessFor(phone);
  }
  return isCheck;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
function isPhone(number) {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}
