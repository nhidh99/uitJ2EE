<html>
    <head>
        <title>Login Handler</title>
    </head>
    <body>
        <%
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            boolean isAdmin = username.equals("admin") && password.equals("admin");
            if (isAdmin) {
        %>
            <h1>Hello Admin</h1>
        <%
            } else {
        %>
            <h1>User info</h1>
            Username: <%=username%><br/>
            Password: <%=password%>
        <%
            }
        %>
    </body>
</html>
