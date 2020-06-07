package org.example.service.constants;

public class FilterConstants {
//Home Page
    public static  final  String ALL = "Tất cả";

//brand
    public static  final  String BRANDFILTERTITLE = "Thương hiệu";

//cpu
    public static  final  String CPUFILTERTITLE = "CPU" ;
    public static  final  String CPUI3 = "Intel core i3";
    public static  final  String CPUI5 = "Intel core i5";
    public static  final  String CPUI7 = "Intel core i7";
    public static  final  String CPUI9 = "Intel core i9";

//demand
    public static  final  String DEMANDFILTERTITLE = "Nhu cầu sử dụng";

//harddrive
    public static  final  String HARDDRIVEFILTERTITLE = "Ổ cứng";
    public static  final  String HARDDRIVE128 = "128 GB";
    public static  final  String HARDDRIVE256 = "256 GB";
    public static  final  String HARDDRIVE512 = "512 GB";
    public static  final  String HARDDRIVE1TB_ = "Từ 1 TB trở lên";

//price
    public static  final  String PRICEFILTERTITLE = "Giá";
    public static  final  String PRICE_15 = "Dưới 15 triệu";
    public static  final  String PRICE15_20 = "Từ 15 đến 20 triệu";
    public static  final  String PRICE20_25 = "Từ 20 đến 25 triệu";
    public static  final  String PRICE25_35 = "Từ 25 đến 35 triệu";
    public static  final  String PRICE35_ = "Từ 35 triệu chở lên";

//ram
    public static  final  String RAMFILTERTITLE = "RAM";
    public static  final  String RAM4 = "4 GB";
    public static  final  String RAM8 = "8 GB";
    public static  final  String RAM12 = "12 GB";
    public static  final  String RAM16 = "16 GB";
    public static  final  String RAM32_ = "Từ 32 GB trở lên";

//screen
    public static  final  String SCREENFILTERTITLE = "Màn hình";
    public static  final  String SCREEN_14 = "Dưới 14 inch";
    public static  final  String SCREEN14_16 = "Từ 14 đến 16 inch";
    public static  final  String SCREEN16_ = "Từ 16 inch trở lên";

    public static  final  String convertFilterTitleToLaptopField (String title) {
        switch (title) {
            case BRANDFILTERTITLE:
                return "l.brand.name()";
            case DEMANDFILTERTITLE:
                return "l.demand";
            case HARDDRIVEFILTERTITLE:
                return "l.hard_drive";
            case PRICEFILTERTITLE:
                return "l.unit_price";
            case RAMFILTERTITLE:
                return "l.ram";
            case SCREENFILTERTITLE:
                return "l.monitor";
            default:
                return "";
        }
    }
}
