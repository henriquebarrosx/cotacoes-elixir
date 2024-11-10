import { Observer } from "./observer";

export class ForexProsService extends Observer {
  socket;
  TIME_ZONE_ID = 12;
  SUBSCRIBE_EVENT_NAME = 'subscribe';

  constructor() {
    super();

    const options = {
      protocols_whitelist: ['websocket', 'xdr-streaming', 'xhr-streaming', 'iframe-eventsource', 'xdr-polling', 'xhr-polling'],
      debug: true,
      jsessionid: false,
      server_heartbeat_interval: 4000,
      heartbeatTimeout: 2000
    };

    const stream = 'https://streaming.forexpros.com'
    this.socket = new SockJS(stream + '/echo', null, options);
    console.log('Forex Pros websocket initialized')

    this.socket.onopen = () => {
      this.notify('CONNECTION_ESTABLISHED')
    };

    this.socket.onclose = () => {
      console.log('Closing forex pros websocket...');
    }

    this.socket.onerror = (error) => {
      console.error('Forex pros websocket error: ', error);
    };
  }

  subscribe(pid) {
    console.log(`Subscribing Forex Pros channel - ${pid}`);

    const payload = {
      _event: this.SUBSCRIBE_EVENT_NAME,
      tzID: this.TIME_ZONE_ID,
      message: pid
    };

    this.socket.send(JSON.stringify(payload));

    this.socket.onmessage = (event) => {
      const content = JSON.parse(event.data);
      const serializedMsg = content.message.split('::');
      const serializedObj = JSON.parse(serializedMsg[1]);
      console.log({ message: serializedObj });
    }
  }
}