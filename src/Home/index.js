import {useState,useEffect} from "react"
import {MagnifyingGlass} from "react-loader-spinner"
import { CiSearch } from "react-icons/ci";
import ImageItem from "../ImageItem"

import "./index.css"

const Home = () => {
    const [currentData,setData] = useState([])
    const [apiStatus,setApiStatus] = useState(false)
    const [query,setQuery] = useState("mom")

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

    console.log(currentData)

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

    const renderImages = () =>(
    
        currentData.length === 0 ? (<div className="not-found"><p>Images Not Found😢</p></div>) :(
            <div className="images-card">
                {currentData.map((each) => <ImageItem key={each.id} item = {each}/> )}
            </div>
        )
    )
    

    const onChangeSearchq = (event) => {
        setQuery(event.target.value)
    }

    console.log(query)

    return (
        <div className="main-card">
            <div className="search-card">
                <input type="search" onChange={onChangeSearchq} placeholder="Search an Image Item" className="input"/>
                <div className="icon-card">
                    <CiSearch className="icon"/>
                </div>
            </div>
            {apiStatus === true? renderImages(): renderLoadingView()}
        </div>
    )
}

export default Home