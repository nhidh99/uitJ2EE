package org.example.servlet;

import org.example.bus.UserBUS;
import org.example.dto.UserDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "registerServlet", urlPatterns = "/register")
public class RegisterServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        this.processRequest(req, res);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String confirm = req.getParameter("confirm");
        req.setAttribute("username", username);

        if (!password.equals(confirm)) {
            req.setAttribute("error", "Password and confirm-password are different");
            req.getRequestDispatcher("/register.jsp").forward(req, res);
        }

        try {
            UserBUS userBUS = new UserBUS();
            UserDTO userDTO = new UserDTO(username, password);
            if (userBUS.register(userDTO)) {
                res.sendRedirect("/login.jsp");
            } else {
                req.setAttribute("error","Server error");
                req.getRequestDispatcher("/register.jsp").forward(req, res);
            }
        } catch (IllegalArgumentException e) {
            req.setAttribute("error", e.getMessage());
            req.getRequestDispatcher("/register.jsp").forward(req, res);
        }
    }
}