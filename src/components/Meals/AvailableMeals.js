import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const mealsResponse = await fetch(
        "https://react-http-ee4c9-default-rtdb.firebaseio.com/meals.jso"
      );

      if (!mealsResponse.ok) {
        throw new Error("Failed to load meals !");
      }

      const mealsData = await mealsResponse.json();
      setDummyMeals(Object.values(mealsData));
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={classes.MealsError}>
        <p>{isError}</p>
      </section>
    );
  }

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
