import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTestcase 
{
	
		 
		  WebDriver driver;
		  public void invokeBrowser() {
		    System.setProperty("webdriver.chrome.driver", "C:\\Users\\user\\Documents\\6th Semester\\chromedriver.exe");
		      driver=new ChromeDriver();
		      driver.manage().deleteAllCookies();
		      driver.manage().window().maximize();
		    driver.get("http://localhost:3000/login/");
		  }
		  public void login() throws InterruptedException {
		    
		    Thread.sleep(3000);
		    driver.findElement(By.name("username")).sendKeys("nivedha");
		    driver.findElement(By.name("password")).sendKeys("nive2000");
		    driver.findElement(By.name("login")).click();
		    Thread.sleep(3000);
		    
		      
		        }
		  public void load() throws InterruptedException {
		    Thread.sleep(2000);
		    driver.findElement(By.name("login")).click();
		    Thread.sleep(2000);
		    
		  }
		 public void logout() throws InterruptedException {
		    Thread.sleep(3000);
		    driver.findElement(By.linkText("Logout")).click();
		    Thread.sleep(3000);
		  }
		  public void close() {
		    driver.quit();
		  }
		  public static void main(String[] args) throws InterruptedException{
		    LoginTestcase myObj=new LoginTestcase();
		    myObj.invokeBrowser();
		    myObj.login();
		    //myObj.load();
		    //myObj.logout();
		    //myObj.login();
		    myObj.close();
		  }

		}
	

