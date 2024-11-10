defmodule CotacoesPhx.Repo.Migrations.CreateForexDatas do
  use Ecto.Migration

  def change do
    create table(:forex_datas) do
      add :data, :string

      timestamps(type: :utc_datetime)
    end
  end
end
