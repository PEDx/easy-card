import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCards } from 'swiper'
import { stageList } from '@/service/stage'
import { reqCSVFile } from '@/service/api'
import { WordCard } from '@/components/WordCard'
import 'swiper/css/effect-cards'
import 'swiper/css'
import './style.scss'

SwiperCore.use([EffectCards])

export const CardStack = () => {
  useEffect(() => {
    reqCSVFile(stageList.One.filePath).then((res) => {
      console.log(res.split('\r\n'))
    })
  }, [])
  return (
    <div className='card-stack'>
      <Swiper effect={'cards'} grabCursor={true} className='mySwiper'>
        <SwiperSlide>
          <WordCard />
        </SwiperSlide>
        <SwiperSlide>
          <WordCard />
        </SwiperSlide>
        <SwiperSlide>
          <WordCard />
        </SwiperSlide>
        <SwiperSlide>
          <WordCard />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
