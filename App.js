import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StatusBar,
  Image
} from "react-native";
import CoinCard from "./components/CoinCard";
import * as Network from "expo-network";
import * as Device from "expo-device";
import { AntDesign } from "@expo/vector-icons";
import { retrieveCoins } from "./utils/coinsUtils";
import { howIsTheWeather } from "./utils/weatherUtils";
import { API_KEY } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";
import { appStyles } from "./styles/appStyles";
import WhoamiButton from "./components/WhoamiButton";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [ip, setIp] = useState("");
  //states for location service
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [errorMsgWeather, setErrorWeather] = useState(null);

  //fetching the apis
  useEffect(() => {
    retrieveCoins(setCoins);
    const getIp = async () => {
      const ip = await Network.getIpAddressAsync();
      setIp(ip);
    };
    getIp();
    //use the api of the weather for set the state
    howIsTheWeather(setErrorWeather, setWeatherInfo, API_KEY);
  }, []);
  return (
    <View style={appStyles.container}>
      <StatusBar backgroundColor="#7C47E6" />
      <View style={appStyles.headerApp}>
        <Text style={appStyles.headerAppText}>lil coin</Text>
        <TextInput
          style={appStyles.search}
          autoFocus
          autoCorrect
          placeholder="Search a coin"
          placeholderTextColor="#858585"
          onChangeText={(text) => setSearch(text.toLowerCase())}
        />
      </View>
      <AntDesign name="android1" size={24} color="green" />
      <Text
        style={appStyles.textsub}
      >{`Hi ${Device.deviceName}, you have a ${Device.brand} with ${Device.osName} v${Device.osVersion}`}</Text>
      <Text style={{ color: "#7C47E6" }}>{`Your ip address is ${ip}`}</Text>
      <View style={{ flexDirection: "row"}}>
        {weatherInfo === null ? (
          <>
            <FontAwesome5 name="sad-cry" size={24} color="purple" />
            <Text style={appStyles.textsub}>Not location permission</Text>
          </>
        ) : (
          <>
            <Image
              style={{
                height: 30,
                width: 30,
                marginHorizontal: 10,
              }}
              source={{
                uri: `https://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`,
              }}
            />
            <Text
              style={appStyles.textsub}
            >{`${weatherInfo.name}  ${weatherInfo.main.temp}°`}</Text>
          </>
        )}
      </View>
      <WhoamiButton/>
      <FlatList
        style={appStyles.listCoins}
        refreshing={refreshList}
        onRefresh={async () => {
          setRefreshList(true);
          await retrieveCoins(setCoins);
          setRefreshList(false);
        }}
        showsVerticalScrollIndicator={false}
        data={coins.filter((coin) => {
          if (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
          ) {
            return coin;
          }
        })}
        renderItem={({ item }) => {
          return (
            <CoinCard
              name={item.name}
              urlImage={item.image}
              price={item.current_price}
              symbol={item.symbol}
              behavior={item.price_change_percentage_24h}
            />
          );
        }}
      />
    </View>
  );
};

export default App;
