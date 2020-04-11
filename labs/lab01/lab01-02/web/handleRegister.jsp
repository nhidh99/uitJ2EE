<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Lab01-02</title>
    </head>
    <body>
        <%
            // Get parameters
            request.setCharacterEncoding("UTF-8");
            String name = request.getParameter("name");
            String id = request.getParameter("id");
            String birthday = request.getParameter("birthday");
            String gender = request.getParameter("gender");
            String faculty = request.getParameter("faculty");
            String[] clubs = request.getParameterValues("clubs");
            String favorite = request.getParameter("favorite");
        %>

        <%
            // Convert date-format
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(birthday);
            sdf.applyPattern("dd/MM/yyyy");
            birthday = sdf.format(date);
        %>

        <h2>Thông tin đăng kí</h2>
        <p>Họ tên: <%=name%>
        </p>
        <p>Mã số: <%=id%>
        </p>
        <p>Ngày sinh: <%=birthday%>
        </p>
        <p>Giới tính: <%=gender%>
        </p>
        <p>Khoa: <%=faculty%>
        </p>
        <p>Các câu lạc bộ tham gia: <%=String.join(", ", clubs)%>
        </p>
        <p>Sở thích: <%=favorite%>
        </p>
    </body>
</html>
