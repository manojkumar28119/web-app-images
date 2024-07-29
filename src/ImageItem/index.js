import Popup from 'reactjs-popup'

import "./index.css"


const ImageItem = (props) => {
    const {item} = props
    console.log(item)
    const {cover_photo} = item
    const {urls} = cover_photo
    return (
        <div className="image-item">
          <Popup
            trigger={
                <div className="item">
                <img src={urls.raw} alt = {item.alt_description} className="image" />
             </div>
            }
            position="top center"
            on={['hover', 'focus']}
            closeOnDocumentClick
          >
            <div className='popup-card'>
              <p className='title'>{item.title}</p>
              <p className="popup-text">{cover_photo.alt_description}</p>
              <p className="popup-text">Published at : {item.published_at}</p>
            </div>
          </Popup>
        </div>
       )
}

export default ImageItem; 