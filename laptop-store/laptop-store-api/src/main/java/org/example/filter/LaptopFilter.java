package org.example.filter;

import lombok.Data;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.QueryParam;
import java.util.List;

@Data
public class LaptopFilter {
    @QueryParam("page")
    @DefaultValue("1")
    private Integer page;

    @QueryParam("ids")
    private List<Integer> ids;
}
