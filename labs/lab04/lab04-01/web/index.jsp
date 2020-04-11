<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/fmt" prefix = "fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<jsp:useBean id="laptops" type="java.util.List<org.example.model.Laptop>" scope="request"/>

<html>
    <head>
        <title>Lab 04 - 01</title>
    </head>
    <body>
        <table border="1">
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                <c:forEach items="${laptops}" var="laptop">
                    <tr>
                        <td><c:out value="${laptop.id}"/></td>
                        <td><c:out value="${laptop.name}"/></td>
                        <td><fmt:formatNumber value="${laptop.price}" type="number" maxFractionDigits="3"/></td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </body>
</html>