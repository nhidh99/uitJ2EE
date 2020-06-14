package org.example.servlets;

import org.example.bo.UserBO;
import org.example.model.User;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "UpdateUserInfo", urlPatterns = "/UpdateUserInfo")
public class UpdateUserInfo extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ServletContext context = req.getServletContext();
        UserBO userBO = new UserBO(context);
        User user = buildUserFromRequest(req);

        String newPassword = req.getParameter("newPassword");
        String confirmNewPassword = req.getParameter("confirmNewPassword");
        if (newPassword != null && newPassword.equals(confirmNewPassword)) {
            user.setPassword(newPassword);
        }
        userBO.updateUser(user);
        req.getSession().setAttribute("loggedUser", user);
        resp.sendRedirect("/jsp/user-info.jsp");
    }

    public User buildUserFromRequest(HttpServletRequest req) {
        User user = (User) req.getSession().getAttribute("loggedUser");
        String username = user.getUsername();
        String password = user.getPassword();
        Integer groupId = user.getGroupId();
        String firstName = req.getParameter("firstName");
        String lastName = req.getParameter("lastName");
        String sex = req.getParameter("sex");
        String address = req.getParameter("address");
        String email = req.getParameter("email");
        String mobilePhone = req.getParameter("mobilePhone");
        return User.builder().username(username)
                .password(password).firstName(firstName)
                .lastName(lastName).sex(sex).address(address)
                .email(email).mobilePhone(mobilePhone).groupId(groupId).build();
    }
}
