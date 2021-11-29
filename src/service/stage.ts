import { getStaticUrl } from './utils'


// https://color.oulu.me/
interface IWordStage {
  name: string
  count: number
  filePath: string
  color?: string
  text?: string
  arcColor?: string
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
    name: 'Stage One',
    count: 601,
    text: 'Strike the iron while it is hot',
    filePath: getStaticUrl('../data/word_list_1.csv'),
    color: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
    arcColor: '#f093fb',
  },
  [Stage.Two]: {
    name: 'Stage Two',
    count: 986,
    text: 'It’s the easiest thing in the world for a man to deceive himself',
    filePath: getStaticUrl('../data/word_list_2.csv'),
    color: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    arcColor: '#4facfe',
  },
  [Stage.Three]: {
    name: 'Stage Three',
    count: 1484,
    text: 'Man proposes, God disposes',
    filePath: getStaticUrl('../data/word_list_3.csv'),
    color: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
    arcColor: '#a18cd1',
  },
  [Stage.Four]: {
    name: 'Stage Four',
    count: 3047,
    text: 'Strong in action, gentle in method',
    filePath: getStaticUrl('../data/word_list_4.csv'),
    color: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
    arcColor: '#0ba360',
  },
  [Stage.Five]: {
    name: 'Stage Five',
    count: 7715,
    text: 'Do your best and then let go',
    filePath: getStaticUrl('../data/word_list_5.csv'),
    color: `linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)`,
    arcColor: '#eea2a2',
  },
}
