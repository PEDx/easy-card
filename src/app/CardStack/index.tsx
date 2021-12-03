import { useCallback, useEffect, useRef, useState } from 'react'
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
  const [words, setWords] = useState<string[]>([])
  const [index, setIndex] = useState<number>(-1)
  const wordCardRef = useRef<(IWordCardMethod | null)[]>([])
  useEffect(() => {
    helper.getCSVDataFromRemoteOrCache(Stage.One).then((data) => {
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
      <Swiper
        effect={'cards'}
        grabCursor={true}
        loop={true}
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
