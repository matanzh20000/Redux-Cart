import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import classes from "./CartButton.module.css";
import { useState, useEffect } from "react";

const CartButton = (props) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const [buttonBump, setButtonBump] = useState(false);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const btnClasses = `${classes.button} ${buttonBump ? classes.bump : ""}`;

  useEffect(() => {
    if (cartQuantity === 0) {
      return;
    }
    setButtonBump(true);

    const timer = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartQuantity]);

  return (
    <button className={btnClasses} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
