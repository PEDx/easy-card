import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { IWordCardMethod, WordCard } from '@/components/WordCard'
import { helper } from '@/service/helper'
import 'swiper/css/effect-cards'
import 'swiper/css'
import './style.scss'
import { Stage } from '@/service/stage'

export const CardStack = () => {
  let params = useParams<{ type: Stage }>()
  const navigate = useNavigate()
  const [words, setWords] = useState<string[]>([])
  const [index, setIndex] = useState<number>(0)
  const swiperRef = useRef<SwiperCore | null>(null)
  const dataRef = useRef<string[]>([])

  useEffect(() => {
    helper
      .getCSVDataFromRemoteOrCache(params.type || Stage.One)
      .then((data) => {
        const arr = data.split('\r\n')
        dataRef.current = arr
        setWords(arr.slice(0, 10))
      })
  }, [])

  const handleSwiper = useCallback((swiper: SwiperCore) => {
    swiperRef.current = swiper
  }, [])

  const handleSlideTransitionEnd = useCallback(
    (swiper: SwiperCore) => {
      const idx = index + swiper.activeIndex
      setIndex(idx)
    },
    [index],
  )

  useEffect(() => {
    // const card = wordCardRef.current[index]
    // if (!card) return
    console.log(`total: ${dataRef.current.length}`)
    console.log(`index: ${index}`)
    console.log(words)
  }, [words])

  const setWordCardRefs = useCallback((ref: IWordCardMethod | null) => {
    ref && ref.showWordData()
  }, [])

  return (
    <div className='card-stack'>
      <div
        className='home-button button flex-box-c'
        onClick={() => navigate(-1)}
      >
        <svg viewBox='0 0 24 24' width='24' height='24'>
          <path fill='none' d='M0 0h24v24H0z' />
          <path
            fill='rgba(11,97,255,1)'
            d='M13 19h6V9.978l-7-5.444-7 5.444V19h6v-6h2v6zm8 1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20z'
          />
        </svg>
      </div>
      <Swiper
        centeredSlides={true}
        spaceBetween={16}
        loop={true}
        onSwiper={handleSwiper}
        onTransitionEnd={handleSlideTransitionEnd}
      >
        {words.map((word, idx) => (
          <SwiperSlide key={idx}>
            <WordCard word={word} ref={setWordCardRefs} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
