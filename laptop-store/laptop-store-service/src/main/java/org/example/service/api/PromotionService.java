package org.example.service.api;

import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;

import javax.ws.rs.core.Response;

public interface PromotionService {
    Response findPromotionsByPage(Integer page);
    Response findPromotionsById(Integer id);
    Response createPromotion(MultipartBody body);
    Response deletePromotionById(Integer id);
}