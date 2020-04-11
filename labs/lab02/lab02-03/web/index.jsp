<%@ page import="java.text.NumberFormat" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
    <head>
        <title>Lab 02 - 03</title>
    </head>
    <body>
        <%
            if (session.getAttribute("itemCount") == null) {
                session.setAttribute("itemCount", 0);
            };

            if (session.getAttribute("laptops") == null) {
                Map<String, Long> laptops = new LinkedHashMap<>();
                laptops.put("Laptop Sony Vaio SR2400", 15_000_000L);
                laptops.put("Laptop Sony Vaio SR3400", 17_000_000L);
                laptops.put("Laptop Sony Vaio SR7400", 25_000_000L);
                laptops.put("Laptop Sony Vaio SR9400", 35_000_000L);
                laptops.put("Laptop HPPro X5400", 12_000_000L);
                laptops.put("Laptop HPPro X9990", 25_000_000L);
                laptops.put("Laptop HPPro X20-3100", 18_000_000L);

                Map<String, Integer> counts = new LinkedHashMap<>();
                for (String name : laptops.keySet()) {
                    counts.put(name, 0);
                }
                session.setAttribute("laptops", laptops);
                session.setAttribute("laptopCounts", counts);
            }

            NumberFormat nf = new DecimalFormat("#,###");
            Integer itemCount = (Integer) session.getAttribute("itemCount");
            Map<String, Long> laptops = (Map<String, Long>) session.getAttribute("laptops");
            Map<String, Integer> laptopCounts = (Map<String, Integer>) session.getAttribute("laptopCounts");
        %>

        <h1>Mua hàng online</h1>
        <h2>Giỏ hàng: <%=itemCount%>
        </h2>
        <form method="POST" action="order.jsp">
            <table border="1">
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Tên hàng</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Mua</th>
                    </tr>
                    <%
                        int index = 1;
                        for (String name : laptops.keySet()) {
                            Long price = laptops.get(name);
                            Integer count = laptopCounts.get(name);
                    %>
                    <tr>
                        <td><%=(index++) + "."%>
                        </td>
                        <td><%=name%>
                        </td>
                        <td><%=nf.format(price).replaceAll(",", ".")%>
                        </td>
                        <td style="text-align: right" id="count-<%=name%>"><%=count%>
                        </td>
                        <td>
                            <input type="submit" formaction="${pageContext.request.contextPath}/item?name=<%=name%>" value="Mua">
                        </td>
                    </tr>
                    <% } %>
                </tbody>
            </table>
            <br/>
            <input type="submit" value="Thanh toán">
        </form>
    </body>
</html>
