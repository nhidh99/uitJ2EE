<%@page contentType="text/html" pageEncoding="UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Lab01-02</title>
    </head>
    <body>
        <form action="handleRegister.jsp" method="POST">
            <h2>Thông tin sinh viên</h2>
            Họ tên:
            <label>
                <input name="name" type="text"/>
            </label><br/><br/>
            Mã số:
            <label>
                <input name="id" type="text"/>
            </label><br/><br/>
            Ngày sinh:
            <label>
                <input name="birthday" type="date"/>
            </label><br/><br/>
            Giới tính:<br/>
            <label>
                <input type="radio" name="gender" value="Nam"/>Nam<br/>
            </label>
            <label>
                <input type="radio" name="gender" value="Nữ"/>Nữ
            </label><br/><br/>
            Khoa:
            <label>
                <select name="faculty">
                    <option value="Công nghệ phần mềm">Công nghệ phần mềm</option>
                    <option value="Hệ thống thông tin">Hệ thống thông tin</option>
                    <option value="Khoa học máy tính">Khoa học máy tính</option>
                    <option value="Khoa học và kĩ thuật thông tin">Khoa học và kĩ thuật thông tin</option>
                    <option value="Kỹ thuật máy tính">Kỹ thuật máy tính</option>
                    <option value="Mạng máy tính và truyền thông">Mạng máy tính và truyền thông</option>
                </select>
            </label><br/><br/>
            Câu lạc bộ tham gia:<br/>
            <label>
                <input type="checkbox" name="clubs" value="Ban học tập"/>Ban học tập<br/>
                <input type="checkbox" name="clubs" value="Công tác xã hội"/>Công tác xã hội<br/>
                <input type="checkbox" name="clubs" value="Văn nghệ xung kích"/>Văn nghệ xung kích<br/>
                <input type="checkbox" name="clubs" value="Sách và hành động"/>Sách và hành động
            </label><br/><br/>
            Sở thích:<br/>
            <label>
                <textarea name="favorite" rows="5"></textarea>
            </label><br/><br/>
            <input type="submit" value="Đăng kí"/>
        </form>
    </body>
</html>
