<%@ page import="java.util.Map" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Lab 02 - 03</title>
    </head>
    <body>
        <%
            if (session.getAttribute("itemCount") == null) {
                response.sendRedirect("/");
            }
            NumberFormat nf = new DecimalFormat("#,###");
            long totalPrice = 0L;
            Map<String, Long> laptops = (Map<String, Long>) session.getAttribute("laptops");
            Map<String, Integer> laptopCounts = (Map<String, Integer>) session.getAttribute("laptopCounts");
        %>

        <h1>Xin cảm ơn quý khách!</h1>
        <table border="1">
            <tbody>
                <tr>
                    <th>STT</th>
                    <th>Tên hàng</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                </tr>
                <%
                    int index = 1;
                    for (String name : laptops.keySet()) {
                        Long price = laptops.get(name);
                        Integer count = laptopCounts.get(name);
                        if (count == 0) continue;
                        totalPrice += price * count;
                %>
                <tr>
                    <td><%=(index++) + "."%>
                    </td>
                    <td><%=name%>
                    </td>
                    <td><%=nf.format(price).replaceAll(",", ".")%>
                    </td>
                    <td style="text-align: right">
                        <%=count%>
                    </td>
                    <td style="text-align: right">
                        <%=nf.format(count * price).replaceAll(",", ".")%>
                    </td>
                </tr>
                <% } %>
                <tr>
                    <td colspan="4">TỔNG</td>
                    <td><%=nf.format(totalPrice).replaceAll(",", ".")%>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
