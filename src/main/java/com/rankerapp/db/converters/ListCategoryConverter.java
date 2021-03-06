package com.rankerapp.db.converters;

import com.rankerapp.db.model.ListCategory;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ListCategoryConverter implements AttributeConverter<ListCategory, String> {
    
    @Override
    public String convertToDatabaseColumn(ListCategory attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.name();
    }
    
    @Override
    public ListCategory convertToEntityAttribute(String dbData) {
        try {
            return ListCategory.valueOf(dbData);
        } catch (IllegalArgumentException e) {
            return ListCategory.MISC;
        }
    }
}