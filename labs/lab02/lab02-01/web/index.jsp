<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 4/2/2020
  Time: 11:24 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Lab 02 - 01</title>
    </head>
    <body>
        <h1>Calculator</h1>
        <form method="POST" action="${pageContext.request.contextPath}/calculate">
            Toán hạng thứ nhất:
            <label>
                <input type="text" name="param1"/><br/><br/>
            </label>
            Phép toán:
            <label>
                <select name="operation">
                    <option value="add">Cộng</option>
                    <option value="minus">Trừ</option>
                    <option value="multiply">Nhân</option>
                    <option value="divide">Chia</option>
                </select><br/><br/>
            </label>
            Toán hạng thứ hai:
            <label>
                <input type="text" name="param2"/><br/><br/>
            </label>
            <input type="submit"/>
        </form>
    </body>
</html>
