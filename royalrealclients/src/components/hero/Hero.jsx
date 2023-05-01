import React, { useState } from 'react'
import classes from "./hero.module.css"
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const {type,settingType}=useState("beach")
  const {continent,settingContinent}=useState("0")
  const {priceRange,settingPriceRange}=useState("0")
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)
  }

  
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your dream place right now</h2>
        <h5>Search the best selection of luxury real estate</h5>
        <div className={classes.options}>
        <select onChange={(e)=>settingType(e.target.value)}>

          <option disabled>Select Type</option>
          <option value="beach">Beach</option>
          <option value="mountain">Mountain</option>
          <option value="village">Village</option>
        </select>
        <select onChange={(e)=>settingPriceRange(e.target.value)}>
          <option disabled>Select Price Range</option>
          <option value="0">0-100,000</option>
          <option value="1">100,000-200,000</option>
          <option value="2">200,000-300,000</option>
          <option value="3">300,000-400,000</option>
          <option value="4">400,000-500,000</option>
        </select>
        <select onChange={(e)=>settingContinent(e.target.value)}>
          <option disabled>Select Continent</option>
          <option value="0">Asia</option>
          <option value="1">Europe</option>
          <option value="2">Africa</option>
          <option value="3">South America</option>
          <option value="4">North America</option>
          <option value="5">Oceania</option>  
        </select>
        <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch}/>
        </div>
      </div>

    </div>
  )
}

export default Hero