// key là cart
// value = array
// Thêm vào local storage
const setDataToLocalStorage = (arr) => {
    localStorage.setItem("shopping-cart", JSON.stringify(arr));
}
// Lấy ra từ localStorage
const getDataFromLocalStorage = () => {
    const localStorageValue = localStorage.getItem("shopping-cart");
    if(localStorageValue) {
        return JSON.parse(localStorageValue)
    } else {
        return [];
    }
}

// Cấu trúc giỏ hàng
// const cart = [
//     {
//         id
//         name
//         price
//         image
//         count
//         size
//     }
// ]

const addItemToAdd = item => {
    // TH1 : Id chưa có trong giỏ hàng => thêm mới
    // TH2 : Id đã tồn tại và size chưa tồn tại => Thêm mới
    // TH3 : Id và size tồn tại => Cập nhật số lượng

    // Lấy cart từ localStorage
    let shoppingCart = getDataFromLocalStorage();

    // Nếu cart không tồn tại -> tại mới
    if(shoppingCart.length == 0) {
        shoppingCart.push(item);
    } else {
        // Tìm kiếm sản phẩm đã tồn tại trong giỏ hàng hay chưa
        let product = shoppingCart.find(p => p.id == item.id && p.size == item.size);

        // Nếu chưa tồn tại -> thêm vào
        // Nếu tồn tại -> cập nhật số lượng
        if(!product) {
            shoppingCart.push(item);
        } else {
            product.count += item.count;
        }
    }

    // Lưu dữ liệu của cart sau khi thêm vào localStorage
    setDataToLocalStorage(shoppingCart);

    // Cập nhật lại số lượng trên giao diện
    updateTotalCart();
}

const updateTotalCart = () => {
    // Lấy cart từ localStorage
    let shoppingCart = getDataFromLocalStorage();
    document.querySelector(".cart-count").innerText = shoppingCart.length;
}

updateTotalCart();