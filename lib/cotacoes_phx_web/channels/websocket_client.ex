defmodule CotacoesPhxWeb.WebSocketClient do
  use WebSockex

  @url "wss://ws-feed.pro.coinbase.com"

  def start_link(_opts) do
    WebSockex.start_link(@url, __MODULE__, :no_state)
  end

  def handle_connect(_conn, state) do
    IO.puts("Conectado ao CoinBase")
    {:ok, state}
  end

  def subscribtion_frame(products) do
    subscription_msg =
      %{
        type: "subscribe",
        product_ids: products,
        channels: ["matches"]
      }
      |> Jason.encode!()

    {:text, subscription_msg}
  end

  # defp subscribe_to_channels(state) do
  #   IO.puts("Inscrevendo channels...")

  #   pids = [
  #     %{origem: "Bitcoin", sigla: "USD/BTC", pid: "1057391"},
  #     %{origem: "Ethereum", sigla: "USD/ETH", pid: "1061443"}
  #   ]

  #   Enum.each(pids, fn pid ->
  #     subscribe_message = %{"action" => "subscribe", "pid" => pid}
  #     send_message(state[:pid], subscribe_message)
  #   end)
  # end
end
