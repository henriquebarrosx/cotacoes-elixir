export class Observable {
  event
  callback

  constructor(event, callback) {
    this.event = event
    this.callback = callback
  }
}