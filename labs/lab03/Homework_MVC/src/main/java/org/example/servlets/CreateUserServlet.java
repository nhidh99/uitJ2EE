package org.example.servlets;

import org.example.bo.UserBO;
import org.example.model.User;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "CreateUserServlet", urlPatterns = "/CreateUserServlet")
public class CreateUserServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (req.getParameter("password").equals(req.getParameter("confirmPassword"))) {
            ServletContext context = req.getServletContext();
            UserBO userBO = new UserBO(context);
            User user = buildUserFromRequest(req);
            userBO.createUser(user);
            if (user.getGroupId() == 1) {
                resp.sendRedirect("/jsp/admin.jsp");
            } else {
                resp.sendRedirect("/jsp/user.jsp");
            }
        } else {
            resp.sendRedirect("/jsp/user-create.jsp");
        }
    }

    public User buildUserFromRequest(HttpServletRequest req) {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String firstName = req.getParameter("firstName");
        String lastName = req.getParameter("lastName");
        String sex = req.getParameter("sex");
        String address = req.getParameter("address");
        String email = req.getParameter("email");
        String mobilePhone = req.getParameter("mobilePhone");
        return User.builder().username(username)
                .password(password).firstName(firstName)
                .lastName(lastName).sex(sex).address(address)
                .email(email).mobilePhone(mobilePhone).groupId(2).build();
    }
}