import { useEffect, useRef, useState } from 'react'

export const AudioPlayer = ({ word }: { word: string }) => {
  const [play, setPlay] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    audioRef.current?.addEventListener('pause', () => {
      setPlay(false)
    })
  }, [])
  return (
    <div
      className='audio-player button'
      onClick={() => {
        setPlay(!play)
        if (!play) {
          audioRef.current?.play()
          return
        }
        audioRef.current?.pause()
      }}
    >
      <audio
        src={`https://dict.youdao.com/dictvoice?audio=${word}&type=2`}
        ref={audioRef}
      ></audio>
      <svg viewBox='0 0 1024 1024' version='1.1' p-id='12565'>
        {play ? (
          <path
            d='M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m53.333333 256h-106.666666a53.333333 53.333333 0 0 0-53.333334 53.333334v106.666666a53.333333 53.333333 0 0 0 53.333334 53.333334h106.666666a53.333333 53.333333 0 0 0 53.333334-53.333334v-106.666666a53.333333 53.333333 0 0 0-53.333334-53.333334z'
            p-id='6632'
            fill='currentColor'
          ></path>
        ) : (
          <path
            d='M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m-50.56 234.666667c-19.2 0-34.773333 15.573333-34.773333 34.773333v182.997334a34.773333 34.773333 0 0 0 53.546666 29.248l143.808-92.394667a34.773333 34.773333 0 0 0-0.256-58.666667l-143.808-90.602666a34.773333 34.773333 0 0 0-18.538666-5.354667z'
            p-id='12713'
            fill='currentColor'
          ></path>
        )}
      </svg>
    </div>
  )
}
