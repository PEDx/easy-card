import { stageList } from '@/service/stage'
import { reqDictWord } from '@/service/api'
import './index.scss'

export const Home = () => {
  console.log(stageList)
  reqDictWord('good').then((res) => {
    console.log(res)
  })
  return (
    <div className='word-card-app'>
      {Object.values(stageList).map((stage, idx) => (
        <div
          className='style-card flex-box-c'
          key={idx}
          style={{
            backgroundImage: stage.color,
          }}
        >
          <div className='name'>{stage.name}</div>
        </div>
      ))}
    </div>
  )
}
