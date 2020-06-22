package org.example.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {
    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        String connString = "jdbc:mysql://localhost:3306/db_j2ee?autoReconnect=true&useSSL=false";
        String username = "root";
        String password = "root";
        return DriverManager.getConnection(connString, username, password);
    }
}
