import { useState } from 'react'
import {ContentWrapper, SwitchTabs, Carousel} from '../../../components'
import useFetch from "../../../hooks/useFetch"

const Trending = () => {

  

  const [endpoint, setEndpoint] = useState("day")

  const { data, loading,error } = useFetch(`/trending/all/${endpoint}`)

  const onTabChange = (tab) =>{
    setEndpoint(tab === "Day" ? "day" : "week")
  }


  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange} />
        </ContentWrapper>

        <Carousel data={data?.results} loading={loading} error={error}/>
      
    </div>
  )
}

export default Trending