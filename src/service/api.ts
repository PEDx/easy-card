import axios, { AxiosResponse } from 'axios'

export interface IRequestWordResult {
  code: string
  msg: string
  data: IWordResult[]
}

export interface IWordResult {
  isWord: boolean
  returnPhrase: string[]
  translation: string[]
  query: string
  speakUrl: string
  errorCode: number
  l: string
  tSpeakUrl: string
  web: {
    name: string
    value: string
  }[]
  requestId: string
  dict: {
    url: string
  }
  webdict: {
    url: string
  }
  basic: {
    exam_type: string[]
    'us-phonetic': string
    'uk-phonetic': string
    'uk-speech': string
    'us-speech': string
    phonetic: string
    explains: string[]
    wfs: {
      wf: { pos: string; text: string; trans: string }
    }[]
  }
}
axios.interceptors.response.use((res) => {
  return res.data
})

export const reqDictWord = (data: string) => {
  return axios.get<{}, IRequestWordResult>(
    `https://service-3ya92fd6-1300479587.gz.apigw.tencentcs.com/release/search/${data}`,
  )
}
