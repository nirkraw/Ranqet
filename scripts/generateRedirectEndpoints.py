
paths = []
with open("../webapp/src/components/App.js") as f:
    for line in f:
        if ("path=\"" in line):
            tokens = line.strip().split();
            for tok in tokens:
                if (tok.startswith("path=")):
                    path = tok.split("=")[1].strip("\"");
                    if (path is not "/"):
                        paths.append(path);


print(str(paths))

def replacePathParams(path):
    tokens = path.split("/")
    replacedPath = ""
    for tok in tokens:
        if (tok.startswith(":")):
            replacedPath = replacedPath + "{" + tok.strip(":") + "}/"
        else:
            replacedPath = replacedPath + tok + "/"
    return replacedPath[:-1]

def getMethodName(path):
    tokens = path.strip("/").split("/")
    first = True
    hasParam = False;
    name = ""
    for tok in tokens:
        isParam = tok.startswith(":")
        substr = tok.replace("-", "")
        if (isParam):
            substr = tok.strip(":")
            hasParam = True;
        if (first):
            name = name + substr
            first = False
        else:
            name = name + substr.capitalize()

    if (len(name.strip()) is 0):
        name = "index"
    if (hasParam):
        name += "(@PathVariable(value = \"" + substr + "\") String " + substr + ")"
    else:
        name += "()"
    return name;

with open("../src/main/java/com/rankerapp/resource/RedirectResource.java", "w") as f:
    header = "package com.rankerapp.resource;"
    imports = "import com.rankerapp.exceptions.RedirectException;\n\
               import org.springframework.web.bind.annotation.CrossOrigin;\n\
               import org.springframework.web.bind.annotation.PathVariable;\n\
               import org.springframework.web.bind.annotation.GetMapping;\n\
               import org.springframework.web.bind.annotation.RestController;\n\n\
               import javax.inject.Inject;\n\n"
    body = "@RestController\n\
public class RedirectResource {\n\n\
    @Inject\n\
    public RedirectResource() {}\n"

    endpoints = list(map(lambda path: "@CrossOrigin(origins = \"http://localhost:3000\")\n\t\
                      @GetMapping(\"" + replacePathParams(path) + "\")\n\
                      public void " + getMethodName(path) + "{ \n\
                      throw new RedirectException();\n\t}", paths))
    finalImpl = header + "\n" + imports + body + "\n\n".join(endpoints) + "}";
    f.write(finalImpl)
    print(finalImpl);


