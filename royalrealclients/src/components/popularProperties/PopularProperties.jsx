import React, { useEffect, useState } from 'react'
import classes from "./PopularProperties.module.css"
import { Link } from 'react-router-dom'
import img1 from "../../assets/realestatebeach.jpg"
import img2 from "../../assets/realestatemountain.jpg"
import img3 from "../../assets/realestatecountryside.jpg"
import { request } from '../util/fetchAPI'

const PopularProperties = () => {

  const [numProperties,setNumProperties]=useState({})

  useEffect(()=>{
    const fetchNumberProperties =async()=>{
      try {
        const data=await request("/property/find/types","GET")
        setNumProperties(data)
      } catch (error) {
        console.log(error.message)
      }
    
    }
    fetchNumberProperties()
  },[])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Difference types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
          <Link className={classes.property} to={"/properties?type=beach&continent=1&priceRange=2"}>
            <img src={img1} alt="" />
            <div className={classes.quantity}>{numProperties?.beach} properties</div>
          <h5>Beach properties</h5>
          </Link>
          <Link className={classes.property} to={"/properties?type=mountain&continent=1&priceRange=2"}>
            <img src={img2} alt="" />
            <div className={classes.quantity}>{numProperties?.mountain} properties</div>
          <h5>Mountain properties</h5>
          </Link>
          <Link className={classes.property} to={"/properties?type=village&continent=1&priceRange=2"}>
            <img src={img3} alt="" />
            <div className={classes.quantity}>{numProperties?.village} properties</div>
          <h5>Village properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties