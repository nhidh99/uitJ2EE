package org.example.service.api;

import javax.ws.rs.core.Response;

public interface PromotionService {
    Response findPromotionsByPage(Integer page);
}