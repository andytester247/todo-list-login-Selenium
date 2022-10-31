const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const USERID = "andytester247"; // Do not change
const PASSWORD = "43214321@andy"; // Do not change
const itemsArray = [
  "test1",
  "test2",
  "test3",
  "test4",
  "test5",
  "test6",
  "test7",
  "test8",
  "test9",
  "test10",
];
let driver;
let vars;
describe("todo-list-login", function () {
  before(async () => {
    const service = new chrome.ServiceBuilder(
      "C:/Windows/seleniumTools/chromedriver.exe" // <---Need to change the path of the chromedriver.exe
    );
    driver = new Builder()
      .forBrowser("chrome")
      .setChromeService(service)
      .build();
    vars = {};
    //navigate to the target url
    await driver.get("https://todo-list-login.firebaseapp.com/"); //Do not change
  });

  after(async () => {
    // close the browser
    await driver.quit();
  });
  async function waitForWindow(timeout = 2) {
    await driver.sleep(timeout);
    const handlesThen = vars["windowHandles"];
    // console.log("handlesThen", handlesThen);
    const handlesNow = await driver.getAllWindowHandles();
    // console.log("handlesNow", handlesNow);
    if (handlesNow.length > handlesThen.length) {
      return handlesNow.find((handle) => !handlesThen.includes(handle));
    } else
      return handlesNow;
  }

  it("should able to add and remove items", async () => {
    // signup
    await driver.manage().window().setRect({ width: 976, height: 1040 });
    vars["windowHandles"] = await driver.getAllWindowHandles();
    // console.log("first-windowHandles", vars["windowHandles"]);
    await driver.findElement(By.linkText("Sign in with github")).click();
    vars["win7984"] = await waitForWindow(5000);
    // console.log("first-win7984", vars["win7984"]);
    vars["root"] = await driver.getWindowHandle();
    await driver.switchTo().window(vars["win7984"]);

    await driver.findElement(By.id("login_field")).click();
    await driver.findElement(By.id("login_field")).sendKeys(USERID);
    await driver.findElement(By.id("password")).sendKeys(PASSWORD);
    await driver.findElement(By.name("commit")).click();
    await driver.close();

    await driver.switchTo().window(vars["root"]);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    // console.log("itemsArray",itemsArray)    
    for (let index =0;index<itemsArray.length;index++){
        await driver.findElement(By.xpath("//html/body/ng-view/div/div[2]/div[1]/input")).sendKeys(itemsArray[index])
        await driver.findElement(By.xpath("//button[contains(.,\'Add List\')]")).click()
    }

    await driver
      .findElement(By.xpath("//button[contains(.,'Sign out')]"))
      .click();

    vars = {};

    // 2nd login
    await driver.manage().window().setRect({ width: 976, height: 1040 });
    vars["windowHandles"] = await driver.getAllWindowHandles();
    // console.log("sec-windowHandles", vars["windowHandles"]);
    await driver.findElement(By.linkText("Sign in with github")).click();
    vars["win7984"] = await waitForWindow(3000);
    vars["root"] = await driver.getWindowHandle();

    await driver.switchTo().window(vars["root"]);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // console.log('debug:itemArray Length::',itemsArray.length);
    // console.log('debug:itemArray::',itemsArray[5]);
    // remove last 5 item
    for (let i =5;i<itemsArray.length;i++){                
        // console.log('debug:itemArray::',itemsArray[i]);        
        await driver         
        .findElement(By.xpath(                
          "//html/body/ng-view/div/div[3]/div/ul/li[6]/div/div[2]/button"
        )).click();        
    }
    // sign out
    await driver
      .findElement(By.xpath("//button[contains(.,'Sign out')]"))
      .click();
  });
});
