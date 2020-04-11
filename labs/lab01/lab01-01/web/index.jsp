<%@page contentType="text/html" pageEncoding="UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type"
              content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Login Page</h1>
        <form action="LoginCheck.jsp" method="post">
            Username:
            <label>
                <input type="text" name="username">
            </label>
            <br/>Password:
            <label>
                <input type="password" name="password">
            </label>
            <br/>
            <input type="submit" value="Submit">
        </form>
    </body>
</html>