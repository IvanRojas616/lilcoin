import * as Location from "expo-location";

//weather function and request of location
export const howIsTheWeather = async (setErrorMsg, setLocation, API_KEY) => {
    let {
        status
    } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
    }

    let location = await (await Location.getCurrentPositionAsync({})).coords;
    //console.log(location);

    if (location !== null) {
        const lat = location.latitude;
        const lon = location.longitude;
        //console.log(lat, lon, API_KEY);

        await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        ).then(async res => {
            return await res.json().then(data => {
                setLocation(data);
                setErrorMsg(null);
                //console.log(data.name);
            });
        }).catch((err) => {
            setErrorMsg(err);
            setLocation(null);
        });

    }
};