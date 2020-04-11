package org.example.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "calculateServlet", urlPatterns = "/calculate")
public class CalculateServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String param1 = req.getParameter("param1");
        String param2 = req.getParameter("param2");
        String operation = req.getParameter("operation");

        res.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = res.getWriter()) {
            out.println("<html>" +
                    "<head>" +
                    "<title>Lab 02 - 01</title>" +
                    "</head>" +
                    "<body>");
            try {
                Double result = calculate(param1, param2, operation);
                out.println("Kết quả<br/>");
                out.println(result + "<br/>");
            } catch (Exception e) {
                out.println(e.getMessage() + "<br/>");
            }
            out.print("<input type=\"button\" value=\"Back\"\n onclick=\"javascript:history.back()\">");
            out.println("<input type=\"button\" value=\"Close\" onclick=\"javascript:window.close()\">");
        }
    }

    private Double calculate(String param1, String param2, String operation) {
        String regex = "[+-]?\\d*(\\.\\d+)?";
        if (param1.isEmpty() || param2.isEmpty() || !param1.matches(regex) || !param2.matches(regex)) {
            throw new IllegalArgumentException("Toán hạng không họp lệ");
        }

        Double p1 = Double.parseDouble(param1);
        Double p2 = Double.parseDouble(param2);
        switch (operation) {
            case "add":
                return p1 + p2;
            case "minus":
                return p1 - p2;
            case "multiply":
                return p1 * p2;
            case "divide":
                if (p2 != 0) {
                    return p1 / p2;
                } else {
                    throw new ArithmeticException("Không thể chia cho 0!");
                }
            default:
                return null;
        }
    }
}
