import { ISearchResult } from '@/service/api'
import { helper } from '@/service/helper'
import { AudioPlayer } from '@/components/AudioPlayer'
import { useImperativeHandle, forwardRef, useState } from 'react'

import './style.scss'

export interface IWordCardMethod {
  showWordData: () => void
}

const handleExplain = (explain: string): [string[], string] => {
  const reg = /^(\w+. )+/gi
  if (!reg.test(explain)) return [[explain], '']
  const [_, label, txt] = explain.split(/^(\w+. )+/gi)
  const txtArr = txt.split('；').slice(0, 10)
  return [txtArr, label]
}

export const WordCard = forwardRef<IWordCardMethod, { word: string }>(
  ({ word }, ref) => {
    const [data, setData] = useState<ISearchResult | null>(null)
    const [collinsData, setCollinsData] = useState<string>('')
    const [rollingOver, setRollingOver] = useState(false)
    useImperativeHandle(
      ref,
      () => ({
        showWordData() {
          helper.getWordDataFromRemoteOrCache(word).then((wordData) => {
            setData(wordData)
          })
          helper.getCollinsWordDataFromRemoteOrCache(word).then((cdata) => {
            const div = helper.beautifyCollinsHTMLString(cdata)
            setCollinsData(div.innerHTML)
          })
        },
      }),
      [],
    )
    if (!data) return <div className='word-card flex-box-c loading'>Loading...</div>

    const { basic } = data

    return (
      <div
        className={['word-card', rollingOver ? 'rolling-over' : ''].join(' ')}
      >
        <div className='front card-wrap'>
          <div className='inner-content'>
            <div className='word'>{data.query}</div>
            <div className='audio'>
              <AudioPlayer word={word} />
            </div>
            <div className='phonetic'>
              <span>/{basic['us-phonetic']}/</span>
              <span className='tag-num'>
                {Array.from({ length: basic.exam_type.length }).map(
                  (_, idx) => (
                    <span className='star' key={idx}>
                      ★
                    </span>
                  ),
                )}
              </span>
            </div>
            <div className='explains'>
              {basic.explains.map((explain, idx) => {
                const [arr, lab] = handleExplain(explain)
                if (!lab) return arr[0] || ''
                return (
                  <div key={idx}>
                    <span className='lable'>{lab}</span>
                    {arr.map((text, idx2) => (
                      <span className='txt' key={idx2}>
                        {text.trim()}
                      </span>
                    ))}
                  </div>
                )
              })}
            </div>
            <div className='wfs'>
              {basic.wfs &&
                basic.wfs.map(({ wf }, idx) => {
                  return (
                    <div key={idx} className='wf-wrap'>
                      <span className='name'> {wf.name}:</span>
                      <span className='wf-value'>{wf.value}</span>
                    </div>
                  )
                })}
            </div>
          </div>

          <div className='bottom-btn'>
            <div
              className='collins-button card-button'
              onClick={() => setRollingOver(!rollingOver)}
            >
              Collins
            </div>
            {/* <div className='check-button card-button'>Check</div> */}
          </div>
        </div>
        <div className='back card-wrap'>
          <div
            className='collins-content inner-content'
            dangerouslySetInnerHTML={{ __html: collinsData }}
          ></div>
          <div className='bottom-btn'>
            <div
              className='collins-button card-button'
              onClick={() => setRollingOver(!rollingOver)}
            >
              Return
            </div>
          </div>
        </div>
      </div>
    )
  },
)
