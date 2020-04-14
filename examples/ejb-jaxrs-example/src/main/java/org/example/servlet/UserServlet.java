package org.example.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.UserDAO;
import org.example.model.User;

import javax.ejb.EJB;
import javax.persistence.NoResultException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "UserServlet", urlPatterns = "/users")
public class UserServlet extends HttpServlet {

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        this.processRequest(req, res);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String userId = req.getParameter("id");
        ObjectMapper om = new ObjectMapper();
        res.setContentType(MediaType.APPLICATION_JSON);

        try {
            PrintWriter out = res.getWriter();
            if (userId == null) {
                List<User> users = userDAO.findAll();
                String usersJSON = om.writeValueAsString(users);
                out.write(usersJSON);
            } else {
                User user = userDAO.findById(userId).orElseThrow(NoResultException::new);
                String userJSON = om.writeValueAsString(user);
                out.write(userJSON);
            }
            out.flush();
        } catch (NoResultException e) {
            res.sendError(HttpServletResponse.SC_NOT_FOUND);
        } catch (Exception e) {
            res.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}