import axios from 'axios'

const URL =
  'https://service-3ya92fd6-1300479587.gz.apigw.tencentcs.com/release/search'

export interface IRequestWordResult {
  code: string
  msg: string
  data: ISearchResult
}

export interface ISearchResult {
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
    wfs?: {
      wf: { name: string; value: string }
    }[]
  }
}

axios.interceptors.response.use<IRequestWordResult>((res) => {
  return res.data
})

export const reqDictWord = (data: string) => {
  return axios.get<{}, IRequestWordResult>(`${URL}/${data}`)
}

export const reqCSVFile = (url: string) => {
  return axios.get<{}, string>(`${url}`)
}
