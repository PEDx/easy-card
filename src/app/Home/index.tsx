import { Swiper, SwiperSlide } from 'swiper/react'
import { stageList } from '@/service/stage'
import { reqDictWord } from '@/service/api'
import { ProgressArc } from '@/components/ProgressArc'

import 'swiper/css'
import './index.scss'

reqDictWord('good').then((res) => {
  console.log(res.data)
})

export const Home = () => {
  console.log(stageList)
  return (
    <div className='word-card-app'>
      <div className='top-info'>May, 17</div>
      <div className='top-search'>
        <input type='text' />
      </div>
      <Swiper
        className='swiper-wrap'
        slidesPerView={1.25}
        spaceBetween={10}
        centeredSlides={true}
        preventClicks={false}
        preventClicksPropagation={false}
      >
        {Object.values(stageList).map((stage, idx) => (
          <SwiperSlide key={idx}>
            <div
              className='style-card button'
              key={idx}
              style={{
                backgroundImage: stage.color,
              }}
            >
              <ProgressArc
                className='progress'
                value={33}
                rounded={true}
                arcColor={stage.arcColor}
                textColor={'#fff'}
              />
              <div className='name'>{stage.name}</div>
              <div className='count'>Count:{stage.count}</div>
              <div className='text'>{stage.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='stage-cent'>
        {Array.from({ length: 20 }).map((val, idx) => (
          <div key={idx} className='stage-item'>
            {idx}
          </div>
        ))}
      </div>
    </div>
  )
}
