<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<c:if test="${requestScope['users'] == null}">
    <%request.getRequestDispatcher("/index").forward(request, response);%>
</c:if>

<html>
    <head>
        <title>Lab 06 - 01</title>
    </head>
    <body>
        <table border="1">
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Password</th>
                </tr>
                <c:forEach items="${requestScope['users']}" var="user" varStatus="loop">
                    <tr>
                        <td><c:out value="${loop['index'] + 1}"/></td>
                        <td><c:out value="${user['username']}"/></td>
                        <td><c:out value="${user['password']}"/></td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </body>
</html>