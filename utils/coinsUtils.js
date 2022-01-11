export const retrieveCoins = async (setCoins) => {
    let coins = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    coins = await coins.json();
    setCoins(coins);
    //console.log(coins);
};