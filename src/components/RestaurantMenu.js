import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    const {resId} = useParams();

    useEffect(() => {
       fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

      const json = await data.json();
      console.log(json);
      setResInfo(json.data);

    };

    if (resInfo === null) return <Shimmer />;

    const{ name, cuisines, costForTwoMessage} = resInfo?.cards[0]?.card?.card?.info;

    const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    

    

        return (
        <div className="menu">
            <h1>{name}</h1>
            <h1>{cuisines.join(" ,")}</h1>
            <h1>{costForTwoMessage}</h1>
            <h2> Menu</h2>
            <ul>
                {itemCards.map(item => (<li key={item.card.info.id}> {item.card.info.name} -  {"Rs."} {item.card.info.price / 100|| item.card.info.defaultPrice / 100}
                    
                </li> ))}
                
            </ul>

        </div>
    );
};

export default RestaurantMenu;