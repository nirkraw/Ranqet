classname = "FetchPresetsResponse"

def getFields():
    filename = classname + ".txt"
    fields = []
    with open(filename) as f:
        for line in f:
            toks = line.split();
            fields.append((toks[0].strip(), toks[1].strip()))
    return fields;

def outputClass():
    fields = getFields()
    print("public class " + classname + " {\n")
    for field in fields:
        if (field[1] == "Object" or field[1] == "List<Object>"):
            print("\t// TODO: Implement subdocument entity")
        elif (field[1] == "Enum"):
            print("\t// TODO: Implement enum")
        print("\tprivate final " + field[1] + " " + field[0] + ";\n")


    # builder constructor
    print("\tprivate " + classname + "(Builder builder) {\n\t\t" + \
          "\n\t\t".join(map(lambda field: "this." + field[0] + " = builder." + field[0] + ";", fields)) + "\n\t}\n")
    
    # getters and setters
    for field in fields:
        print("\tpublic " + field[1] + " get" + field[0][0].capitalize() + field[0][1:] + "() {")
        print("\t\treturn this." + field[0] + ";\n\t}\n")

    print("public static Builder builder() {\n\t\treturn new Builder();\n\t}\n")

    #Builder class
    print("\t@JsonPOJOBuilder\n\tpublic static final class Builder {\n\n\t\t" + \
          "\n\n\t\t".join(map(lambda field: "private " + field[1] + " " + field[0] + ";", fields)) + "\n\n" + \
          "\n\n\t\t".join(map(lambda field: "public Builder with" + field[0][0].capitalize() + \
                              field[0][1:] + "(" + field[1] + " " + field[0] + ") { \n\t\t\tthis." + field[0] + " = " + field[0] + \
                              ";\n\t\t\treturn this;\n\t\t}", fields)) + \
          "\n\t\tpublic " + classname + " build() {\n\t\t\treturn new " + classname + "(this);\n\t\t}\n\t}\n")

    # equals
    print("\t@Override\n\tpublic boolean equals(Object o) {\n\t\tif (this == o) {\n\t\t\treturn true;\n\t\t}\n\t\
        if (o == null || getClass() != o.getClass()) {\n\t\t\treturn false;\n\t\t}\n\t\t" \
          + classname + " that = (" + classname + ") o;\n\t\treturn " + \
          "\n\t\t\t&& ".join(map(lambda field: "Objects.equals(" + field[0] + ", that.get" + field[0][0].capitalize() + field[0][1:] + "())", fields)) + ";\n\t}\n")
    # hashcode
    print("\t@Override\n\tpublic int hashCode() {\n\t\treturn Objects.hash(" + ", ".join(map(lambda field: field[0], fields)) + ");\n\t}\n")
    print("}")
    
outputClass()
