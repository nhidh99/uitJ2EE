package org.example.service.api;


import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;

import javax.ws.rs.core.Response;

public interface LaptopService {
    Response findLaptopsByPage(Integer page);
    Response createLaptop(MultipartBody body);
}