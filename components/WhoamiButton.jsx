import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { ToastAndroid, Button } from "react-native";

const WhoamiButton = () => {
  const [result, setResult] = useState(null);
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("https://frozen-woodland-28452.herokuapp.com");
    setResult(result);
  };
  const toastNotification = () => {
    ToastAndroid.show(
      "Enjoy anonymously",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    )
  };
  return (
    <>
      <Button
        title="Chat"
        onPress={() => {
          toastNotification();
           _handlePressButtonAsync();
        }}
        color="hotpink"
      />
    </>
  );
};
export default WhoamiButton;
