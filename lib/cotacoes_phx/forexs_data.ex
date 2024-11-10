defmodule CotacoesPhx.ForexsData do
  @moduledoc """
  The ForexsData context.
  """

  import Ecto.Query, warn: false
  alias CotacoesPhx.Repo

  alias CotacoesPhx.ForexsData.ForexData

  @doc """
  Returns the list of forex_datas.

  ## Examples

      iex> list_forex_datas()
      [%ForexData{}, ...]

  """
  def list_forex_datas do
    Repo.all(ForexData)
  end

  @doc """
  Gets a single forex_data.

  Raises `Ecto.NoResultsError` if the Forex data does not exist.

  ## Examples

      iex> get_forex_data!(123)
      %ForexData{}

      iex> get_forex_data!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forex_data!(id), do: Repo.get!(ForexData, id)

  @doc """
  Creates a forex_data.

  ## Examples

      iex> create_forex_data(%{field: value})
      {:ok, %ForexData{}}

      iex> create_forex_data(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_forex_data(attrs \\ %{}) do
    %ForexData{}
    |> ForexData.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forex_data.

  ## Examples

      iex> update_forex_data(forex_data, %{field: new_value})
      {:ok, %ForexData{}}

      iex> update_forex_data(forex_data, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_forex_data(%ForexData{} = forex_data, attrs) do
    forex_data
    |> ForexData.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a forex_data.

  ## Examples

      iex> delete_forex_data(forex_data)
      {:ok, %ForexData{}}

      iex> delete_forex_data(forex_data)
      {:error, %Ecto.Changeset{}}

  """
  def delete_forex_data(%ForexData{} = forex_data) do
    Repo.delete(forex_data)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forex_data changes.

  ## Examples

      iex> change_forex_data(forex_data)
      %Ecto.Changeset{data: %ForexData{}}

  """
  def change_forex_data(%ForexData{} = forex_data, attrs \\ %{}) do
    ForexData.changeset(forex_data, attrs)
  end
end
