defmodule CotacoesPhx.ForexsDataTest do
  use CotacoesPhx.DataCase

  alias CotacoesPhx.ForexsData

  describe "forex_datas" do
    alias CotacoesPhx.ForexsData.ForexData

    import CotacoesPhx.ForexsDataFixtures

    @invalid_attrs %{data: nil}

    test "list_forex_datas/0 returns all forex_datas" do
      forex_data = forex_data_fixture()
      assert ForexsData.list_forex_datas() == [forex_data]
    end

    test "get_forex_data!/1 returns the forex_data with given id" do
      forex_data = forex_data_fixture()
      assert ForexsData.get_forex_data!(forex_data.id) == forex_data
    end

    test "create_forex_data/1 with valid data creates a forex_data" do
      valid_attrs = %{data: "some data"}

      assert {:ok, %ForexData{} = forex_data} = ForexsData.create_forex_data(valid_attrs)
      assert forex_data.data == "some data"
    end

    test "create_forex_data/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = ForexsData.create_forex_data(@invalid_attrs)
    end

    test "update_forex_data/2 with valid data updates the forex_data" do
      forex_data = forex_data_fixture()
      update_attrs = %{data: "some updated data"}

      assert {:ok, %ForexData{} = forex_data} = ForexsData.update_forex_data(forex_data, update_attrs)
      assert forex_data.data == "some updated data"
    end

    test "update_forex_data/2 with invalid data returns error changeset" do
      forex_data = forex_data_fixture()
      assert {:error, %Ecto.Changeset{}} = ForexsData.update_forex_data(forex_data, @invalid_attrs)
      assert forex_data == ForexsData.get_forex_data!(forex_data.id)
    end

    test "delete_forex_data/1 deletes the forex_data" do
      forex_data = forex_data_fixture()
      assert {:ok, %ForexData{}} = ForexsData.delete_forex_data(forex_data)
      assert_raise Ecto.NoResultsError, fn -> ForexsData.get_forex_data!(forex_data.id) end
    end

    test "change_forex_data/1 returns a forex_data changeset" do
      forex_data = forex_data_fixture()
      assert %Ecto.Changeset{} = ForexsData.change_forex_data(forex_data)
    end
  end
end
