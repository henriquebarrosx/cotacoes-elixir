defmodule CotacoesPhx.ForexsDataFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `CotacoesPhx.ForexsData` context.
  """

  @doc """
  Generate a forex_data.
  """
  def forex_data_fixture(attrs \\ %{}) do
    {:ok, forex_data} =
      attrs
      |> Enum.into(%{
        data: "some data"
      })
      |> CotacoesPhx.ForexsData.create_forex_data()

    forex_data
  end
end
