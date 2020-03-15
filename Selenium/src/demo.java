import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
public class demo
{
	public static void main(String args[])
	{
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\user\\Documents\\6th Semester\\chromedriver.exe");
		WebDriver driver=new ChromeDriver();
		driver.get("http://localhost:3000/login/");
		driver.manage().window().maximize();
		driver.findElement(By.name("username")).sendKeys("nivedha");
		driver.findElement(By.name("password")).sendKeys("nive2000");
		driver.findElement(By.name("login")).click();
		String expectedUrl= driver.getCurrentUrl();
		System.out.println(expectedUrl);
		String actualUrl="http://localhost:3000/login/";
		Assert.assertEquals(actualUrl, expectedUrl);
		String at=driver.getTitle();
		System.out.println(at);
		String et="React App";
		driver.close();
		if(actualUrl.equalsIgnoreCase(expectedUrl))
		{
			System.out.println("Test Successful for Testcase1");
			
		}
		else {
			System.out.println("Test failed for Testcase1");
		
		}
		/*WebDriver driver1=new ChromeDriver();
		driver1.get("http://localhost:3000/login/");
		driver1.manage().window().maximize();
		driver1.findElement(By.name("username")).sendKeys("nive");
		driver1.findElement(By.name("password")).sendKeys("2000");
		driver1.findElement(By.className("shadow")).click();
		
		String expectedUrl1= driver1.getCurrentUrl();
		String actualUrl1="http://localhost:3000/admin?query=abc/";
		Assert.assertEquals(actualUrl1, expectedUrl1);
		String at1=driver1.getTitle();
		System.out.println(at);
		String et1="React App";
		driver1.close();
		if(actualUrl.equalsIgnoreCase(expectedUrl))
		{
			System.out.println("Test Successful for Testcase2");
			
		}
		else {
			System.out.println("Test failed for Testcase2");
		
		}*/
	
	}

}
