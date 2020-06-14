<%--
  Created by IntelliJ IDEA.
  User: vuong
  Date: 6/1/2020
  Time: 6:46 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Homework MVC</title>
</head>
<body>
    <h1>Create a new user</h1>
    <div style="margin-left: 300px">
        <a href="admin.jsp">Main menu</a>
        <a href="../index.jsp">Logout</a>
    </div>

    <div style="display: flex;">
        <form action="/CreateUserServlet" method="post">
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">Username: </label>
                <input type="text" name="username"/>
            </div>
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">Password: </label>
                <input type="password" name="password"/>
            </div>
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">Confirm password: </label>
                <input type="password" name="confirmPassword"/>
            </div>
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">First name: </label>
                <input type="text" name="firstName"/>
            </div>
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">Last name: </label>
                <input type="text" name="lastName"/>
            </div>
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">Sex: </label>
                <input type="text" name="sex"/>
            </div>
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">Address: </label>
                <input type="text" name="address"/>
            </div>
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">Email: </label>
                <input type="email" name="email"/>
            </div>
            <div style="display:flex; margin: 0 0 10px">
                <label style="width: 200px">Mobile-phone: </label>
                <input type="number" name="mobilePhone"/>
            </div>
            <div>
                <input type="button" value="Back" style="margin-left: 200px" onclick="window.location.href='/jsp/admin.jsp'"/>
                <input type="submit" value="Save" style="margin-left: 10px"/>
            </div>
        </form>
    </div>
</body>
</html>
