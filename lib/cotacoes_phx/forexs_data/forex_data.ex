defmodule CotacoesPhx.ForexsData.ForexData do
  use Ecto.Schema
  import Ecto.Changeset

  schema "forex_datas" do
    field :data, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(forex_data, attrs) do
    forex_data
    |> cast(attrs, [:data])
    |> validate_required([:data])
  end
end
