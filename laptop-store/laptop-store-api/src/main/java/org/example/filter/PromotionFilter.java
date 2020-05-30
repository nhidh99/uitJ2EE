package org.example.filter;

import lombok.Data;

import javax.ws.rs.QueryParam;
import java.util.List;

@Data
public class PromotionFilter {
    @QueryParam("page")
    private Integer page;

    @QueryParam("ids")
    private List<Integer> ids;
}
