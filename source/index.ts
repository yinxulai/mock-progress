export class FakeProgress {
  private timeConstant: number
  private progress: number
  private intervalId: number | null
  private intervalFrequency: number
  private autoStart: boolean

  constructor(opts?: {
    timeConstant?: number
    autoStart?: boolean
    parent?: FakeProgress
    parentStart?: number
    parentEnd?: number
  }) {
    this.timeConstant = opts?.timeConstant || 1000
    this.progress = 0
    this.intervalId = null
    this.intervalFrequency = 100
    this.autoStart = opts?.autoStart || false
    if (this.autoStart) {
      this.start()
    }
  }

  start() {
    let time = 0
    this.intervalId = setInterval(() => {
      time += this.intervalFrequency
      this.setProgress(1 - Math.exp(-1 * time / this.timeConstant))
    }, this.intervalFrequency)
  }

  private _clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  end() {
    this._clearInterval()
    this.setProgress(1)
  }

  stop() {
    this._clearInterval()
  }

  setProgress(progress: number) {
    this.progress = progress
  }
}
