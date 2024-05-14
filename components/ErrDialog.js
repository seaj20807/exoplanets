import { useState } from "react";
import { Portal, Dialog, Text, Button } from "react-native-paper";

export default function ErrDialog(props) {
  const [errorVisible, setErrorVisible] = useState(props.show);

  const hideErrorDialog = () => {
    setErrorVisible(false);
    props.setMessage("");
  };

  return (
    <Portal>
      <Dialog visible={errorVisible} onDismiss={hideErrorDialog}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{props.message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideErrorDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
