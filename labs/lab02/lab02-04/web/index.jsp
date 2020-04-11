<%@ page import="java.util.Date" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    if (request.getAttribute("userId") == null) {
        request.getRequestDispatcher("/session").forward(request, response);
    }
%>
<html>
    <head>
        <title>Lab 02 - 04</title>
    </head>
    <body>
        <h1>${requestScope['heading']}</h1>
        <table border="1">
            <tbody>
                <tr>
                    <th>Session Info</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>id</td>
                    <td><%=session.getId()%></td>
                </tr>
                <tr>
                    <td>Creation time</td>
                    <td><%=new Date(session.getCreationTime())%></td>
                </tr>
                <tr>
                    <td>Time of Last Access</td>
                    <td><%=new Date(session.getLastAccessedTime())%></td>
                </tr>
                <tr>
                    <td>User ID</td>
                    <td>${requestScope['userId']}</td>
                </tr>
                <tr>
                    <td>Number of visits</td>
                    <td>${sessionScope['accessCount']}</td>
                </tr>
            </tbody>
        </table>
    </body>
</html>