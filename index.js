const OLX_SCRAPPER = require("./olxScrapper");
const fs = require('fs');

/* OLX_SCRAPPER takes three Inputs */

/* First argument is Page Number
    - Data is extracted for each page seperately
    - Therefore function is called in loop for 2 pages 0 & 1
    - You can change pages to desired number i:e 20, 40 or more
    - Each page has around 20 Ads
*/

/* Second argument is link 
    - By default Scrapper fetches data for Cars
    - You can go to olx and click on any category
    - Then copy the link and give it as second argument to scrapper
        - OLX_SCRAPPER(i, "https://www.olx.com.pk/mobile-phones_c1453")
        - This will fetch mobile data
*/

/* Third Argument is your Cookies
    - You'll notice that phone-numbers in data are null
    - If you want to fetch phone numbers, its going to be a bit painful ;)
    - Login to your olx application on browser
    - Go to details of any ad you like
    - Right click and click inspect
    - Your see a panel open with some tabs like Elements, Console etc
    - Click on Network Tab
    - Can't see it? click ">>" and select network tab
    - Now wait for 5 seconds and click button right next to red circle
    - Now from ad detail page, click show number to see number of owner
    - As soon as you click, you'll notice two files pop-up in network tab
    - Click "contactInfo/" file and you'll see some details right next to it
    - There will be three sections
        - General
        - Response Headers
        - Request Headers
    - See the request headers section and copy the propert "Cookie"
    - Paste this in a string as third argument to OLX_SCRAPPER(page, link, "cookies go here")
    - Enjoy all the list of phone numbers
*/

let data = []
async function main() {
    let lastPage = 0
    for (let i = 0; i < 1; i++) {
        lastPage = i
        let temp = await OLX_SCRAPPER(i,"https://www.olx.com.pk/mobile-phones_c1453");
        temp = temp.filter(item => item.imageLink !== '')
        data = [...data, ...temp]
    }
    fs.appendFileSync("olxMobilesData.json", JSON.stringify(data));
    console.log(data);
    console.log(data.length)
}

main()
