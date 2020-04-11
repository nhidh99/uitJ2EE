<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 4/3/2020
  Time: 12:46 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Lab 02 - 02</title>
    </head>
    <body>
        <%
            String param1 = (String) session.getAttribute("param1");
            String param2 = (String) session.getAttribute("param2");
            String errorParam1 = (String) session.getAttribute("errorParam1");
            String errorParam2 = (String) session.getAttribute("errorParam2");
            String result = (String) session.getAttribute("result");
        %>

        <form method="POST" action="${pageContext.request.contextPath}/calculate">
            Sample of adding 2 big size numbers<br/>
            <label style="<%=errorParam1 != null ? "color: red" : "display: none"%>">
                <%=errorParam1%><br/>
            </label>
            <label>
                <input type="text" name="param1" value="<%=param1 != null ? param1 : "" %>">
            </label><br/>
            +<br/>
            <label style="<%=errorParam2 != null ? "color: red" : "display: none"%>">
                <%=errorParam2%><br/>
            </label>
            <label>
                <input type="text" name="param2" value="<%=param2 != null ? param2 : "" %>">
            </label><br/><br/>
            <label>
                <input type="text" disabled value="<%=result != null ? result : ""%>">
            </label><br/><br/>
            <input type="submit">
        </form>
    </body>
</html>
