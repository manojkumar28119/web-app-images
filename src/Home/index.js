import {useState,useEffect} from "react"
import {MagnifyingGlass} from "react-loader-spinner"
import { CiSearch } from "react-icons/ci";
import ImageItem from "../ImageItem"
import {SearchKeyBtn} from "./styledComonent"

import "./index.css"

const Home = () => {
    const [currentData,setData] = useState([])
    const [apiStatus,setApiStatus] = useState(false)
    const [query,setQuery] = useState("")

    useEffect(() => {
        setApiStatus(false)
        const getData = async() => {
            const url = `https://api.unsplash.com/search/collections?page=1&query=${query}`
            console.log(url)
            const options = {
                method:"GET",
                headers:{
                    Authorization: "Client-ID 56jTg7LSAbke8DR7LmYm0ELA605LT3MhgWhbIt0XAeY" 
                }
            }
            const response =  await fetch(url,options)
            console.log(response)
            if (response.ok){
                const data = await response.json()
                const {results} = data
                setData(results);
                setApiStatus(true);
            } 
            
        }
        getData();
    },[query])


    const renderLoadingView = () => (
        <div className="loader-card">
            <MagnifyingGlass
            height="80"
            width="80"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            glassColor="#c0efff"
            color="#e15b64"
            />
        </div>
    )

    const SearchImages = () => (
        <div className="not-found"><p>Search for Images 🤩</p></div>
    )

    const renderImages = () =>(
        currentData.length === 0 ? (<div className="not-found"><p>Images Not Found😢</p></div>) :(
            <>
            <div className="result-text-card">
                <p className="result-text">Results for {query}</p>
            </div>
            <div className="images-card">
                {currentData.map((each) => <ImageItem key={each.id} item = {each}/> )}
            </div>
            </>
        )
    )
    
    const onClickSearchKeyBtn = (event) => {
         setQuery(event.target.textContent)
    }

    const onChangeSearchq = (event) => {
        setQuery(event.target.value)
    }


    const renderSearchKeys = () => ( 
        <div className="search-keys-card">
            <SearchKeyBtn onClick={onClickSearchKeyBtn}>Mountain</SearchKeyBtn>
            <SearchKeyBtn onClick={onClickSearchKeyBtn}>Flowers</SearchKeyBtn>
            <SearchKeyBtn onClick={onClickSearchKeyBtn}>Beaches</SearchKeyBtn>
            <SearchKeyBtn onClick={onClickSearchKeyBtn}>Cities</SearchKeyBtn>
        </div>
    )

 
    return (
        <div className="main-card">
            <div className="search-card">
                <input type="search" onChange={onChangeSearchq} placeholder="Search an Image" className="input"/>
                <div className="icon-card">
                    <CiSearch className="icon"/>
                </div>
            </div>
            {renderSearchKeys()}
            {query.length !== 0 ? apiStatus === true? renderImages(): renderLoadingView() : SearchImages() }
        </div>
    )
}

export default Home