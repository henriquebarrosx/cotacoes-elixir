defmodule CotacoesPhx.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      CotacoesPhxWeb.Telemetry,
      CotacoesPhx.Repo,
      {DNSCluster, query: Application.get_env(:cotacoes_phx, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: CotacoesPhx.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: CotacoesPhx.Finch},
      # Start a worker by calling: CotacoesPhx.Worker.start_link(arg)
      # {CotacoesPhx.Worker, arg},
      # Start to serve requests, typically the last entry
      CotacoesPhxWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CotacoesPhx.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CotacoesPhxWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
