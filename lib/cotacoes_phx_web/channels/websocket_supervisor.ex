# lib/cotacoes_phx_web/websocket_supervisor.ex
defmodule CotacoesPhxWeb.WebSocketSupervisor do
  use Supervisor

  def start_link(_arg) do
    Supervisor.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  # Definir os processos que o Supervisor vai gerenciar
  def init(:ok) do
    children = [
      # Defina o seu cliente WebSocket como um processo supervisionado
      {CotacoesPhxWeb.WebSocketClient, []}
    ]

    # Opções do Supervisor
    Supervisor.init(children, strategy: :one_for_one)
  end
end
