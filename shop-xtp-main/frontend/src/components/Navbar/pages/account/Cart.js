import styles from "./Account.module.scss";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { CgFormatSlash } from "react-icons/cg";
import { BsCartPlus } from "react-icons/bs";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Service from "../../../api/shopService";
function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("0");
  const id = JSON.parse(window.localStorage.getItem("id"));
  useEffect(() => {
    if (id !== 0) {
      Service.getListOrderCustomer(id).then((res)=>{
       const a= res.data.map((el)=> {
          return {
            index:el.id,
            amount:el.items[0].amount,
            image:el.items[0].product.image[0],
            id:el.items[0].product.id,
            name:el.items[0].product.name,
            price:el.items[0].product.price,
          }
        });
        setCart(a)
      })
    } else {
      setCart([]);
    }
  }, [id]);

  useEffect(() => {
    if (cart.length > 0) {
      const result = cart.reduce((result, prod) => {
        return (
          result +
        prod.amount * prod.price
        );
      }, 0);
      setTotal(result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    if (cart.length === 0) {
      setTotal("0");
    }
  }, [cart]);
  return (
    <div className={styles.cart}>
      <div className={styles.cartPrice}>
        <p>GIỎ HÀNG</p> <CgFormatSlash className={styles.cgFormatSlash} />
        <span>{total}đ</span>
        <BsCartPlus className={styles.bsCartPlus} />
        <div className={styles.hoverCart}>
          {cart.length === 0 && <p>Chưa có sản phẩm trong giỏ hàng</p>}
          {cart.length > 0 && (
            <div>
              <div className={styles.Scroll}>
                {cart.map((el, index) => {
                  return (
                    <Nav.Link
                      key={index}
                      className={styles.hoverCartProduct}
                    href={`/Cart/${el.id}`}
                      onClick={()=>window.localStorage.setItem("idProduct", JSON.stringify(el.id))}
                    >
                      <img src={el.image} alt="" />
                      <div className={styles.hoverCartProductDiv}>
                        <p>{el.name}</p>
                        <span>
                          {el.amount} x {el.price}đ
                        </span>
                      </div>
                    </Nav.Link>
                  );
                })}
              </div>
                 <Nav.Link
                className={styles.hoverCartButton}
                as={Link}
                to="/viewcart"
              >
                XEM GIỎ HÀNG
              </Nav.Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
