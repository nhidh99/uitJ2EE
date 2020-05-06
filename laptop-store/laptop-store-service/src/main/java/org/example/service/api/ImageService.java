package org.example.service.api;

import javax.ws.rs.core.Response;

public interface ImageService {
    Response findPromotionImage(Integer id, String alt, Integer resolution);

    Response findLaptopImage(Integer id, String alt, Integer resolution);
}
