import './style.scss'

export const ProgressArc = ({
  value = 0,
  max = 100,
  unit = '%',
  className = '',
  arcColor = '#333',
  arcBackgroundColor = '#fff',
  textColor = '#333',
  textVisible = true,
  radius = 90,
  rounded = false,
}) => {
  const p = 2 * radius * Math.PI
  return (
    <div className={[className, ' progress-arc'].join(' ')}>
      <svg viewBox='0 0 200 200'>
        <circle
          className='arc-background'
          r={radius}
          style={{
            stroke: arcBackgroundColor,
          }}
        />
        <circle
          className='arc'
          r={radius}
          strokeDashoffset={((max - value) / max) * p}
          strokeDasharray={p}
          strokeLinecap={rounded ? 'round' : 'inherit'}
          style={{
            stroke: arcColor,
          }}
        />
      </svg>
      {textVisible && (
        <div
          className='text-unit'
          style={{
            color: textColor,
          }}
        >{`${value}${unit}`}</div>
      )}
    </div>
  )
}
