import React, { useState } from "react";
import "../styles/Event.css"
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../slice/VenueSlice";
import { incrementAddonQuantity, decrementAddonQuantity } from "../slice/AddOnSlice";
import { toggleMealSelection } from "../slice/MealSlice";


const EventDetails = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const venueItems = useSelector((state) => state.venue);
    const addonItems = useSelector((state) => state.addon);
    const mealItems = useSelector((state) => state.meals)
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "LAN Battle Zone (Capacity:200)").quantity;

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
            return;
        }
        dispatch(incrementQuantity(index));
    };

    const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
            dispatch(decrementQuantity(index));
        }
    };
    const handleIncrementAddonQuantity = (index) => {
        dispatch(incrementAddonQuantity(index));
    };

    const handleDecrementAddonQuantity = (index) => {
        dispatch(decrementAddonQuantity(index))
    };

    const handleMealSelection = (index) => {
        dispatch(toggleMealSelection(index))
    };

    const getItemsFromTotalCost = () => {
        const items = [];
        venueItems.forEach((item) => {
            if (item.quantity > 0) {
                items.push({ ...item, type: "venue" });
            }
        });
        addonItems.forEach((item) => {
            if (
                item.quantity > 0 &&
                !items.some((i) => i.name === item.name && i.type === "av")
            ) {
                items.push({ ...item, type: "av" });
            }
        });
        mealItems.forEach((item) => {
            if (item.selected) {
                if (numberOfPeople) {
                    const itemForDisplay = { ...item, type: "meals", numberOfPeople: numberOfPeople };
                    items.push(itemForDisplay);
                }

            }
        });
        return items;
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        console.log(items);
        return <>
            <div className="display_box1">
                {items.length === 0 && <p>No items selected</p>}
                <table className="table_item_data">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.cost}</td>
                                <td>
                                    {item.type === "meals" || item.numberOfPeople
                                        ? ` For ${numberOfPeople} people`
                                        : item.quantity}
                                </td>
                                <td>{item.type === "meals" || item.numberOfPeople
                                    ? `${item.cost * numberOfPeople}`
                                    : `${item.cost * item.quantity}`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    };
    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
            venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        }
        else if (section === 'addon') {
            addonItems.forEach((item) => {
                totalCost = totalCost + (item.cost * item.quantity)
            })
        }
        else if (section === 'meal') {
            if (isNaN(numberOfPeople)) {
                return 0
            }

            console.log(numberOfPeople)
            mealItems.forEach(item => {
                if (item.selected === true) {
                    totalCost = totalCost + (numberOfPeople * item.cost)
                }
            })
        }
        return totalCost;
    }


    const venueTotalCost = calculateTotalCost("venue");

    const addonTotalCost = calculateTotalCost('addon')

    const mealTotalCost = calculateTotalCost('meal')

    const navigateToProducts = (idType) => {
        if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
            if (showItems) { // Check if showItems is false
                setShowItems(!showItems); // Toggle showItems to true only if it's currently false
            }
        }
    }

    const totalCosts = {
        venue: venueTotalCost,
        addon: addonTotalCost,
        meals: mealTotalCost,
    };



    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue" onClick={() => navigateToProducts("#venue")} >Venue</a>
                        <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                        <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
                    </div>
                    <button className="details_button" onClick={() => setShowItems(!showItems)}>
                        Show Details
                    </button>
                </div>
            </navbar>
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                            <div id="venue" className="venue_container container_main">
                                <div className="text">

                                    <h1>Venue Room Selection</h1>
                                </div>
                                <div className="venue_selection">
                                    {venueItems.map((item, index) => (
                                        <div className="venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                                            <div className="button_container">
                                                {venueItems[index].name === "LAN Battle Zone (Capacity:200)" ? (

                                                    <>
                                                        <button
                                                            className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                                                            onClick={() => handleRemoveFromCart(index)}
                                                        >
                                                            &#8211;
                                                        </button>
                                                        <span className="selected_count">
                                                            {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                                                        </span>
                                                        <button
                                                            className={remainingAuditoriumQuantity === 0 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                                                            onClick={() => handleAddToCart(index)}
                                                        >
                                                            &#43;
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="button_container">
                                                        <button
                                                            className={venueItems[index].quantity === 0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
                                                            onClick={() => handleRemoveFromCart(index)}
                                                        >
                                                            &#8211;
                                                        </button>
                                                        <span className="selected_count">
                                                            {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
                                                        </span>
                                                        <button
                                                            className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
                                                            onClick={() => handleAddToCart(index)}
                                                        >
                                                            &#43;
                                                        </button>


                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: ${venueTotalCost}</div>
                            </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main">


                                <div className="text">

                                    <h1> Add-ons Selection</h1>

                                </div>
                                <div className="addons_selection">
                                    {addonItems.map((item, index) => (
                                        <div className="av_data venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text"> {item.name} </div>
                                            <div> ${item.cost} </div>
                                            <div className="addons_btn">
                                                <button className="btn-warning" onClick={() => handleDecrementAddonQuantity(index)}> &ndash; </button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button className=" btn-success" onClick={() => handleIncrementAddonQuantity(index)}> &#43; </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: {addonTotalCost}</div>

                            </div>

                            {/* Meal Section */}

                            <div id="meals" className="venue_container container_main">

                                <div className="text">

                                    <h1>Meals Selection</h1>
                                </div>

                                <div className="input-container venue_selection">
                                    <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
                                    <input type="number" className="input_box5" id="numberOfPeople" value={numberOfPeople}
                                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                        min="1"
                                    />
                                </div>
                                <div className="meal_selection">
                                    {mealItems.map((item, index) => (
                                        <div className="meal_item" key={index} style={{ padding: 15 }}>
                                            <div className="inner">
                                                <input type="checkbox" id={`meal_${index}`}
                                                    checked={isNaN(numberOfPeople) ? false : item.selected}
                                                    onChange={() => handleMealSelection(index)}
                                                />
                                                <label htmlFor={`meal_${index}`}> {item.name} </label>
                                            </div>
                                            <div className="meal_cost">${item.cost}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: {mealTotalCost}</div>


                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>

                    )
                }




            </div>
        </>

    );
};

export default EventDetails;
