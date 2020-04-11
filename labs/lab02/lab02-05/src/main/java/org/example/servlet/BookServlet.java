package org.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "BookServlet", urlPatterns = "/BookServlet")
public class BookServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        this.processRequest(req, res);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("text/html");
        try (PrintWriter out = res.getWriter()) {
            String username = (String) req.getSession(true).getAttribute("username");
            String book = req.getParameter("book");
            out.println("<html>");
            out.println("<body>");
            out.println("Well, T see that " + username + "'s favorite book is " + book + ".");
            out.println("</body>");
            out.println("</html>");
        }
    }
}