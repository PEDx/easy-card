import axios from 'axios'
import sha256 from 'sha256'
import { uuid } from './utils'

// https://dict.youdao.com/jsonapi?q=性
// http://dict.youdao.com/suggest?q=love&num=1&doctype=json
// http://fanyi.youdao.com/openapi.do?keyfrom=<keyfrom>&key=<key>&type=data&doctype=<doctype>&version=1.1&q=要翻译的文本
// http://fanyi.youdao.com/openapi.do?keyfrom=<keyfrom>&key=<key>&type=data&doctype=json&version=1.1&q=good
// https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&nums=10&is_need_mean=1&word=h
// https://openapi.youdao.com/v2/dict

export interface IRequestWordParams {
  langType: string
  appKey: string
  signType: string
  docType: string
  q: string
  salt: string
  sign: string
  curtime: number
}
export interface IRequestWordResult {
  errorCode: string
  requestId: string
  msg: string
  result: IWordResult[]
}

export interface IWordResult {
  ec: IEC
}

export interface IEC {
  isWord: boolean
  lang: string
  webDict: string
  returnPhrase: string
  web: { phrase: string; meanings: string[] }[]
  synonyms: {
    pos: string
    words: string
    trans: string
  }[]
  basic: {
    usPhonetic: string
    usSpeech: string
    phonetic: string
    ukSpeech: string
    ukPhonetic: string
    examType: string
    wordFormats: {
      name: string
      value: string
    }[]
    explains: {
      pos: string
      text: string
      trans: string
    }[]
    phrases: {
      phrase: string
      meanings: string
    }[]
    sentenceSample: {
      sentence: string
      sentenceBold: string
      translation: string
    }[]
  }
}
// sign=sha256(应用ID+input+salt+curtime+应用密钥)；
// 其中，input的计算方式为：input=q前10个字符 + q长度 + q后10个字符（当q长度大于20）或 input=q字符串（当q长度小于等于20）；
const appKey = '71b2bcaf5c027a9a'
const secret = 'pwcid2qSjYzwya0v4hrJlUQvROGqIjd6'
const computeInput = (str: string) => {
  const len = str.length
  if (len < 20) return str
  return `${str.slice(0, 10)}${len}${str.slice(-10)}`
}
export const reqDictWord = (data: string) => {
  const curtime = Date.now()
  const salt = uuid()
  const input = computeInput(data)
  const sign = sha256(`${appKey}${input}${salt}${curtime}${secret}`)
  const params = {
    langType: 'en',
    signType: 'v3',
    docType: 'json',
    q: data,
    curtime,
    salt,
    appKey,
    sign,
  }
  return axios.post<IRequestWordParams, IRequestWordResult>(
    'https://openapi.youdao.com/v2/dict',
    params,
  )
}
