import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { ToastAndroid, Button } from "react-native";

const WhoamiButton = () => {
  const [result, setResult] = useState(null);
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("https://expo.dev");
    setResult(result);
  };
  return (
    <>
      <Button
        title="Chat"
        onPress={() => _handlePressButtonAsync()}
        color="hotpink"
      />
      {result === "opened" ? (
        ToastAndroid.show(
          "Enjoy anonymously",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      ) : (
        <></>
      )}
    </>
  );
};
export default whoamiButton;
