// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import topbar from "../vendor/topbar"

const csrfToken = document.querySelector("meta[name='csrf-token']")
  .getAttribute("content")

const liveSocket = new LiveSocket(
  "/live",
  Socket,
  {
    longPollFallbackMs: 2500,
    params: { _csrf_token: csrfToken }
  }
)

topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

// const socket = new Socket("/socket", { params: { token: window.userToken } })
// socket.connect()

// new ForexProsService();

TIME_ZONE_ID = 12;
SUBSCRIBE_EVENT_NAME = 'subscribe';

const options = {
  protocols_whitelist: ['websocket', 'xdr-streaming', 'xhr-streaming', 'iframe-eventsource', 'xdr-polling', 'xhr-polling'],
  debug: true,
  jsessionid: false,
  server_heartbeat_interval: 4000,
  heartbeatTimeout: 2000
};

const stream = 'https://streaming.forexpros.com'
const socketjs = new SockJS(stream + '/echo', null, options);
console.log('Forex Pros websocket initialized')

socketjs.onopen = () => {
  getPids().forEach((pid) => {
    const payload = {
      _event: SUBSCRIBE_EVENT_NAME,
      tzID: TIME_ZONE_ID,
      message: pid
    };

    console.log(`Subscribing Forex Pros channel - ${pid}`);
    socketjs.send(JSON.stringify(payload));
  })
};

socketjs.onclose = () => {
  console.log('Closing forex pros websocket...');
}

socketjs.onerror = (error) => {
  console.error('Forex pros websocket error: ', error);
};

socketjs.onmessage = (event) => {
  const content = JSON.parse(event.data);
  const serializedMsg = content.message.split('::');
  const serializedObj = JSON.parse(serializedMsg[1]);
  console.log({ serializedObj })
}

