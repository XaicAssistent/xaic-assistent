package com.xaicassistant.xaicassistent.model;

public enum  UserType {
    ADMIN("adm"), USER("user"), COMPANY("com");

    private String nameUserType;

    private UserType(String nameUserType) {
        this.nameUserType = nameUserType;
    }

    //Enum.valueOf(ServiceRoom.class, e.trim().toUpperCase())
}
