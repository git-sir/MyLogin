package com.test.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by 钟廷员 on 2016/9/12.
 */
public class JsonUtils {
    public static final ObjectMapper mapper = new ObjectMapper();

    private static JavaType getCollectionType(Class<?> collectionClass, Class<?>... elementClasses) {
        return mapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
    }

    public static List<Map> jsonToList(String jsonStr) throws IOException {
        return mapper.readValue(jsonStr, new TypeReference<List>() {});
    }

    public static List jsonToList(String jsonStr, Class clazz) throws IOException {
        JavaType javaType = getCollectionType(ArrayList.class, clazz);
        return mapper.readValue(jsonStr, javaType);
    }

    public static Object jsonToObject(String jsonStr, Class clazz) throws IOException {
        return mapper.readValue(jsonStr, clazz);
    }

    public static JsonNode jsonToJsonNode(String jsonStr) throws IOException {
        return mapper.readTree(jsonStr);
    }

    public static String formatObjectToJson(Object object) throws JsonProcessingException {
        return mapper.writeValueAsString(object);
    }

    public static JsonNode formatObjectToJsonNode(Object object) {
        return mapper.valueToTree(object);
    }
}
