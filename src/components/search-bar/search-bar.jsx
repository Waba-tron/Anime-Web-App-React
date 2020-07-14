import React from 'react'

export default function SearchBar({placeholder, handleChange, resultFuntion}) {
    return (
        
              <input type='search' onKeyPress={resultFuntion} className='search' placeholder={placeholder} onChange = {handleChange}/>
        
    )
}
