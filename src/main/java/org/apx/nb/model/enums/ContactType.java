package org.apx.nb.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.apx.nb.model.Contact;

import java.io.IOException;

/**
 * Created by oleg on 10/23/14.
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@JsonDeserialize(using = ContactType.Desirializer.class)
public enum ContactType {

    CONTACT_PHONE("Контактный телефон",""),
    MOBILE_PHONE("Мобильный телефон",""),
    HOME_PHONE("Домашний телефон",""),
    EMAIL("Электронная почта","email"),
    SKYPE("Skype",""),
    FAX("Факс","");

    final String label;
    final String regex;

    ContactType(String m, String r){
        label = m;
        regex = r;
    }

    public String getName(){
        return this.name();
    }

    public String getLabel() {
        return label;
    }

    public String getRegex() {
        return regex;
    }

    @JsonCreator
    public ContactType create(@JsonProperty("name") String name){

        return ContactType.valueOf(name);
    }

    public static class Desirializer extends JsonDeserializer<ContactType> {

        @Override
        public ContactType deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
            JsonNode jn = jsonParser.getCodec().readTree(jsonParser);
            String name = jn.get("name").textValue();
            return name != null && !"".equals(name) ? ContactType.valueOf(name) : ContactType.CONTACT_PHONE;
        }
    }

}
