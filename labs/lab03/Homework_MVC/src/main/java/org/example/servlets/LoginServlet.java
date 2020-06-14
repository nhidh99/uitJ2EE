package org.example.servlets;

import org.example.bo.UserBO;
import org.example.model.User;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "LoginServlet", urlPatterns = "/LoginServlet")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.print("a");
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        ServletContext context = req.getServletContext();
        UserBO userBO = new UserBO(context);
        User user = userBO.login(username, password);
        if (user != null) {
            HttpSession session = req.getSession(true);
            session.setAttribute("loggedUser", user);
            if (user.getGroupId() == 1) {
                resp.sendRedirect("/jsp/admin.jsp");
            } else {
                resp.sendRedirect("/jsp/user.jsp");
            }
        } else {
            resp.sendRedirect("/jsp/login.jsp");
        }
    }
}
