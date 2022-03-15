const axios = require("axios");
const path = require("path");
const fs = require("fs");

const scrap = async() => {
    let { data } = await axios.get(`https://www.google.com/search?q=face&tbm=isch&sxsrf=APq-WBvL-7qxZ1HwYIbzQ9cNiHoThln-kA%3A1647254219999&source=hp&biw=1536&bih=714&ei=yxovYsKVO7KOlwSkpb9o&iflsig=AHkkrS4AAAAAYi8o2593LwfTCGIuIaX45m-rfNZf2-ij&ved=0ahUKEwiCp4uVtMX2AhUyx4UKHaTSDw0Q4dUDCAc&uact=5&oq=face&gs_lcp=CgNpbWcQAzIHCCMQ7wMQJzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABDIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzoKCCMQ7wMQ6gIQJzoLCAAQgAQQsQMQgwFQggRYjwdgnwhoAXAAeACAAasBiAH4A5IBAzAuM5gBAKABAaoBC2d3cy13aXotaW1nsAEK&sclient=img`)
    console.log(data.length)
    while(data.indexOf("<img class=\"yWs4tf\" alt=\"\"")!==-1){
        let start = data.indexOf("<img class=\"yWs4tf\" alt=\"\"") + "<img class=\"yWs4tf\" alt=\"\" src=\"".length;
        data = data.slice(start);
        let end = data.indexOf(">")-2
        console.log(data.slice(0,end))
        data = data.slice(end+1);
    }
}

scrap()