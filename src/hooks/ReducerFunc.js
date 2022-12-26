import initialValues from "./InitialValues";

const ReducerFunc = (state, actionObj) => {
  switch (actionObj.type) {
    case "signin": {
      return {
        ...state,
        token: actionObj.payload.token,
        role: actionObj.payload.role,
      };
    }
    case "signOut": {
      return initialValues;
    }
    case "startLoading": {
      return { ...state, loaderState: true };
    }
    case "stopLoading": {
      return { ...state, loaderState: false };
    }
    case "snackBar": {
      return {
        ...state,
        snackBarType: actionObj.payload.type,
        snackBarMsg: actionObj.payload.msg,
      };
    }

    case "ADDTOCART": {
      return {
        ...state,
        cart: [...state.cart, actionObj.payload.idObj],
      };
    }
    case "REMOVEFROMCART": {
      const filterArr = state.cart.filter((cartIdObj) =>
        cartIdObj.id === actionObj.payload.id ? "" : cartIdObj
      );
      return {
        ...state,
        cart: [...filterArr],
      };
    }

    case "addEmail": {
      return { ...state, email: actionObj.payload.email };
    }
    case "clearEmail": {
      return { ...state, email: "" };
    }

    case "updateOrderAmount": {
      return { ...state, orderTotalAmount: actionObj.payload };
    }
    case "clearOrderAmount": {
      return { ...state, orderTotalAmount: null };
    }

    case "paymentSuccess": {
      return {
        ...state,
        cart: [],
        email: "",
        orderTotalAmount: null,
      };
    }

    default:
      return state;
  }
};

export default ReducerFunc;