Schema Overview
---------------

The schema utilized by the framework will be different than the existing schema and will look like::

  {
    <modelName>: {
      tabs: {} #See tab documentation, determined by Front end
      hasIndex: boolean #Whether the model should be included in an index page
      createFieldOrder: #List or a function that returns a list of the order that the create fields display
      indexFieldOrder: #List or a function that returns a list of the order that the index fields display
      detailFieldOrder: #List or a function that returns a list of the order that the detail fields display
      queryName: #Name of gql query that will return a single instance of the model 
      queryAllName: #Name of gqlquery that will return all instances of the model
      queryRequired: #List of fields that must be present on the query
      modelName: #Name of model
      displayName: "" #Singular display name of model or function that calculates displayName, used on detail page
      displayNamePlural: "" #Plural display name of Model or function that calculates displayNamePlural, used on index page
      tableLinkField: "" #name of the field/column in a table that links to the detail page, a value of null means no link to the model should be displayed on a table 
      displayField: "" #name of field that holds the data used to represent the instance when it is being displayed or referenced, defaults to "name" if left undefined, can also be a function that determines the value for any instance of the model
      fieldOrder: "" #List of ALL fields on a model in the order that they should be displayed on its own Detail and Index pages, also serves as a fall back if a different model is displaying this model without having specified the order in which the fields should be displayed.
      fields: {
        <fieldName>: {
          components: {
            cell: () => {} #Override the display component of model.field when displayed within a table, determined by Front end
            detail: () => {} #Override the display label and value of model.field when displayed on a detail page, determined by Front end
            detailLabel: () => {} #Override the display label of model.field when displayed on a detail page, determined by Front end
            detailValue: () => {} #Override the display value of model.field when displayed on a detail page, determined by Front end
            input: () => {} #Override the input component of model.field when editing, determined by Front end
            labelInfo: () => {} #the content to display in the popover when the label is clicked on
          }
          
          fieldName: "" #Name of the field, used as the key in fields dictionary
          displayName: "" #Provides how the field should be displayed or function that calculates displayName
          detailAttribute: boolean #Determines whether or not a field should display in the attribute or table section of a detail page
          type:  "" #When type is a string it provides the type of a simple type such as string, int, or date
          OR
          type: { #When type is an object is provides the type of a more complicated type such as relationship or enum
            type: "" # Database type of OneToOne, OneToMany, ManyToMany, or ManyToOne
            target: "" #modelName of the target of the relationship
            backref(formerly inverseSide): "" #name of relationship on the targets side
            tableFields: [] #List of fields on the target model to display when displaying a table on the detail page
          }
          choices: { #Dict of choice values to their labels
              'choice_value' : 'choice_label'
          }
          choiceOrder: [] #Order of 'choices' appearing in Enum field
          sortable: boolean #Whether the given field should be sortable on tables
          filterable: boolean #Whether the given field should be filterable on tables
          editable: boolean or function #Whether the given field should be editable
          showDetail: boolean or function #Whether the given field should be displayed on the detail page
          showIndex: boolean #Whether the given field should be displayed on the index page
          showCreate: boolean #Whether the given field should be displayed on the create page
          showTooltip: boolean #Whether the given field should be displayed on the tooltip
          queryIndex: boolean #Whether should be queried while fetching index page; by default the query will look at 'showIndex' prop but, if showIndex is false and queryIndex is true, will still query the field; used if you wish to have a field be available but NOT displaying for index
          queryDetail: boolean #Whether should be queried while fetching detail page; by default the query will look at 'showDetail' prop but, if showDetail is false and queryDetail is true, will still query the field; used if you wish to have a field be available but NOT displaying for detail
        }
      },
      //hold methods that will fire when certain events occur to fetch data for the related
      actions: {
        //holds methods that fire actions that fetch data for create pages
        create: {
        }
        edit: {
        }
        delete: {
        }
        list{
        }
        detail{
        },
      },
      //model level components
      components: {
        detail: () => {} // Detail page override components
        detailTitle: () => {} // Detail Title override component (Not yet implemented)
        create: () => {} // Create page override component
        createTitle: () => {} // Create Title override component (Not yet implemented)
        index: () => {} // Index page override component
        indexTitle: () => {} Index title override component (Not yet implemented)
      }
    }
  }
