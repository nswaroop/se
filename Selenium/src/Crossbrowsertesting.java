import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
public class Crossbrowsertesting
{
	WebDriver driver;
	
	public void setup(String browser) throws Exception
	{
		if(browser.equalsIgnoreCase("firefox"))
		{
			System.setProperty("webdriver.gecko.driver", "C:\\\\Users\\\\user\\\\Documents\\\\6th Semester\\\\geckodriver.exe");
		      driver=new FirefoxDriver();
		      login();
		}
		else if(browser.equalsIgnoreCase("chrome"))
		{
			System.setProperty("webdriver.chrome.driver", "C:\\\\Users\\\\user\\\\Documents\\\\6th Semester\\\\chromedriver.exe");
		      driver=new ChromeDriver();
		      login();
		}
		else
		{
			throw new Exception("Browser not found");
			
		}
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
	}
	
	 public void login() throws InterruptedException {
		 driver.get("http://localhost:3000/login/");
		    Thread.sleep(3000);
		    driver.findElement(By.name("username")).sendKeys("nivedha");
		    driver.findElement(By.name("password")).sendKeys("nive2000");
		    driver.findElement(By.name("login")).click();
		    Thread.sleep(3000);
		    
		      
		        }
	 public void close() {
		    driver.quit();
		  }
	 
	 public static void main(String[] args) throws Exception{
		    Crossbrowsertesting myObj = new Crossbrowsertesting();
		    
		    myObj.setup("chrome");
		    myObj.login();
		    //myObj.load();
		    myObj.close();
		    myObj.setup("firefox");
		    myObj.login();
		    myObj.close();
		  }

}
