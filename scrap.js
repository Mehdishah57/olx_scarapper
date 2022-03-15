const fs = require('fs');
const path = require('path');
const axios = require('axios');

const OLX_SCRAPPER = async(page)=>{
    const { data } = await axios.get(`https://www.olx.com.pk/cats_c138?page=${page}`)
    const EXTRACTED_DATA = []
    let ads = data.slice(data.indexOf("<ul class=\"ba608fb8 de8df3a3\">"),data.indexOf("</ul>"))
    ads = ads.split("<li");
    ads.map(item => {
        let img = item.slice(item.indexOf("<img role=\"presentation\""));
        img = img.slice(0,img.indexOf(">"));
        let imageLink = img.slice(img.indexOf("src=\"")+5);
        imageLink = imageLink.slice(0,imageLink.indexOf("\""));
        EXTRACTED_DATA.push({ imageLink })
    })
    return EXTRACTED_DATA;
}

let data = []
async function main() {
    let counter = 1;
    let lastPage = 0
    for (let i = 0; i < 49; i++) {
        lastPage = i
        let temp = await OLX_SCRAPPER(i);
        temp = temp.filter(item => item.imageLink !== '')
        data = [...data, ...temp]
        for (let j = 0; j < temp.length; j++) {
            let errorFlag = false;
            const { imageLink } = temp[j];
            if (!imageLink) continue;
            const response = await axios({
                url: imageLink,
                method: 'get',
                responseType: 'stream'
            }).catch(err => errorFlag=true)
            if(errorFlag) continue;
            let paths = path.resolve(__dirname, 'cats', `${counter}.jpg`);
            const writer = fs.createWriteStream(paths)
            response.data.pipe(writer)
            counter++;
        }
    }
    fs.appendFileSync("catLinks.json", JSON.stringify(data));
    console.log(data);
    console.log(data.length)
}

main()
