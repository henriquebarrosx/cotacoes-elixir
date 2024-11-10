import "phoenix_html"
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import topbar from "../vendor/topbar"
import { ForexProsService } from './forex-props-service'
import { codigos_cotacoes } from './cotacoes'
import { Observable } from './observable'

topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

const csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content")

const liveSocketConfig = {
  longPollFallbackMs: 2500,
  params: { _csrf_token: csrfToken }
}

const liveSocket = new LiveSocket("/live", Socket, liveSocketConfig)
liveSocket.connect()

window.liveSocket = liveSocket

const forexProsService = new ForexProsService();

const event = new Observable('CONNECTION_ESTABLISHED', () => {
  codigos_cotacoes.forEach((cotacao) => forexProsService.subscribe(cotacao))
})

forexProsService.register(event);
