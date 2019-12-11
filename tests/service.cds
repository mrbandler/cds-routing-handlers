service TestService {
    function hello(name: String) returns String;
    action greeter(title: String, name: String);

    entity Greeter {
        key Id: String;
            Name: String;
            Message: String;
    }
}