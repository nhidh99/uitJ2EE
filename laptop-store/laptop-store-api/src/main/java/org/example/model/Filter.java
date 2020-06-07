package org.example.model;

public class Filter {
    private String demand;
    private String brand;
    private Integer price;
    private String cpu;
    private Integer ram;
    private Integer hardDrive;
    private Integer monitor;
    private Integer page;
    private String name;

    public String getDemand() {
        return demand;
    }

    public Filter demand(String demand) {
        this.demand = demand;
        return this;
    }

    public String getBrand() {
        return brand;
    }

    public Filter brand(String brand) {
        this.brand = brand;
        return  this;
    }

    public Integer getPrice() {
        return price;
    }

    public Filter price(Integer price) {
        this.price = price;
        return this;
    }

    public String getCpu() {
        return cpu;
    }

    public Filter cpu(String cpu) {
        this.cpu = cpu;
        return this;
    }

    public Integer getRam() {
        return ram;
    }

    public Filter ram(Integer ram) {
        this.ram = ram;
        return this;
    }

    public Integer getHardDrive() {
        return hardDrive;
    }

    public Filter hardDrive(Integer hardDrive) {
        this.hardDrive = hardDrive;
        return this;
    }

    public Integer getMonitor() {
        return monitor;
    }

    public Filter monitor(Integer monitor) {
        this.monitor = monitor;
        return this;
    }

    public Integer getPage() {
        return page;
    }

    public Filter page(Integer page) {
        this.page = page;
        return this;
    }

    public String getName() { return name; }

    public Filter name(String name) {
        this.name = name;
        return this;
    }

}