function getPids() {
  const eua = [
    { sigla: 'S&P 500', pid: '8839' },
    { sigla: 'Nasdaq', pid: '8874' },
    { sigla: 'Dow Jones', pid: '8873' },
    { sigla: "VIX", pid: '44336' },
  ];

  const curva_eua = [
    { sigla: 'US2Y', pid: '23701' },
    { sigla: 'US10Y', pid: '23705' },
    { sigla: 'US30Y', pid: '23706' }
  ];

  const commodities = [
    { origem: "Petróleo EUA", sigla: 'WTI Oil', pid: '8849' },
    { origem: "Ouro Futuro CME", sigla: 'Gold', pid: '8830' },
    { origem: "Cobre", sigla: "Cobre", pid: '8831' },
    { origem: "Bloomberg Commodities", sigla: "BCOM", pid: '948434' },
  ];

  const brasil = [
    { origem: "Dólar Brasil", sigla: 'USD/BRL', pid: '2103' },
    { origem: "IBOV Futuro", sigla: 'INDFUT', pid: '941612' },
    { origin: "BRL10Y", sigla: "BRL10Y", pid: '24029' },
    { origin: "CDS5YBRL", sigla: "CDS5YBRL", pid: '1116031' },
  ];

  const cryptos = [
    { origem: "Bitcoin", sigla: "USD/BTC", pid: "1057391" },
    { origem: "Ethereum", sigla: "USD/ETH", pid: "1061443" },
  ];

  const dx = [
    { origem: "Índice Dólar", sigla: 'DX', pid: '8827' },
    { origem: "Euro", sigla: 'USD/EUR', pid: '2124' },
    { origem: "Japão", sigla: 'USD/JPY', pid: '3' },
    { origem: "Inglaterra", sigla: 'USD/GBP', pid: '2126' },
    { origem: "Canadá", sigla: 'USD/CAD', pid: '7' },
    { origem: "Suecia", sigla: 'USD/SEK', pid: '41' },
    { origem: "Suiça", sigla: 'USD/CHF', pid: '4' }
  ];

  const emergentes = [
    { origem: "Brasil", sigla: 'USD/BRL', pid: '2103' },
    { origem: "México", sigla: 'USD/MXN', pid: '39' },
    { origem: "África do Sul", sigla: 'USD/ZAR', pid: '17' },
    { origem: "China", sigla: 'USD/CNY', pid: '2111' },
    { origem: "Turquia", sigla: 'USD/TRY', pid: '18' },
    { origem: "Índia", sigla: 'USD/INR', pid: '160' },
    { origem: "Rússia", sigla: 'USD/RUB', pid: '2186' },
    { origem: "Hungria", sigla: 'USD/HUF', pid: '91' },
    { origem: "Polônia", sigla: 'USD/PLN', pid: '40' },
    { origem: "Chéquia", sigla: 'USD/CZK', pid: '103' },
    { origem: "Indonésia", sigla: 'USD/IDR', pid: '2138' },
  ];

  const latam = [
    { origem: "Brasil", sigla: 'USD/BRL', pid: '2103' },
    { origem: "Argentina", sigla: "USD/ARS", pid: '2090' },
    { origem: "Chile", sigla: "USD/CLP", pid: "2110" },
    { origem: "Colombia", sigla: "USD/COP", pid: "2112" },
    { origem: "Peru", sigla: "USD/PEN", pid: "2177" },
    { origem: "Paraguai", sigla: "USD/PYG", pid: "2181" },
    { origem: "Uruguai", sigla: "USD/UYU", pid: "2210" },
    { origem: "Bolivia", sigla: 'USD/BOB', pid: '2102' },
  ];

  const europa = [
    { sigla: "Stoxx 600", pid: "40823" },
    { sigla: 'Reino Unido', pid: '27' }, // FTSE 100
    { sigla: 'Alemanha', pid: '8826' }, // DAX   
    { sigla: "Milão", pid: "177" },
    { sigla: "Madri", pid: "24228" },
    { sigla: 'França', pid: '167' } //CAC 40
  ];

  const asia = [
    { sigla: 'Hang Seng', pid: '40' },
    { sigla: 'China A50', pid: '44486' },
    { sigla: 'Shanghai', pid: '40820' },
    { sigla: 'SZSE Component', pid: '942630' },
    { sigla: 'Kospi (Sul-coreano)', pid: '37426' },
    { sigla: 'Taiex (Taiwan)', pid: '38017' },
    { sigla: 'DJ Shanghai', pid: '954522' },
    { sigla: 'China A50', pid: '28930' },
    { sigla: 'S&P/ASX 200', pid: '171' },
  ];

  const dolar = [
    { origem: "Costa Rica", sigla: "USD/CRC", pid: "2113" },
    { origem: "Republica Dominicana", sigla: "USD/DOP", pid: "2118" },
    { origem: "Honduras", sigla: "USD/HNL", pid: "2135" },
    { origem: "Haiti", sigla: "USD/HTG", pid: "2137" },
    { origem: "Jamaica", sigla: "USD/JMD", pid: "2142" },
    { origem: "Nicarágua", sigla: "USD/NIO", pid: "2172" },
    { origem: "El Salvador", sigla: "USD/SVC", pid: "2199" },
    { origem: "Dinamarca", sigla: "USD/DKK", pid: "43" },
    { origem: "Noruega", sigla: "USD/NOK", pid: "59" },
    { origem: "Egito", sigla: "USD/EGP", pid: "2122" },
    { origem: "Nigéria", sigla: "USD/NGN", pid: "2171" },
    { origem: "Hong Kong", sigla: "USD/HKD", pid: "155" },
    { origem: "Israel", sigla: "USD/ILS", pid: "63" },
    { origem: "Coreia do Sul", sigla: "USD/KRW", pid: "650" },
    { origem: "Filipinas", sigla: "USD/PHP", pid: "2179" },
    { origem: "Cingapura", sigla: "USD/SGD", pid: "42" },
    { origem: "Tailândia", sigla: "USD/THB", pid: "147" },
    { origem: "Taiwan", sigla: "USD/TWD", pid: "2206" },
    { origem: "Austrália", sigla: "USD/AUD", pid: "2091" },
    { origem: "Nova Zelândia", sigla: "USD/NZD", pid: "2174" },
    { origem: "Cuba", sigla: "USD/CUP", pid: "2114" },
    { origem: "Panamá", sigla: "USD/PAB", pid: "2176" },
    { origem: "Malásia", sigla: "USD/MYR", pid: "2168" },
  ]

  const cotacoesConcatenadas = eua.concat(dolar, dx, emergentes, europa, asia, cryptos, latam, brasil, commodities, curva_eua);
  return cotacoesConcatenadas.map(cotacao => `pid-${cotacao.pid}:`);
}