<%--
  Created by IntelliJ IDEA.
  User: vuong
  Date: 6/1/2020
  Time: 8:25 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Homework MVC</title>
</head>
<body>
    <h1>Search user</h1>
    <div style="width: 1000px">
        <div>
            <a href="/jsp/admin.jsp">Main menu</a>
            <a href="/index.jsp" style="margin-left: 15px">Logout</a>
        </div>
        <div style="display: flex;">
            <form action="" method="post">
                <div style="display:flex; margin: 0 0 10px">
                    <label style="width: 100px">User name: </label>
                    <input type="text" name="username"/>
                    <label style="width: 100px; padding-left: 150px">User group: </label>
                    <select name="userGroup">
                        <option>admin</option>
                        <option>user</option>
                    </select>
                </div>
                <div style="display:flex; margin: 0 0 10px">
                    <label style="width: 100px">First name: </label>
                    <input type="text" name="firstName"/>
                    <label style="width: 100px; padding-left: 150px">Last name: </label>
                    <input type="text" name="lastName"/>
                </div>
                <div style="display:flex; margin: 0 0 10px">
                    <label style="width: 100px">Sex: </label>
                    <input type="text" name="sex"/>
                    <label style="width: 100px; padding-left: 150px">Email:  </label>
                    <input type="email" name="email"/>
                </div>
                <div style="display:flex; margin: 0 0 10px">
                    <label style="width: 100px">Address: </label>
                    <input type="text" name="address"/>
                    <label style="width: 100px; padding-left: 150px">Mobile-phone:  </label>
                    <input type="number" name="mobilePhone"/>
                    <input type="submit" value="Search" style="margin-left: 20px"/>
                </div>
            </form>
        </div>
        <h1>The matching list</h1>
        <div>
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
                <td>admin</td>
                <td>oneadmin</td>
                <td>A</td>
                <td>Nguyen</td>
                <td>Nam</td>
                <td>Khu pho 6, Linh Trung</td>
                <td>admin@gmail.com</td>
                <td>1234567890</td>
                <td>1</td>
                <td><input type="checkbox"/></td>
                </tbody>
            </table>
        </div>
        <div style="display: flex; flex-direction: row-reverse;">
            <input type="button" value="Delete" style="margin-left: 15px;"/>
            <input type="button" value="Create" style="margin-left: 15px;" onclick="window.location.href='/jsp/user-create.jsp'"/>
            <input type="button" value="Back" onclick="window.location.href='/jsp/admin.jsp'"/>
        </div>
    </div>
</body>
</html>
