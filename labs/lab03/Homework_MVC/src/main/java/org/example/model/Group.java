package org.example.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Group {
    private Integer groupId;
    private String groupName;
    private String notes;
}
