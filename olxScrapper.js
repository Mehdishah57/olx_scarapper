const axios = require("axios");

const OLX_SCRAPPER = async(page, url, cookie)=>{
    const { data } = await axios.get(url||`https://www.olx.com.pk/cars_c84?page=${page}`);
    const EXTRACTED_DATA = []
    let ads = data.slice(data.indexOf("<ul class=\"ba608fb8 de8df3a3\">"),data.indexOf("</ul>"))
    ads = ads.split("<li");
    ads.map(item => {
        let img = item.slice(item.indexOf("<img role=\"presentation\""));
        img = img.slice(0,img.indexOf(">"));
        let imageLink = img.slice(img.indexOf("src=\"")+5);
        imageLink = imageLink.slice(0,imageLink.indexOf("\""));
        let title = item.slice(item.indexOf("aria-label=\"Title\"")+18)
        title = title.slice(1,title.indexOf("</div>"));
        let price = item.slice(item.indexOf("aria-label=\"Price\"")+18)
        price = price.trim().slice(price.indexOf("<span")+5);
        price = price.slice(1,price.indexOf("</span>"))
        let location = item.slice(item.indexOf("aria-label=\"Location\"")+22);
        location = location.slice(0,location.indexOf("<span"))
        let mainLink = item.slice(item.indexOf(`/item`));
        mainLink = "https://www.olx.com.pk" + mainLink.slice(0, mainLink.indexOf("\""));             
        EXTRACTED_DATA.push({ imageLink, title, price, location, mainLink })
    })
    
    for(let  i=0; i < EXTRACTED_DATA.length; i++){
        const { mainLink } = EXTRACTED_DATA[i];
        if(mainLink.length < 25) continue;
        // const contactInfoUrl = `https://www.olx.com.pk/api/listing/${iid-of-ad}/contactInfo/`
        const contactInfoUrl = `https://www.olx.com.pk/api/listing/${mainLink.slice(mainLink.indexOf("iid-")+4)}/contactInfo/`
        const contactResponse = await axios.get(contactInfoUrl,{headers:{cookie}})
        EXTRACTED_DATA[i].contact = {name: contactResponse?.data?.name, mobile: contactResponse?.data?.mobile };
    }
    return EXTRACTED_DATA;
}

module.exports = OLX_SCRAPPER;