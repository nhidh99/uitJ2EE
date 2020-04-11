<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<c:if test="${sessionScope['user'] == null}">
    ${pageContext.response.sendRedirect("/login.jsp")}
</c:if>

<html>
    <head>
        <title>Lab 05 - 01</title>
    </head>
    <body>
        <h1>
            Welcome <c:out value="${sessionScope.user.username}"/>!
        </h1>
    </body>
</html>