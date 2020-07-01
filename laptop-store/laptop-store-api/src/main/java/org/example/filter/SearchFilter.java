package org.example.filter;

import lombok.Builder;
import lombok.Data;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.QueryParam;

@Data
public class SearchFilter {
    @QueryParam("demand")
    private String demand;

    @QueryParam("brand")
    private String brand;

    @QueryParam("price")
    private Integer price;

    @QueryParam("cpu")
    private String cpu;

    @QueryParam("ram")
    private Integer ram;

    @QueryParam("hardDrive")
    private Integer hardDrive;

    @QueryParam("monitor")
    private Integer monitor;

    @QueryParam("page")
    @DefaultValue("1")
    private Integer page;

    @QueryParam("name")
    private String name;
}

