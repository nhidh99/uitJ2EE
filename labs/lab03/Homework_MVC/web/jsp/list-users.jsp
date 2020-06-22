<%@ page import="org.example.model.User" %>
<%@ page import="java.util.List" %><%--
  Created by IntelliJ IDEA.
  User: vuong
  Date: 6/1/2020
  Time: 6:54 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Homework MVC</title>
</head>
<body>
    <h1>The list of users</h1>
    <div style="width: 1000px">
        <div style="margin-left: 85%">
            <a href="/jsp/admin.jsp">Main menu</a>
            <a href="/index.jsp" style="margin-left: 15px">Logout</a>
        </div>
        <div>
            <form action="/ListUserServlet" method="get">
                <table style="width: 100%">
                    <thead style="text-align: left; background-color: grey">
                    <th>User name</th>
                    <th>Password</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Sex</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Mobile-phone</th>
                    <th>Role name</th>
                    <th> </th>
                    </thead>
                    <tbody>
                        <%
                            List<User> list = (List<User>) request.getAttribute("listUsers");
                            if(list != null) {
                            for(User user : list) {
                        %>
                    <tr>
                        <td><%=user.getUsername()%></td>
                        <td><%=user.getPassword()%></td>
                        <td><%=user.getFirstName()%></td>
                        <td><%=user.getLastName()%></td>
                        <td><%=user.getSex()%></td>
                        <td><%=user.getAddress()%></td>
                        <td><%=user.getEmail()%></td>
                        <td><%=user.getMobilePhone()%></td>
                        <td><%=user.getGroupId()%></td>
                        <td><input type="checkbox"/></td>
                    </tr>
                    <%}}%>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div style="display: flex; flex-direction: row-reverse;">
            <input type="button" value="Delete" style="margin-left: 15px;"/>
            <input type="button" value="Create" style="margin-left: 15px;" onclick="window.location.href='/jsp/user-create.jsp'"/>
            <input type="button" value="Back" onclick="window.location.href='/jsp/admin.jsp'"/>
        </div>
    </div>
</body>
</html>
