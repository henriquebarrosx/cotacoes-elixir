defmodule CotacoesPhx.Repo do
  use Ecto.Repo,
    otp_app: :cotacoes_phx,
    adapter: Ecto.Adapters.Postgres
end
