import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { NavigateFunction } from "react-router-dom";

export interface IngredientsType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
}

export interface BurgerBuilderState {
  ingredients: IngredientsType | null;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
}

interface BurgerBuilderProps {
  navigateTo?: NavigateFunction;
}

export interface DisabledInfo {
  salad: boolean;
  bacon: boolean;
  cheese: boolean;
  meat: boolean;
  [key: string]: boolean;
}

const INGREDIENT_PRICES: IngredientsType = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
const DISABLED_INFO: DisabledInfo = {
  salad: true,
  cheese: true,
  meat: true,
  bacon: true,
};

class BurgerBuilder extends Component<BurgerBuilderProps> {
  state: BurgerBuilderState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://reactts-burger-builder-project-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients: IngredientsType): void {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type: string): void => {
    if (this.state.ingredients) {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  removeIngredientHandler = (type: string): void => {
    if (this.state.ingredients) {
      const oldCount = this.state.ingredients[type];
      if (oldCount <= 0) {
        return;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice,
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.navigateTo!({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo: DisabledInfo = {
      ...DISABLED_INFO,
    };
    for (let key in disabledInfo) {
      if (this.state.ingredients) {
        disabledInfo[key] = this.state.ingredients[key] <= 0;
      }
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

// const BurgerBuilder = () => {
//   const [ingredients, setIngredients] = useState<IngredientsType | null>(null);
//   const [totalPrice, setTotalPrice] = useState(4);
//   const [purchasable, setPurchasable] = useState(false);
//   const [purchasing, setPurchasing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     axios
//       .get(
//         "https://reactts-burger-builder-project-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
//       )
//       .then((response) => {
//         setIngredients(response.data);
//       })
//       .catch((err) => {
//         setError(true);
//       });
//   }, []);

//   const updatePurchaseState = (ingredients: IngredientsType): void => {
//     const sum = Object.keys(ingredients)
//       .map((igKey) => ingredients[igKey])
//       .reduce((sum, el) => sum + el, 0);
//     setPurchasable(sum > 0);
//   };

//   const addIngredientHandler = (type: string): void => {
//     if (ingredients) {
//       const oldCount = ingredients[type];
//       const updatedCount = oldCount + 1;
//       const updatedIngredients = {
//         ...ingredients,
//       };
//       updatedIngredients[type] = updatedCount;
//       const priceAddition = INGREDIENT_PRICES[type];
//       const oldPrice = totalPrice;
//       const newPrice = oldPrice + priceAddition;
//       setIngredients(updatedIngredients);
//       setTotalPrice(newPrice);
//       updatePurchaseState(updatedIngredients);
//     }
//   };

//   const removeIngredientHandler = (type: string): void => {
//     if (ingredients) {
//       const oldCount = ingredients[type];
//       if (oldCount <= 0) {
//         return;
//       }
//       const updatedCount = oldCount - 1;
//       const updatedIngredients = {
//         ...ingredients,
//       };
//       updatedIngredients[type] = updatedCount;
//       const priceDeduction = INGREDIENT_PRICES[type];
//       const oldPrice = totalPrice;
//       const newPrice = oldPrice - priceDeduction;
//       setIngredients(updatedIngredients);
//       setTotalPrice(newPrice);
//       updatePurchaseState(updatedIngredients);
//     }
//   };

//   const purchaseHandler = () => {
//     setPurchasing(true);
//   };

//   const purchaseCancelHandler = () => {
//     setPurchasing(false);
//   };

//   // const navigate = (place: string) => {
//   //   const navigateTo = useNavigate();
//   //   navigateTo(place);
//   // };

//   const purchaseContinueHandler = () => {
//     setLoading(true);
//     // const order = {
//     //   ingredients: this.state.ingredients,
//     //   price: this.state.totalPrice,
//     //   customer: {
//     //     name: "Paulius",
//     //     address: {
//     //       street: "Teststreet 1",
//     //       zipCode: "48624",
//     //       country: "LT",
//     //     },
//     //     email: "test@test.com",
//     //   },
//     //   deliveryMethod: "fastest",
//     // };
//     // axios
//     //   .post("/orders.json", order)
//     //   .then((response) => this.setState({ loading: false, purchasing: false }))
//     //   .catch((err) => this.setState({ loading: false, purchasing: false }));
//     // this.props.history.push("/checkout");
//   };

//   return <div></div>;
// };

// export default BurgerBuilder;
