package org.example.type;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

public enum BrandType {
    ACER,
    ASUS,
    DELL,
    HP,
    LENOVO,
    MAC,
    MSI;

    public static  BrandType getBrandByName (String name) {
        switch (name) {
            case "ACER": {
                return ACER;
            }
            case "ASUS": {
                return ASUS;
            }
            case "DELL": {
                return DELL;
            }
            case "HP": {
                return HP;
            }
            case "LENOVO": {
                return LENOVO;
            }
            case "MAC": {
                return MAC;
            }
            case "MSI": {
                return MSI;
            }
            default:
                return ACER;
        }
    }

    @Converter
    public static class BrandConverter implements AttributeConverter<BrandType, String> {

        @Override
        public String convertToDatabaseColumn(BrandType brandType) {
            if(brandType == null)
                return null;
            switch (brandType) {
                case ACER:
                    return "ACER";
                case HP:
                    return "HP";
                case MAC:
                    return "MAC";
                case MSI:
                    return "MSI";
                case ASUS:
                    return "ASUS";
                case DELL:
                    return "DELL";
                case LENOVO:
                    return "LENOVO";
                default:
                    throw new IllegalArgumentException(brandType + " not supported.");
            }
        }

        @Override
        public BrandType convertToEntityAttribute(String s) {
            if(s == null) {
                return null;
            }
            switch (s) {
                case "ACER":
                    return ACER;
                case "HP":
                    return HP;
                case "MAC":
                    return MAC;
                case "MSI":
                    return MSI;
                case "ASUS":
                    return ASUS;
                case "DELL":
                    return DELL;
                case "LENOVO":
                    return LENOVO;
                default:
                    throw new IllegalArgumentException(s + " not supported.");
            }
        }
    }
}
