package org.example.service.api;


import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;

import javax.ws.rs.core.Response;

public interface LaptopService {
    Response findLaptopsByPage(Integer page);

    Response findLaptopById(Integer id);

    Response createLaptop(MultipartBody body);

    Response updateLaptop(Integer id, MultipartBody body);

    Response deleteLaptop(Integer id);

    Response findPromotionsById(Integer id);

    Response findTagsById(Integer id);
}