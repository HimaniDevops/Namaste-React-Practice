
import RestaurantCard  from "./RestaurantCard";
import { useState, useEffect } from "react";
import resList from "../utils/mockdata";
import Shimmer from "./Shimmer";

const Body = () => {
   const [listOfRestaurants, setlistOfRestaurant] = useState([]);
   const [filteredRestaurant, setFilteredRestaurant] = useState([]);

   const [searchText, setSearchText] = useState("");

   useEffect(() => {
         fetchData();
   }, []);

   const fetchData = async () => {
      const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

     const json = await data.json();
     
     setlistOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

     setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

   };
         return (listOfRestaurants?.length === 0 ? ( <Shimmer/>
      ): (
     
       <div className="body">
        <div className="filter">
         <div className="search">
            <input type="text" className="search-box" value = {searchText} onChange={(e) => {
                setSearchText(e.target.value);
            }}/>
            <button onClick={()=>{
              const filteredRestaurant = listOfRestaurants.filter((res)=> res.data.name.toLowerCase().includes(searchText.toLowerCase()));
              setlistOfRestaurant(filteredRestaurant);

            }}>Search</button>
         
         </div>
           <button className="filter-btn" onClick={()=>{
            const filteredList =  listOfRestaurants.filter((res) => res.data.avgRating > 4    
            );
            setlistOfRestaurant(filteredList);
         }}>
            Top Rated Restaurants</button>
        </div>
        <div className="res-container">
         {(filteredRestaurant || []).map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />

         ))}
          
        </div>
       </div>
    ));
 };
 export default Body;