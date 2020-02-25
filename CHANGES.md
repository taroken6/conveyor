# Conveyor Changelog

## Version 1.6.0

### Unreleased

-   Add Summary and Footer #141
-   Add 'go to' pagination tooltip #146
-   Fix multi-select bug #157
-   Add Removable feature #159
-   Fix target name in 'Remove' modal #163
-   props: 'formStack', 'user': no longer passed into overrides. 'modelStore' no longer passed into conveyor

## Version 1.5.0

### Released 1/30/20

-   Add singleton feature #113
-   Add disabled options dropdown #111
-   Consolidate filters into one panel #93
-   Add ability to sort by clicking on field name or header #95
-   Add table hide feature #109
-   Give CreatableStringSelect input type className / classNamePrefix #121
-   Fix broken filter rels #94
-   Changed Tooltip action model to modelName #122
-   Fix filter dropdown bug #124
-   Give filter, hide, and sort icons unique classnames #120
-   Add redirect to PageNotFound with bad url #123
-   Add pagination #126
-   Hide table headers if empty #115
-   Filterable and Sortable are bool or func; currency filterable now #129
-   Table Header is no longer link #133
-   Add pagination to detail page tables #127
-   Text area now correctly display new lines #132
-   Use react-icons instead of react-svg #125
-   Set clearable to false if required, other set to isClearable #100
-   Refactor 'inputTypes', delete 'getInputType' #138
-   Refactor tableView structure to fit pagination #135
-   Add page number tooltips to pagination buttons #136
-   Add search component #147
-   Optimize select input type #146
-   Show total items currently selected and show the range of items #142

## Version 1.4.0

### Released 12/6/19

## Version 1.3.0

### Released 11/14/19
-   Add ability to add displayNamePlural function #60
-   Add override skips & fix m2m rel label #16
-   Refactor customProps passed into override functions #64
-   Add conditional components #74 & #76 & #97
-   Cleanup delete review tables #54
-   Autofocus on first element in create form; autofocus on edit element
-   Add onKeyDown function to Input component #58
-   Add error to Int field overflow #57
-   Fix filter and sort button header position #52
-   Expose onFileChange method for custom File inputs #43
-   Del InlineInput component #81
-   Fix node and data props #70
-   Add model level overrides #62
-   Add CreatableStringSelect to conveyor's FlexibleInput choices #72
-   Fix bug in modal creation #110

## Version 1.2.0

### Released 10/2/19
-   Standardize how Create button logic shows up everywhere
-   Implement new babelrc presets and plugins
-   Add delete button to files #49
-   Add Filter Feature #32



## Version 1.1.0

### Released 9/10/19
-   Add Sort Button #30
-   Add props to displayName override function #37
-   Standardize isDeletable, isCreatable, isEditable & others #35
-   Add sortable prop to schema #38
