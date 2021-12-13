import word_list_1 from '@/data/word_list_1.csv?url'
import word_list_2 from '@/data/word_list_2.csv?url'
import word_list_3 from '@/data/word_list_3.csv?url'
import word_list_4 from '@/data/word_list_4.csv?url'
import word_list_5 from '@/data/word_list_5.csv?url'

// https://color.oulu.me/
export interface IWordStage {
  name: string
  count: number
  filePath: string
  color?: string
  text?: string
  arcColor?: string
}
export enum Stage {
  One = 'One',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
}

export const patterns = [
  'checks',
  'grid',
  'dots',
  'cross-dots',
  'diagonal-lines',
  'horizontal-lines',
  'vertical-lines',
  'diagonal-stripes',
  'horizontal-stripes',
  'vertical-stripes',
  'zigzag',
]

export const getRandomPattern = () => {
  const len = patterns.length
  const randomNum = Math.floor(Math.random() * len)
  return patterns[randomNum]
}

export const stageList: { [key in Stage]: IWordStage } = {
  [Stage.One]: {
    name: '1',
    count: 601,
    text: 'Strike the iron while it is hot',
    filePath: word_list_1,
    color: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
    arcColor: '#f093fb',
  },
  [Stage.Two]: {
    name: '2',
    count: 986,
    text: 'It’s the easiest thing in the world for a man to deceive himself',
    filePath: word_list_2,
    color: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    arcColor: '#4facfe',
  },
  [Stage.Three]: {
    name: '3',
    count: 1484,
    text: 'Man proposes, God disposes',
    filePath: word_list_3,
    color: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
    arcColor: '#a18cd1',
  },
  [Stage.Four]: {
    name: '4',
    count: 3047,
    text: 'Strong in action, gentle in method',
    filePath: word_list_4,
    color: 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)',
    arcColor: '#0ba360',
  },
  [Stage.Five]: {
    name: '5',
    count: 7715,
    text: 'Do your best and then let go',
    filePath: word_list_5,
    color: `linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)`,
    arcColor: '#eea2a2',
  },
}
