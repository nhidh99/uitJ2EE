package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.example.model.CPU;
import org.example.model.HardDrive;
import org.example.model.Monitor;
import org.example.model.RAM;
import org.example.type.*;

import java.util.List;

@Data
public class LaptopInput {
    @JsonProperty("name")
    private String name;

    @JsonProperty("brand")
    private BrandType brand;

    @JsonProperty("cpuType")
    private CPUType cpuType;

    @JsonProperty("cpuDetail")
    private String cpuDetail;

    @JsonProperty("graphicsCard")
    private String graphicsCard;

    @JsonProperty("ports")
    private String ports;

    @JsonProperty("os")
    private String os;

    @JsonProperty("design")
    private String design;

    @JsonProperty("unitPrice")
    private Long unitPrice;

    @JsonProperty("discountPrice")
    private Long discountPrice;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("ramType")
    private RAMType ramType;

    @JsonProperty("ramSize")
    private Integer ramSize;

    @JsonProperty("ramBus")
    private Integer ramBus;

    @JsonProperty("ramExtraSlot")
    private Integer ramExtraSlot;

    @JsonProperty("hardDriveType")
    private HardDriveType hardDriveType;

    @JsonProperty("hardDriveDetail")
    private String hardDriveDetail;

    @JsonProperty("hardDriveSize")
    private Integer hardDriveSize;

    @JsonProperty("resolutionType")
    private ResolutionType resolutionType;

    @JsonProperty("resolutionWidth")
    private Integer resolutionWidth;

    @JsonProperty("resolutionHeight")
    private Integer resolutionHeight;

    @JsonProperty("cpuSpeed")
    private Float cpuSpeed;

    @JsonProperty("cpuMaxSpeed")
    private Float cpuMaxSpeed;

    @JsonProperty("monitorSize")
    private Float monitorSize;

    @JsonProperty("thickness")
    private Float thickness;

    @JsonProperty("weight")
    private Float weight;

    @JsonProperty("cpuId")
    private Integer cpuId;

    @JsonProperty("ramId")
    private Integer ramId;

    @JsonProperty("monitorId")
    private Integer monitorId;

    @JsonProperty("hardDriveId")
    private Integer hardDriveId;

    @JsonProperty("promotionIds")
    private List<Integer> promotionIds;

    @JsonProperty("tagIds")
    private List<Integer> tagIds;

    public RAM extractRAM() {
        return RAM.builder().id(ramId).size(ramSize).type(ramType)
                .bus(ramBus).extraSlot(ramExtraSlot).build();
    }

    public CPU extractCPU() {
        return CPU.builder().id(cpuId).type(cpuType).detail(cpuDetail)
                .speed(cpuSpeed).maxSpeed(cpuMaxSpeed).build();
    }

    public HardDrive extractHardDrive() {
        return HardDrive.builder().id(hardDriveId).type(hardDriveType)
                .size(hardDriveSize).detail(hardDriveDetail).build();
    }

    public Monitor extractMonitor() {
        return Monitor.builder().id(monitorId).size(monitorSize)
                .resolutionType(resolutionType).resolutionWidth(resolutionWidth)
                .resolutionHeight(resolutionHeight).build();
    }
}