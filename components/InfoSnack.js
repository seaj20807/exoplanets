import { useState } from "react";
import { Snackbar } from "react-native-paper";

export default function InfoSnack(props) {
  const [visible, setVisible] = useState(props.show);

  const dismissSnackBar = () => {
    setVisible(false);
    props.setSaved(false);
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={dismissSnackBar}
      action={{
        label: "Ok",
        onPress: () => {
          dismissSnackBar();
        },
      }}
    >
      {props.text}
    </Snackbar>
  );
}
