```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
 
public class SQLServerConnect {
		static String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
		static String dbURL = "jdbc:sqlserver://127.0.0.1:1433;DatabaseName=shopmg";
		static String userName = "sa";
		static String userPwd = "123456";
		//加载数据库驱动

	  public static void connect() {            //三个参数分别为账号、密码、识别标志(用户还是管理)	
      try {
        Class.forName(driverName);
        System.out.println("加载驱动成功！");
      } catch (Exception e) {
        e.printStackTrace();
        System.out.println("加载驱动失败！");
      }
		
		String sql = "select * from goods";

		try {
			//获得数据库连接
			Connection dbConn = DriverManager.getConnection(dbURL, userName, userPwd);
			System.out.println("连接数据库成功！");
			
			//获得语句执行的对象
			Statement stmt= dbConn.createStatement();
			
			//执行语句
			ResultSet rs = stmt.executeQuery(sql);//创建数据对象
			while(rs.next())
			{
				if(rs.getString(1).equals(id)&&rs.getString(2).equals(password)&&rs.getString(3).equals(fl))
				{
					dl = true;
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.print("SQL Server连接失败！");
		}
	}
	public static void main(String[] args) {
		new SQLServerConnect().connect();
	}
}

```