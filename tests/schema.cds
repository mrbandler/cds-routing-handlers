using { managed } from '@sap/cds/common';

namespace test;

entity TestEntity: managed {
    key Id: UUID @readonly default 0;
        Name: String;
};

entity DraftEnabledEntity: managed {
     key Id: UUID @readonly default 0;
         Name: String;
};