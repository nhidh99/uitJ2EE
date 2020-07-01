package org.example.service.api;


import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.filter.LaptopFilter;
import org.example.filter.SearchFilter;

import javax.ws.rs.BeanParam;
import javax.ws.rs.core.Response;

public interface LaptopService {
    Response findLaptops(LaptopFilter laptopFilter);

    Response findLaptopById(Integer id);

    Response findLaptopsByFilter(String queryParam, Integer page);

    Response findLaptopByCondition(SearchFilter params);

    Response findLaptopByType(String type, Integer page);

    Response createLaptop(MultipartBody body);

    Response updateLaptop(Integer id, MultipartBody body);

    Response deleteLaptop(Integer id);

    Response findPromotionsById(Integer id);

    Response findTagsById(Integer id);
}