package org.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigInteger;


@WebServlet(name = "calculateServlet", urlPatterns = "/calculate")
public class CalculateServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        HttpSession session = req.getSession(true);
        String param1 = req.getParameter("param1");
        String param2 = req.getParameter("param2");

        session.setAttribute("param1", param1);
        session.setAttribute("param2", param2);

        if (isValidParameters(param1, param2, session)) {
            BigInteger p1 = new BigInteger(param1);
            BigInteger p2 = new BigInteger(param2);
            BigInteger result = p1.add(p2);
            session.setAttribute("result", result.toString());
        } else {
            session.setAttribute("result", null);
        }
        req.getRequestDispatcher("index.jsp").forward(req, res);
    }

    private boolean isValidParameters(String param1, String param2, HttpSession session) {
        String regex = "[+-]?[0-9]+";
        boolean output = true;

        if (param1.isEmpty() || !param1.matches(regex)) {
            session.setAttribute("errorParam1", String.format("Format of '%s' is not numeric", param1));
            output = false;
        } else {
            session.setAttribute("errorParam1", null);
        }

        if (param2.isEmpty() || !param2.matches(regex)) {
            session.setAttribute("errorParam2", String.format("Format of '%s' is not numeric", param2));
            output = false;
        } else {
            session.setAttribute("errorParam2", null);
        }
        return output;
    }
}
