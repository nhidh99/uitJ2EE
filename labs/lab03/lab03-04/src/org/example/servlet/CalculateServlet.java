package org.example.servlet;

import org.example.model.Laptop;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "calculateServlet", urlPatterns = "/calculate")
public class CalculateServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        this.processRequest(req, res);
    }
    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        String name = req.getParameter("name");
        String priceStr = req.getParameter("price");
        String quantityStr = req.getParameter("quantity");

        if (!priceStr.matches("\\d+") || !quantityStr.matches("\\d+")) {
            res.sendRedirect("/");
            return;
        }

        long price = Long.parseLong(priceStr);
        int quantity = Integer.parseInt(quantityStr);
        Laptop laptop = new Laptop(name, price, quantity);
        System.out.println(laptop.getName());
        req.setAttribute("laptop", laptop);
        // req.getSession().setAttribute("laptop", laptop);
        req.getRequestDispatcher("/").forward(req, res);
    }
}
