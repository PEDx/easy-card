import { ISearchResult } from '@/service/api'
import { helper } from '@/service/helper'
import { useImperativeHandle, forwardRef, useState } from 'react'

import './style.scss'

export interface IWordCardMethod {
  showWordData: () => void
}

export const WordCard = forwardRef<IWordCardMethod, { word: string }>(
  ({ word }, ref) => {
    const [data, setData] = useState<ISearchResult | null>(null)
    useImperativeHandle(
      ref,
      () => ({
        showWordData() {
          helper.getWordDataFromRemoteOrCache(word).then((wordData) => {
            setData(wordData)
          })
        },
      }),
      [],
    )
    if (!data) return <div className='word-card flex-box-c'>Loading...</div>

    const { basic } = data

    return (
      <div className='word-card'>
        <div className='word'>{data.query}</div>
        <div className='phonetic'>
          <span>/{basic['us-phonetic']}/</span>
          <span>/{basic['uk-phonetic']}/</span>
        </div>

        <div className='explains'>
          {basic.explains.map((explain, idx) => {
            const reg = /^(\w+. )+/gi
            if (!reg.test(explain)) return explain
            const [_, lb, txt] = explain.split(/^(\w+. )+/gi)
            return (
              <div key={idx}>
                <span className='lable'>{lb}</span>
                {txt}
              </div>
            )
          })}
        </div>
        <div className='wfs'>
          {basic.wfs &&
            basic.wfs.map(({ wf }, idx) => {
              return (
                <div key={idx}>
                  {wf.name}: <span className="wf-value">{wf.value}</span>
                </div>
              )
            })}
        </div>
      </div>
    )
  },
)
