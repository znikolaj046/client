import Carousel from 'react-bootstrap/Carousel';
import { useContext, useEffect, useState } from 'react'
import { fetchBanners } from '../http/catalogAPI.js'
import { AppContext } from '../components/AppContext.js'

function Banners() {
  const { catalog } = useContext(AppContext)
  const [bannersFetching, setBannersFetching] = useState(true)
  
  useEffect(() => {
    fetchBanners()
        .then(data => catalog.banners = data)
        .finally(() => setBannersFetching(false))
  }, [])

  return (
    <Carousel fade className='mb-4'>

    {catalog.banners.map(item =>
      <Carousel.Item key={item.id}>
        <img
          className="d-block w-100"
          src={process.env.REACT_APP_IMG_URL + item.image}
          alt={item.name}
        />
        <Carousel.Caption>
          <h3>{item.name}</h3>
          <p>{item.name}</p>
        </Carousel.Caption>
      </Carousel.Item>      
    )}
      
    </Carousel>
  );
}

export default Banners;