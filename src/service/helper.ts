import { ISearchResult, reqCSVFile, reqDictWord } from './api'
import { Stage, stageList } from './stage'

class Storage {
  _storage: globalThis.Storage
  constructor() {
    this._storage = window.localStorage
  }
  set<T>(key: string, data: T) {
    this._storage.setItem(key, JSON.stringify(data))
  }
  get<T>(key: string): T {
    const str = this._storage.getItem(key) || '""'
    return JSON.parse(str) as T
  }
}

export class Helper extends Storage {
  constructor() {
    super()
    console.log('helper')
  }
  getCSVDataFromRemoteOrCache(stage: Stage) {
    const data = this.get<string>(stage)
    if (data) {
      return Promise.resolve(data)
    }
    return new Promise<string>((resolve, reject) => {
      reqCSVFile(stageList[stage].filePath)
        .then((res) => {
          this.set(stage, res)
          resolve(res)
        })
        .catch(reject)
    })
  }
  getWordDataFromRemoteOrCache(word: string) {
    const data = this.get<ISearchResult>(`$W_${word}`)
    if (data) {
      return Promise.resolve(data)
    }
    return new Promise<ISearchResult>((resolve, reject) => {
      reqDictWord(word)
        .then((res) => {
          this.set(`$W_${word}`, res.data)
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}


export const helper = new Helper()