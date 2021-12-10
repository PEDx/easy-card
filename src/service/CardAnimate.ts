export class CardAnimate {
  prex = 0
  prey = 0
  speed = 0
  lon = 0
  frondCard: HTMLElement
  backCard: HTMLElement
  prePos = 0 // 帧位移
  fingerTouch = false // 手指是否触摸屏幕
  moveDirect = 0 // 1表示正向，-1表示反向
  ani_move = false // 动画是否进行
  transNum = 0
  constructor(frondCard: HTMLElement, backCard: HTMLElement) {
    this.frondCard = frondCard
    this.backCard = backCard
    this.init()
  }
  init() {
    document.addEventListener('touchstart', this.onDocumentMouseDown.bind(this))
    document.addEventListener('touchmove', this.onDocumentMouseMove.bind(this))
    document.addEventListener('touchend', this.onDocumentMouseUp.bind(this))
  }
  onDocumentMouseDown(e: TouchEvent) {
    // 若是上次动画未结束不需要再次启动动画和重置目标位移
    if (this.ani_move && !this.fingerTouch) {
      console.log('')
    } else {
      this.lon = 0
      this.animate()
    }
    const ev = e.touches[0]
    this.prex = ev.clientX
    this.prey = ev.clientY
    this.ani_move = true //动画开启
  }
  onDocumentMouseMove(e: TouchEvent) {
    const ev = e.touches[0]
    if (this.ani_move && !this.fingerTouch) {
      // 判断是否不同向
      if ((ev.clientX - this.prex > 0 ? 1 : -1) == -this.moveDirect) {
        this.lon = 0
        this.prePos = 0
        this.moveDirect = -this.moveDirect
      }
    }
    //判断是否是移动事件
    if (Math.abs(ev.clientX - this.prex) >= 4) {
      this.fingerTouch = true

      this.speed =
        (ev.clientX - this.prex) *
        Math.max(Math.abs(ev.clientX - this.prex), 8) *
        0.005
      this.lon += this.speed

      this.prex = ev.clientX
      this.prey = ev.clientY
    }
  }
  onDocumentMouseUp() {
    //如果是点击事件 不设置移动
    if (!this.fingerTouch) return
    this.moveDirect = this.lon > 0 ? 1 : -1
    this.transNum = this.lon / 10 + this.moveDirect
    this.lon = Math.round(this.transNum) * 10
    this.fingerTouch = false
  }
  animate() {
    this.prePos += (this.lon - this.prePos) * 0.1
    if (this.prePos > 40) {
      this.lon = this.lon - 40
      this.prePos = this.prePos - 40
    } else if (this.prePos < -40) {
      this.lon = this.lon + 40
      this.prePos = this.prePos + 40
    }
    //判断是否到达了目标位置
    if (
      Math.abs(this.prePos - this.lon) < 0.01 &&
      Math.abs(this.lon) > 0.01 &&
      !this.fingerTouch
    ) {
      this.ani_move = false
      this.prePos = 0
      this.frondCard.style.setProperty(
        'transform',
        `translateX(${this.prePos}%)`,
      )
      this.backCard.style.setProperty(
        'transform',
        `translateX(${this.prePos}%)`,
      )
    } else {
      this.frondCard.style.setProperty(
        'transform',
        `translateX(${this.prePos}%)`,
      )
      this.backCard.style.setProperty(
        'transform',
        `translateX(${-this.prePos}%)`,
      )
      requestAnimationFrame(this.animate.bind(this))
    }
  }
}
