import React, { useRef, useState } from "react";
import "./SearchBar.css"

export default function SearchBar ({placeholder, data}) {

    const [filteredData, setFilteredData] = useState([]);
    const searchInput = useRef();

    const handleFilter = (e) =>{
        const searchWord = e.target.value;
        const newFilter = data.filter(event=>event.title.toLowerCase().includes(searchWord.toLowerCase()))
        if (searchWord === "") {
            setFilteredData([])
        } else{
            setFilteredData(newFilter)
        }
    }

    const clearInput = (e) =>{
        setFilteredData([])
        searchInput.current.value = "";
    }

    // debugger
    // if (searchInput.current) console.log(searchInput.current.value)

    return (
        <div className="search-bar">
            <div className="search-inputs">
                <input type="text" placeholder={placeholder} onChange={handleFilter} ref={searchInput}/>
                <div className="search-icon">
                    {!searchInput.current?.value ?
                        <i className="fa-solid fa-magnifying-glass"></i> :
                        <i className="fa-solid fa-xmark" id="clear-btn" onClick={clearInput}></i>
                }
                </div>
            </div>
            {filteredData.length != 0 &&
                <div className="data-result">
                        {filteredData.slice(0,7).map((event,key)=>{
                            return (
                            <a className="data-item" href="#" key={key}>
                                <p>
                                {event.title}
                                </p>
                            </a>)
                        })}
                </div>
            }

        </div>
    )
}
