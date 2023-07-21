import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])



const Slider = () => {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(3))
            const querySnap = await getDocs(q)
            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            // console.log(listings);
            setListings(listings)
            setLoading(false)
        }
        fetchListings()
    }, [])
    if (loading) {
        return <Spinner />
    }

    if (listings.length === 0) {
        return <></>
    }

    return (
        listings && (
            <>
                <p className="exploreHeading">Recommended</p>
                <Swiper slidesPerView={1} pagination={{ clickable: true }}>
                    {listings.map(({ data, id }) => {
                        return <div className='swiperSlideDiv' onClick={() => navigate(`/category/${data.type}/${id}`)}>
                            <p>{data.name}</p>
                            <p>${data.discountedPrice || data.regularPrice}{' '} {data.type === 'rent' && '/ month'}</p>

                            {/* {data.imgUrls[0]} */}
                        </div>
                    })}

                </Swiper>

            </>
        )
    )
}

export default Slider

//     return <SwiperSlide key={index}>
//     <div
//         style={{
//             background: `url(${data.imgUrls[0]}) center no-repeat`,
//             backgroundSize: 'cover',
//         }}
//         className='swiperSlideDiv'
//     ></div>
// </SwiperSlide>
// return <SwiperSlide key={id} onClick={()=> navigate(`/category/${data.type}/${id}`)}>
// </SwiperSlide>
// return <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
// </SwiperSlide>

{/* <Swiper slidesPerView={1} pagination={{ clickable: true }}>
                    {listings.map(({ data, id }) => {
                        return <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                            <div className="swiperSlideDiv">
                                <p className="swiperSlideText">{data.name}</p>
                                <p className="swiperSlidePrice">
                                    ${data.discountedPrice ?? data.regularPrice}{' '}
                                    {data.type === 'rent' && '/ month'}
                                </p>
                            </div>

                        </SwiperSlide>
                    })}

                </Swiper> */}