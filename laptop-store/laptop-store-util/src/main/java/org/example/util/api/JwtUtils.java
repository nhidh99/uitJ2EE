package org.example.util.api;

import javax.ejb.Local;

@Local
public interface JwtUtils {
    String issueToken(Integer userId);
}