import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class RoomAllocation 
{
	 WebDriver driver;
	  public void invokeBrowser() throws InterruptedException {
	    System.setProperty("webdriver.chrome.driver", "C:\\\\Users\\\\user\\\\Documents\\\\6th Semester\\\\chromedriver.exe");
	      driver=new ChromeDriver();
	      driver.manage().deleteAllCookies();
	      driver.manage().window().maximize();
	      driver.get("http://localhost:3000/admin?query=abc/");
	      Thread.sleep(2000);
	      driver.findElement(By.linkText("Room Allocation")).click();
	      
	  }
	 
	  public void RoomAllocationpass() throws InterruptedException 
	  {
		    Thread.sleep(2000);
		    
		    driver.findElement(By.name("year")).sendKeys("2");
		    driver.findElement(By.name("B")).sendKeys("cse");
		    driver.findElement(By.name("periods")).sendKeys("3-4");
		    Select select = new Select(driver.findElement(By.xpath("//select")));

		    WebElement option = select.getFirstSelectedOption();

		    String defaultItem = option.getText();

		    System.out.println(defaultItem );
		    
		    driver.findElement(By.name("date")).sendKeys("20-12-2019");
		    Thread.sleep(2000);
		    driver.findElement(By.name("proceed")).click();
		    Thread.sleep(3000);
		    System.out.println("Proceeded..Testcase1 passed");
		    Select select1 = new Select(driver.findElement(By.name("invigilator")));

		    select1.selectByIndex(1);
		    
		    Select select2 = new Select(driver.findElement(By.name("room")));

		    select2.selectByIndex(1);

		    Thread.sleep(3000);
		    driver.findElement(By.name("branch")).sendKeys("CSE-A");
		    Thread.sleep(3000);
		    driver.findElement(By.name("strength")).sendKeys("30");
		    Thread.sleep(3000);
		    
		    driver.findElement(By.name("submit")).click();
		    Thread.sleep(3000);
		    
		    System.out.println("Sucessfully Assigned");
		    
		    
		  }
	 public void logout() throws InterruptedException {
	    Thread.sleep(3000);
	    driver.findElement(By.linkText("Logout")).click();
	    Thread.sleep(3000);
	  }
	 public void RoomAllocationfail() throws InterruptedException 
	  {
		    Thread.sleep(2000);
		    
		    driver.findElement(By.name("year")).sendKeys("2");
		    driver.findElement(By.name("B")).sendKeys("CSE-A");
		    driver.findElement(By.name("periods")).sendKeys("1-2");
		    Select select = new Select(driver.findElement(By.xpath("//select")));

		    WebElement option = select.getFirstSelectedOption();
            String defaultItem = option.getText();

		    System.out.println(defaultItem );
		   
		    driver.findElement(By.name("date")).sendKeys("20-12-2019");
		    Thread.sleep(2000);
		    driver.findElement(By.name("proceed")).click();
		    Thread.sleep(3000);
		    Select select1 = new Select(driver.findElement(By.name("invigilator")));

		    select1.selectByIndex(1);
		    
		    Select select2 = new Select(driver.findElement(By.name("room")));

		    WebElement option2 = select2.getFirstSelectedOption();

		    String defaultItem2 = option2.getText();

		    System.out.println(defaultItem2 );
		    Thread.sleep(3000);
		    driver.findElement(By.name("branch")).sendKeys("CSE-B");
		    Thread.sleep(3000);
		    driver.findElement(By.name("strength")).sendKeys("30");
		    Thread.sleep(3000);
		    
		    driver.findElement(By.name("submit")).click();
		    Thread.sleep(3000);
		    
		    System.out.println("Error");
		    
		    System.out.println("Proceeded..Testcase2 failed");
		    
		    
		  }
	  public void close() {
	    driver.quit();
	  }
	  public static void main(String[] args) throws InterruptedException{
	    RoomAllocation myObj=new RoomAllocation();
	    myObj.invokeBrowser();
	    
	    //myObj.load();
	    myObj.RoomAllocationpass();
	    
	   // myObj.invokeBrowser();
	   // myObj.RoomAllocationfail();
	   // myObj.logout();
	  
	    myObj.close();
	  }

}
