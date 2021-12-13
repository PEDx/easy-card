import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCards } from 'swiper'
import { IWordCardMethod, WordCard } from '@/components/WordCard'
import { helper } from '@/service/helper'
import 'swiper/css/effect-cards'
import 'swiper/css'
import './style.scss'
import { Stage } from '@/service/stage'

SwiperCore.use([EffectCards])

export const CardStack = () => {
  let params = useParams<{ type: Stage }>()
  const [words, setWords] = useState<string[]>([])
  const [index, setIndex] = useState<number>(-1)
  const wordCardRef = useRef<(IWordCardMethod | null)[]>([])

  useEffect(() => {
    helper.getCSVDataFromRemoteOrCache(params.type || Stage.One).then((data) => {
      const arr = data.split('\r\n')
      setWords(arr.slice(0, 5))
      setIndex(0)
    })
  }, [])

  const handleSlideChange = useCallback((e) => {
    setIndex(e.activeIndex)
  }, [])

  useEffect(() => {
    const card = wordCardRef.current[index]
    if (!card) return
    card.showWordData()
  }, [index])

  return (
    <div className='card-stack'>
      <div className='home-button button flex-box-c'>
        <Link to='/home'>
          <svg viewBox='0 0 24 24' width='24' height='24'>
            <path fill='none' d='M0 0h24v24H0z' />
            <path
              fill='rgba(11,97,255,1)'
              d='M13 19h6V9.978l-7-5.444-7 5.444V19h6v-6h2v6zm8 1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20z'
            />
          </svg>
        </Link>
      </div>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        onSlideChange={handleSlideChange}
      >
        {words.map((word, idx) => (
          <SwiperSlide key={idx}>
            <WordCard
              word={word}
              ref={(ref) => (wordCardRef.current[idx] = ref)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
