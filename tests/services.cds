using {test as my} from './schema';

@path: 'testService'
service TestService {
    function hello(name: String) returns String;
    action greeter(title: String, name: String) returns GreeterReturn;

    type GreeterReturn {
        title: String;
        name: String;
    }

    entity Greeter {
        key Id: String;
            Name: String;
            Message: String;
    }

    entity TestEntity as projection on my.TestEntity;

    entity DraftEnabledEntity as projection on my.DraftEnabledEntity;
}

annotate TestService.DraftEnabledEntity with @odata.draft.enabled;

annotate TestService.DraftEnabledEntity with @UI : {
    LineItem : [
        {
          Value : Id,
          ![@UI.Importance] : #High
        },
        { Value : Name              }
    ]
};