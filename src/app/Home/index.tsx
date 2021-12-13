import { Link } from 'react-router-dom'
import { stageList, getRandomPattern } from '@/service/stage'
import { reqDictWord } from '@/service/api'

import './index.scss'

reqDictWord('good').then((res) => {
  console.log(res.data)
})

export const Home = () => {
  console.log(stageList)
  return (
    <div className='word-card-app'>
      {Object.values(stageList).map((stage, idx) => (
        <Link to={`/card/${Object.keys(stageList)[idx]}`} key={idx}>
          <div className='style-card button'>
            <div className='name'>{stage.name}</div>
            <div className='count'>{stage.count}</div>
            <div className='text'>{stage.text}</div>
            <div
              className={`pattern-box pattern-${getRandomPattern()}-sm`}
            ></div>
          </div>
        </Link>
      ))}
    </div>
  )
}
