<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <body>
        <%
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            request.getSession(true).setAttribute("username", username);
        %>
        Welcome <%=username%>
        <form action="BookServlet" method="Post">
            Please enter your favorite book :
            <label>
                <select name="book">
                    <option value="C" selected> C/C++</option>
                    <option value="Java"> Java</option>
                    <option value="Linux"> Linux</option>
                    <option value="XML"> XML</option>
                    <option value="SQLServer"> SQL Server
                        2005
                    </option>
                </select>
            </label>
            <p>
                <input type=submit value="Choose book">
        </form>
    </body>
</html>