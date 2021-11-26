import { getStaticUrl } from './utils'

interface IWordStage {
  name: string
  count: number
  filePath: string
  color?: string
}
enum Stage {
  One = 'One',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
}
export const stageList: { [key in Stage]: IWordStage } = {
  [Stage.One]: {
    name: '阶段一',
    count: 601,
    filePath: getStaticUrl('../data/word_list_1.csv'),
    color: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
  },
  [Stage.Two]: {
    name: '阶段二',
    count: 986,
    filePath: getStaticUrl('../data/word_list_2.csv'),
    color: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  },
  [Stage.Three]: {
    name: '阶段三',
    count: 1484,
    filePath: getStaticUrl('../data/word_list_3.csv'),
    color: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  },
  [Stage.Four]: {
    name: '阶段四',
    count: 3047,
    filePath: getStaticUrl('../data/word_list_4.csv'),
    color: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
  },
  [Stage.Five]: {
    name: '阶段五',
    count: 7715,
    filePath: getStaticUrl('../data/word_list_5.csv'),
    color: `linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)`,
  },
}
