package org.example.service.api;


import javax.ws.rs.core.Response;

public interface LaptopService {
    Response findLaptopsByPage(Integer page);
}