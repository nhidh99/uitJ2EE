package org.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "sessionServlet", urlPatterns = "/session")
public class SessionServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        this.processRequest(req, res);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        HttpSession session = req.getSession(true);
        String userId = "nhidh99";
        String heading;

        if (session.isNew()) {
            heading = "Welcome, " + userId;
            session.setAttribute("accessCount", 0);
        } else {
            heading = "Welcome back";
            Integer accessCount = (Integer) session.getAttribute("accessCount");
            session.setAttribute("accessCount", accessCount + 1);
        }
        req.setAttribute("heading", heading);
        req.setAttribute("userId", userId);
        req.getRequestDispatcher("/index.jsp").forward(req, res);
    }
}
