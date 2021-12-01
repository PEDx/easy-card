import axios from 'axios'

const URL = 'https://service-3ya92fd6-1300479587.gz.apigw.tencentcs.com/release'

export interface IResponse<T> {
  code: string
  msg: string
  data: T
}
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

axios.interceptors.response.use<IResponse<ISearchResult>>((res) => {
  return res.data
})

export const reqDictWord = (word: string) => {
  return axios.get<{}, IResponse<ISearchResult>>(`${URL}/search/${word}`)
}

export const reqCollins = (word: string) => {
  return axios.get<{}, IResponse<string>>(`${URL}/collins/${word}`)
}

export const reqCSVFile = (url: string) => {
  return axios.get<{}, string>(`${url}`)
}
