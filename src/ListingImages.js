import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Modal from "./Modal";

function ListingImages() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [largeImg , setIsLargeImg] = useState("");
  async function fetchData() {
    try {
        setIsLoading(true);
      const resp = await fetch(
        `https://pixabay.com/api/?key=39352543-1df32cceadf48a49caad8e66a&image_type=all&page=${page}`
      );
      const data = await resp.json();
      setImages((prevImages) => [...prevImages, ...data.hits]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    window.onscroll = function (ev) {
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [page]);

  function handleMouseEnter(index) {
    const updatedImages = [...images];
    updatedImages[index].showDetails = true;
    setImages(updatedImages);
  }

  function handleMouseLeave(index) {
    const updatedImages = [...images];
    updatedImages[index].showDetails = false;
    setImages(updatedImages);
  }
  return (
    <div className="listingImages">
      {isLoading ? <Loading /> : <div className="image-container">
        {images.map((each, idx) => {
          return (
            <div
              className="images-cont"
              key={idx}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onClick={() => setIsLargeImg(each.largeImageURL)}
            >
              <img src={each.webformatURL} className="images" alt={`Image ${idx}`} />
              {each.showDetails && (
                <div className="details">
                  <div className="userImg">
                    <img src={each.userImageURL} alt={`User ${idx}`} />
                    <p>{each.user}</p>
                  </div>
                  <div className="views">
                    Views👀 : {each.views}
                  </div>
                  <div className="likes">
                    Likes💖 : {each.likes}
                  </div>
                  <div className="commment">
                    Comments💬 : {each.comments}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {largeImg && <Modal img={largeImg} setIsLargeImg={setIsLargeImg} />}
      </div>}
      
    </div>
  );
}

export default ListingImages;
