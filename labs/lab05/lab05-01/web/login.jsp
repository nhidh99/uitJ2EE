<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<c:if test="${sessionScope['user'] != null}">
    ${pageContext.response.sendRedirect("/index.jsp")}
</c:if>

<html>
    <head>
        <title>Lab 05 - 01</title>
    </head>
    <body>
        <h1>Login</h1>
        <a href="${pageContext.request.contextPath}/register.jsp">Register here</a><br/><br/>
        <form method="post" action="${pageContext.request.contextPath}/login">
            Username:
            <label>
                <input type="text" name="username"/>
            </label><br/><br/>
            Password:
            <label>
                <input type="password" name="password"/>
            </label><br/><br/>
            <input type="submit"/><br/><br/>
            <label style="color: red"><c:out value="${requestScope['error']}"/></label>
        </form>
    </body>
</html>