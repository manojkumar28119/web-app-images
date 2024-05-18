import "./index.css"


const ImageItem = (props) => {
    const {item} = props
    const {cover_photo} = item
    const {urls} = cover_photo
    return (
        <div className="image-item">
            <img src={urls.raw} alt = {item.alt_description} className="image" />
            <p className="description">{cover_photo.alt_description}</p>
         </div>
    )
}

export default ImageItem;