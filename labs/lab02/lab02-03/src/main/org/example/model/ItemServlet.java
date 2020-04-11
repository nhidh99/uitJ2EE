package org.example.model;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet(name = "itemServlet", urlPatterns = "/item")
public class ItemServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        HttpSession session = req.getSession(true);
        String laptopName = req.getParameter("name");
        Integer itemCount = (Integer) session.getAttribute("itemCount");
        Map<String, Integer> laptopCounts = (HashMap<String, Integer>) session.getAttribute("laptopCounts");
        laptopCounts.put(laptopName, laptopCounts.get(laptopName) + 1);
        session.setAttribute("laptopCounts", laptopCounts);
        session.setAttribute("itemCount", ++itemCount);
        res.sendRedirect("/");
    }
}