		
import  java.sql.Connection;		
import  java.sql.Statement;		
import  java.sql.ResultSet;		
import  java.sql.DriverManager;		
import  java.sql.SQLException;		
public class  Databasetest {				
    	public static void  main(String[] args) throws  ClassNotFoundException, SQLException {													
				//Connection URL Syntax: "jdbc:mysql://ipaddress:portnumber/db_name"		
                String dbUrl = "jdbc:mysql://localhost:3306/se_project";					
	
				String username = "root";	
                	
				String password = "nivehari";				
	
				String query = "select *  from admin;";	
                
         	    //Load mysql jdbc driver		
           	    Class.forName("com.mysql.jdbc.Driver");			
           	
            	Connection con = DriverManager.getConnection(dbUrl,username,password);
          		
        	   Statement stmt = con.createStatement();					
       		
         		ResultSet rs= stmt.executeQuery(query);							
         
         		// While Loop to iterate through all data and print results		
				while (rs.next()){
			        		String myuserName = rs.getString(1);	
			        		String myName = rs.getString(2);
                            String mypassword = rs.getString(3);					                               
                            System. out.println(myName+"  "+mypassword);		
                    }		
      			 // closing DB Connection		
      			con.close();			
		}
}