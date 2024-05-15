import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native";
import InfoModal from "./InfoModal";
import ErrDialog from "./ErrDialog";

export default function FavData(props) {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([1, 5, 10, 15, 20, 50, 100]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[3]
  );
  const [infoItem, setInfoItem] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, props.data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const deleteFavorite = async (planetId) => {
    const { error } = await props.sb
      .from("user_favorites")
      .delete()
      .eq("planet_id", planetId);
    if (error) {
      setErrorMessage(error.toString());
    }
    props.getFavorites(props.user.user.email);
  };

  return (
    <>
      {infoItem.length != 0 && (
        <InfoModal
          show={true}
          item={infoItem}
          setItem={setInfoItem}
          profile={true}
          user={props.user}
        />
      )}
      {errorMessage.length > 0 && (
        <ErrDialog
          show={true}
          message={errorMessage}
          setMessage={setErrorMessage}
        />
      )}
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Planet Name</DataTable.Title>
            <DataTable.Title></DataTable.Title>
          </DataTable.Header>
          {props.data.slice(from, to).map((item) => (
            <DataTable.Row
              onPress={() => setInfoItem(item)}
              key={item.planet_id}
            >
              <DataTable.Cell>{item.pl_name}</DataTable.Cell>
              <DataTable.Cell
                onPress={() => {
                  deleteFavorite(item.planet_id);
                }}
                textStyle={{ color: "red" }}
              >
                Delete
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(props.data.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${props.data.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </ScrollView>
    </>
  );
}
