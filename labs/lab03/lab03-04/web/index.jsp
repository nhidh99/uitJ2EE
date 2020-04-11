<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="laptop" class="org.example.model.Laptop" scope="request"/>
<%--<jsp:useBean id="laptop" class="org.example.model.Laptop" scope="session"/>--%>

<html>
    <head>
        <title>Lab 03 - 04</title>
    </head>
    <body>
        <h1>El demo page</h1>
        <form method="post" action="${pageContext.request.contextPath}/calculate">
            Product name
            <label>
                <input type="text" name="name"/>
            </label><br/><br/>
            Price
            <label>
                <input type="text" name="price"/>
            </label><br/><br/>
            Quantity
            <label>
                <input type="text" name="quantity"/>
            </label><br/><br/>
            <input type="submit"/><br/>
        </form>

        Product name: <b><%=laptop.getName()%></b><br/>
        Price: <b>$<%=laptop.getPrice()%></b><br/>
        Quantity: <b><%=laptop.getQuantity()%></b><br/>
        Total is: <b>$<%=laptop.getPrice() * laptop.getQuantity()%></b>
    </body>
</html>