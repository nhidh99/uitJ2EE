<%@ page import="org.example.model.User" %><%--
  Created by IntelliJ IDEA.
  User: vuong
  Date: 6/1/2020
  Time: 9:02 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Homework MVC</title>
</head>
<body>
<%
    User user = (User)session.getAttribute("loggedUser");
%>
<div style="display: flex;">
    <form action="/UpdateUserInfo" method="post">
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">Username: </label>
            <input type="text" name="username" value="<%=user.getUsername()%>"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">Current password: </label>
            <input type="password" name="password" value="<%=user.getPassword()%>"/>
            <a href="update-user-info.jsp" style="margin-left: 15px" >Change password</a>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">New password: </label>
            <input type="password" name ="newPassword"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">Confirm new password: </label>
            <input type="password" name="confirmNewPassword"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">First name: </label>
            <input type="text" name="firstName" value="<%=user.getFirstName()%>"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">Last name: </label>
            <input type="text" name="lastName" value="<%=user.getLastName()%>"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">Sex: </label>
            <input type="text" name="sex" value="<%=user.getSex()%>"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">Address: </label>
            <input type="text" name="address" value="<%=user.getAddress()%>"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">Email: </label>
            <input type="email" name="email" value="<%=user.getEmail()%>"/>
        </div>
        <div style="display:flex; margin: 0 0 10px">
            <label style="width: 200px">Mobile-phone: </label>
            <input type="number" name="mobilePhone" value="<%=user.getMobilePhone()%>"/>
        </div>
        <div>
            <input type="button" value="Back" style="margin-left: 200px" onclick="window.location.href='/jsp/user.jsp'"/>
            <input type="submit" value="Save" style="margin-left: 10px"/>
        </div>
    </form>
</div>
</body>
</html>
