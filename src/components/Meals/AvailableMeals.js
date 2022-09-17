import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mealsResponse = await fetch(
        "https://react-http-ee4c9-default-rtdb.firebaseio.com/meals.json"
      );
      const mealsData = await mealsResponse.json();
      setDummyMeals(Object.values(mealsData));
    };

    fetchData();
  }, []);
  const mealsList = dummyMeals.map((meal) => (
    <li key={meal.id.toString()}>
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    </li>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
