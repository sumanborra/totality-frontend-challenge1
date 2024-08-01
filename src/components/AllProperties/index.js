import {Component} from 'react'
import {v4 as uuidv4} from "uuid";
import {Link,Redirect} from "react-router-dom"

import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'



import './index.css'

const locationOptions = [
  {
    location:"Hyderabd"
  },
  {
    location:"Bengalure"
   
  },
  {
    location:"Pune"
  
  },
  {
    location:"Vizag"
  },
  {
    location:"Hyderabad"
  },
]

const priceOptions = [
  {
    price:"price_below_15000"
  },
  {
    price:"price_below_50000"
  },
]

const bedRooms = [
  {
    bedroomsNo:1,
    displayText:"bedrooms__1"
  },
  {
    bedroomsNo:2,
    displayText:"bedrooms__2"
  },
  {
    bedroomsNo:3,
    displayText:"bedrooms__3"
  },
  {
    bedroomsNo:4,
    displayText:"bedrooms__4"
  }
]
const samplePropertiesData = [
    {
        id:uuidv4(),
        image:"https://img.freepik.com/premium-photo/house-with-large-porch-large-window-with-sun-shining-through_1260025-42919.jpg?w=740",
        title:"Luxary Rooms",
        description: "this rooms are availabel in Hyderabad hi-tech city",
        price:26000,
        bedroomsNo:3

    },
    {
        id:uuidv4(),
        image:"https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv_105762-2301.jpg?t=st=1722415633~exp=1722419233~hmac=e18d9a9d8cab21eaa68cc9fddfbeace0a498463a248678f424d53ea6dad8452a&w=900",
        title:"Family Rooms",
        description: "this rooms are availabel in Pune city",
        price:16000,
        bedroomsNo:1

    },
    {
        id:uuidv4(),
        image:"https://img.freepik.com/premium-photo/tropical-villa-kerala_1015255-74133.jpg?w=1060",
        title:"Bachelor's Rooms",
        description: "this rooms are availabel in Bengalure city",
        price:3000,
        bedroomsNo:1

    },
    {
        id:uuidv4(),
        image:"https://img.freepik.com/premium-photo/exterior-view-empress-market_1029622-25016.jpg?w=740",
        title:"Bachelor's Rooms",
        description: "this rooms are availabel in Vizag city",
        price:3000,
        bedroomsNo:2

    },
    {
        id:uuidv4(),
        image:"https://img.freepik.com/premium-photo/indian-style-luxury-decorated-house-with-ariel-view-with-big-lawn_876876-2349.jpg?w=740",
        title:"Family's Rooms",
        description: "this rooms are availabel in Kolkatha city",
        price:10000,
        bedroomsNo:1
    },
    {
        id:uuidv4(),
        image:"https://img.freepik.com/premium-photo/indian-style-luxury-decorated-house-with-ariel-view-with-big-lawn_876876-2349.jpg?w=740",
        title:"Family's Rooms",
        description: "this rooms are availabel in Kolkatha city",
        price:100000,
        bedroomsNo:4
    }
]



class AllProperties extends Component {
  
  state = {
    productsList: samplePropertiesData,
    priceOptions: '',
    locationOptions: '',
    bedRooms: '',
   
  }

  
  

  
  render() {
    const jwtToken = Cookies.get("jwtToken")
    if(jwtToken === undefined){
      return <Redirect to="/login"/>
    }
   return ( <>
    <CartContext.Consumer>
      {value => {
        const {cartList,addCartItem} = value
        const cartItemsCount = cartList.length
        
      
        const changeLocation = (event) =>{
          this.setState({locationOptions:event.target.value})
        }
        const changePrice = (event) =>{
          
          if(event.target.value === "price_below_15000"){
          this.setState({priceOptions:15000})
          }
          else if(event.target.value === "price_below_50000"){
              this.setState({priceOptions:50000})
          }
        }
        const changeBedRooms = (event) =>{
          
          this.setState({bedRooms:event.target.value})
        }
       const renderProductsListView = () => {
    
          const{productsList,locationOptions,priceOptions} = this.state;
          const shouldShowProductsList = productsList.length > 0
         
          const dataPropertiesList = productsList.filter(each =>(each.description.includes(locationOptions) || each.price <= priceOptions))
          
          const onClickAddToCart = (event) =>{
            const cartItemData = productsList.filter(each => (each.id === event.currentTarget.id))
            
            const product = {...cartItemData[0],quantity:1,imageUrl:cartItemData[0].image}
            addCartItem(product)
          }
      
          return shouldShowProductsList ? (
            
            <div className="all-products-container">
              
              <ul className="products-list">
                {dataPropertiesList.map(product => (
                  <li className="product-item" key={product.id}>
                  
                    <img src={product.image} alt="product" className="thumbnail" />
                    <h1 className="title">{product.title}</h1>
                    <p className="brand">by {product.description}</p>
                    <div className="product-details">
                      <p className="price">Rs {product.price}/-</p>
                    </div>
                    <p className="price">Number of BedRooms: {product.bedroomsNo}/-</p>
                    <button className='buttn' onClick={onClickAddToCart} id={product.id}>Book Now</button>
                </li>
                ))}
              </ul>
            
            </div>
            
           
          ) : (
            <div className="no-products-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                className="no-products-img"
                alt="no products"
              />
              <h1 className="no-products-heading">No Products Found</h1>
              <p className="no-products-description">
                We could not find any products. Try other filters.
              </p>
            </div>
          )
        }
        

        const renderCartItemsCount = () => (
          
            <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
            </>
          
   
        )
          
            
          
        
    return (
        <>
        
        <div className='background-cart-feature'><Link to="/cart" className="link-style"><p className='cart-text'>Cart{renderCartItemsCount()}</p></Link></div>
      <div className="all-products-section">
        
        <div className='fiter-section'>
            
            <select className='select-input' onChange={changeLocation}>
                {locationOptions.map(each =>(<option key={each.location} id={each.location}>{each.location}</option>))}
            </select>
            <select className='select-input' onChange={changePrice}>
                {priceOptions.map(each =>(<option key={each.price} id={each.price}>{each.price}</option>))}
            </select>
            <select className='select-input' onChange={changeBedRooms}>
                {bedRooms.map(each =>(<option key={each.bedroomsNo} id={each.bedroomsNo}>{each.displayText}</option>))}
            </select>
        </div>
        {renderProductsListView()}
      </div>
      </>
     
    )
  
  }
  }
  </CartContext.Consumer>
  </>
   )
  }
  
}

export default AllProperties;
