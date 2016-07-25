package com.theironyard.entities;


import java.sql.*;
import java.util.Calendar;
import java.util.Date;

public class JavaCurrentTimeStamp{

//    public static void main( String[] args ) throws SQLException, ClassNotFoundException {
//
//        String myDriver = "org.h2.Driver";
//        String myUrl = "jdbc:h2:./main";
//        Class.forName(myDriver);
//        Connection connection = DriverManager.getConnection(myUrl, "root", "");
//
//        Calendar calendar = Calendar.getInstance();
//        java.sql.Timestamp ourJavaTimestampObject = new java.sql.Timestamp(calendar.getTime().getTime());
//
//        String sqlTimestampInsertStatement = "INSERT INTO users (timestamp2) VALUES (?)";
//        PreparedStatement preparedStatement = connection.prepareStatement(sqlTimestampInsertStatement);
//        preparedStatement.setTimestamp(1, ourJavaTimestampObject);
//
//        preparedStatement.executeUpdate();
//        preparedStatement.close();
//        System.exit(0);
//    }
}
