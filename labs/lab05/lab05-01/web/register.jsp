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
        <h1>Register</h1>
        <a href="login.jsp">Back to login</a><br/><br/>
        <form method="post" action="${pageContext.request.contextPath}/register">
            Username:
            <label>
                <input type="text" name="username" value="${requestScope['username']}"/>
            </label><br/><br/>
            Password:
            <label>
                <input type="password" name="password" minlength="6" maxlength="30"/>
            </label><br/><br/>
            Confirm:
            <label>
                <input type="password" name="confirm" minlength="6" maxlength="30"/>
            </label><br/><br/>
            <input type="submit"/><br/><br/>
            <label style="color: red"><c:out value="${requestScope['error']}"/></label>
        </form>
    </body>
</html>