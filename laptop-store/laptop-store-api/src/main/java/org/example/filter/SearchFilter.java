package org.example.filter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchFilter {
    private String demand;
    private String brand;
    private Integer price;
    private String cpu;
    private Integer ram;
    private Integer hardDrive;
    private Integer monitor;
    private Integer page;
    private String name;
}

