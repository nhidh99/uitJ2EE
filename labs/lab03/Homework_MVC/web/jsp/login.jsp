<%--
  Created by IntelliJ IDEA.
  User: vuong
  Date: 6/1/2020
  Time: 6:42 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Homework MVC</title>
</head>
<body>
<h1 style="margin-left: 100px">Login Page</h1>
<div style="display: flex;">
    <form action="/LoginServlet" method="post">
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 100px">Username: </label>
            <input type="text" name="username"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 100px">Password: </label>
            <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" value="Login" style="margin-left: 100px"/>
        </div>
    </form>
</div>
</body>
</html>
