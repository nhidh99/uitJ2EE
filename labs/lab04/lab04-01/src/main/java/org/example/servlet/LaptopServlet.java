package org.example.servlet;

import org.example.dao.LaptopDAO;
import org.example.model.Laptop;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "laptopServlet", urlPatterns = "/index")
public class LaptopServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        this.processRequest(req, res);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        LaptopDAO laptopDAO = new LaptopDAO();
        List<Laptop> laptops = laptopDAO.findAll();
        req.setAttribute("laptops", laptops);
        req.getRequestDispatcher("/index.jsp").forward(req, res);
    }
}