import { IResponse, reqCollins, reqCSVFile, reqDictWord } from './api'
import { Stage, stageList } from './stage'
import { Storage } from './Storage'

export class Helper extends Storage {
  constructor() {
    super()
    console.log('helper')
  }
  getCSVDataFromRemoteOrCache(stage: Stage) {
    return this.cacheRequestFactory(
      `csv_${stage}`,
      reqCSVFile,
      stageList[stage].filePath,
    )
  }
  getWordDataFromRemoteOrCache(word: string) {
    return this.cacheRequestFactory(`word_${word}`, reqDictWord, word)
  }
  getCollinsWordDataFromRemoteOrCache(word: string) {
    return this.cacheRequestFactory(`collins_${word}`, reqCollins, word)
  }
  private cacheRequestFactory<T, K>(
    key: string,
    fn: (params: K) => Promise<IResponse<T> | T>,
    params: K,
  ) {
    const data = this.get<T>(key)
    if (data) {
      return Promise.resolve(data)
    }
    return new Promise<T>((resolve, reject) => {
      fn(params)
        .then((res) => {
          let _data = (res as IResponse<T>).data
            ? (res as IResponse<T>).data
            : (res as T)
          this.set(key, _data)
          resolve(_data)
        })
        .catch(reject)
    })
  }
  beautifyCollinsHTMLString(data: string) {
    const fragment = document.createDocumentFragment()
    const div = document.createElement('DIV')
    div.innerHTML = data
    fragment.appendChild(div)
    const list = fragment.querySelectorAll('.col2')
    div.innerHTML = ''
    Array.from(list)
      .forEach((item) => {
        div.appendChild(item)
      })
    return div
  }
}

export const helper = new Helper()
