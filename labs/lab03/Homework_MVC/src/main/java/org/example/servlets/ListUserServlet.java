package org.example.servlets;

import org.example.bo.UserBO;
import org.example.model.User;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "ListUserServlet", urlPatterns = "/ListUserServlet")
public class ListUserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext context = req.getServletContext();
        UserBO userBO = new UserBO(context);
        List<User> list = userBO.getUsers();
        req.setAttribute("listUsers", list);
        req.getRequestDispatcher("/jsp/list-users.jsp").forward(req, resp);
    }
}
