package org.example;

import org.mindrot.jbcrypt.BCrypt;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

/**
 * Author: Ian Gallagher <igallagher@securityinnovation.com>
 *
 * This code utilizes jBCrypt, which you need installed to use.
 * jBCrypt: http://www.mindrot.org/projects/jBCrypt/
 */

public class Password {
    // Define the BCrypt workload to use when generating password hashes. 10-31 is a valid value.
    private static int workload = 12;

    /**
     * This method can be used to generate a string representing an account password
     * suitable for storing in a database. It will be an OpenBSD-style crypt(3) formatted
     * hash string of length=60
     * The bcrypt workload is specified in the above static variable, a value from 10 to 31.
     * A workload of 12 is a very reasonable safe default as of 2013.
     * This automatically handles secure 128-bit salt generation and storage within the hash.
     * @param password_plaintext The account's plaintext password as provided during account creation,
     *			     or when changing an account's password.
     * @return String - a string of length 60 that is the bcrypt hashed password in crypt(3) format.
     */
    public static String hashPassword(String password_plaintext) {
        String salt = BCrypt.gensalt(workload);
        String hashed_password = BCrypt.hashpw(password_plaintext, salt);

        return(hashed_password);
    }

    /**
     * This method can be used to verify a computed hash from a plaintext (e.g. during a login
     * request) with that of a stored hash from a database. The password hash from the database
     * must be passed as the second variable.
     * @param password_plaintext The account's plaintext password, as provided during a login request
     * @param stored_hash The account's stored password hash, retrieved from the authorization database
     * @return boolean - true if the password matches the password of the stored hash, false otherwise
     */
    public static boolean checkPassword(String password_plaintext, String stored_hash) {
        boolean password_verified = false;

        if(null == stored_hash || !stored_hash.startsWith("$2a$"))
            throw new java.lang.IllegalArgumentException("Invalid hash provided for comparison");

        password_verified = BCrypt.checkpw(password_plaintext, stored_hash);

        return(password_verified);
    }

    public static boolean checkLogin(String username, String password) {
        String stored_pw;
        try (Connection conn = DBHelper.getConnection()) {
            String query = "select password from User where username = ?";
            PreparedStatement stm = conn.prepareStatement(query);
            stm.setString(1,username);
            ResultSet rs = stm.executeQuery();
            if(rs.next()) {
                stored_pw = rs.getString(1);
                return checkPassword(password, stored_pw);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }
    /**
     * A simple test case for the main method, verify that a pre-generated test hash verifies successfully
     * for the password it represents, and also generate a new hash and ensure that the new hash verifies
     * just the same.
     */

    public static int register(String username, String password) {
        try (Connection conn = DBHelper.getConnection()) {
            String hashed_pw = hashPassword(password);

            String query = "Insert into User values(?,?)";
            PreparedStatement stm = conn.prepareStatement(query);
            stm.setString(1,username);
            stm.setString(2, hashed_pw);
            int rs = stm.executeUpdate();
            return rs;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String username = input.nextLine();
//        String password = input.nextLine();
//        register(username, password);
        String passwordLogin = input.nextLine();

        if(checkLogin(username, passwordLogin)) {
            System.out.println("Dang nhap thanh cong");
        }
        else {
            System.out.println("That bai");
        }

    }

}