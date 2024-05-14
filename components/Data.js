import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native";
import ErrDialog from "./ErrDialog";
import InfoModal from "./InfoModal";
import InfoSnack from "./InfoSnack";

export default function Data(props) {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([1, 5, 10, 20, 50, 100]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[2]
  );
  const [infoItem, setInfoItem] = useState([]);
  const [favoriteSaved, setFavoriteSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, props.data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const saveFavorite = async (planet) => {
    const { data, error } = await props.sb
      .from("user_favorites")
      .insert([
        {
          user_id: props.user.user.id,
          planet_id: planet.pl_id,
          pl_name: planet.pl_name,
          hostname: planet.hostname,
          disc_year: planet.disc_year,
          pl_orbper: planet.pl_orbper,
          pl_orbsmax: planet.pl_orbsmax,
          pl_rade: planet.pl_rade,
          pl_masse: planet.pl_masse,
          sy_dist: planet.sy_dist,
          user_email: props.user.user.email,
        },
      ])
      .select();
    if (error) {
      setErrorMessage("You have already saved this planet as a favorite!");
    } else {
      setFavoriteSaved(true);
    }
  };

  return (
    <>
      {infoItem.length != 0 && (
        <InfoModal
          show={true}
          item={infoItem}
          setItem={setInfoItem}
          saveFavorite={saveFavorite}
          profile={false}
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
            {props.options.map((option, index) => {
              if (option[0]) {
                return (
                  <DataTable.Title
                    onPress={() => props.sort(option[2], option[3])}
                    key={index}
                  >
                    {option[1]}
                  </DataTable.Title>
                );
              } else {
                return null;
              }
            })}
          </DataTable.Header>
          {props.data.slice(from, to).map((item) => (
            <DataTable.Row onPress={() => setInfoItem(item)} key={item.pl_id}>
              {props.options.map((option, index) => {
                if (option[0]) {
                  return (
                    <DataTable.Cell key={index}>
                      {item[option[2]]}
                    </DataTable.Cell>
                  );
                } else {
                  return null;
                }
              })}
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
      {favoriteSaved && (
        <InfoSnack
          show={true}
          text="Favorite saved succesfully!"
          setSaved={setFavoriteSaved}
        />
      )}
    </>
  );
}
