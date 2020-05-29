package org.example.service.api;

import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.filter.PromotionFilter;

import javax.ws.rs.core.Response;

public interface PromotionService {
    Response findPromotions(PromotionFilter promotionFilter);

    Response findPromotionById(Integer id);

    Response createPromotion(MultipartBody body);

    Response deletePromotionById(Integer id);
}