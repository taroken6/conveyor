.. _tutorial/schema:

****************
Schema
****************


Minimum Schema
------------------

'schemaJSON' is the json object that is created (by you) before being converted to conveyor-schema's SchemaBuilder object.

 .. code-block:: javascript

    const schemaJSON = {
       'Book': Book,
        ...otherModels
    }

Below is an example 'Book' model. These are the minimum props necessary to get the app going without errors.

 .. code-block:: javascript

    const defaultFieldProps = {
      editable: true,
      filterable: true,
      showCreate: true,
      showDetail: true,
      showIndex: true,
      showTooltip: false,
      sortable: true,
    }

    const Book = {
      creatable: true,
      deletable: true,
      displayField: 'name',
      displayName: 'BOOK',
      displayNamePlural: 'BOOKS',
      fields: {
        id: {
          ...defaultFieldProps,
          displayName: 'Id',
          editable: false,
          fieldName: 'id',
          showCreate: false,
          showDetail: false,
          showIndex: false,
          type: 'ID',
        },
        name: {
          ...defaultFieldProps,
          displayName: 'Name',
          fieldName: 'name',
          required: true,
          type: inputTypes.STRING_TYPE, // 'string'
          showTooltip: true,
        },
        published: {
          ...defaultFieldProps,
          displayName: 'Published',
          fieldName: 'published',
          type: inputTypes.DATE_TYPE, // 'date'
          showTooltip: true,
        },
        cost: {
          ...defaultFieldProps,
          displayName: 'Cost',
          fieldName: 'cost',
          type: inputTypes.CURRENCY_TYPE, // 'currency'
          showTooltip: true,
        },
        author: {
          ...defaultFieldProps,
          displayName: 'Author',
          fieldName: 'author',
          type: {
            backref: 'books',
            target: 'Author',
            type: 'ManyToOne'
          },
        },
        genres: {
          ...defaultFieldProps,
          displayName: 'Genres',
          fieldName: 'genres',
          type: {
            backref: 'books',
            tableFields: ['name', 'description'],
            target: 'Genre',
            type: 'OneToMany'
          }
        }
      },
      hasIndex: true,
      modelName: 'Book',
      tableLinkField: 'name',
      fieldOrder: ['name', 'published', 'cost', 'author', 'genres']
    }


Nuances and Notes
-------------------

*id*

We recommend setting 'false' for 'editable' and 'showCreate' as most databases do not anticipate user editing/setting object id's.

*type*

Notice that the  'ManyToOne' relationship field, 'author', has a 'type' which is an object, designating the associated model 'target', the associated model's field 'backref', and type. The 'OneToMany' field, which is displayed in a table, has 'tableFields', which dictates which of the fields will be displayed on a table in another model's detail page.

See `Field Types` & `Customizing Fields` for more info on how **type** works

*fieldOrder*

Notice the 'fieldOrder' specifies the order in which the fields generally appear. **If a field is not present in fieldOrder it will not appear on any page.** But, it is the designators: 'showIndex', 'showDetail', 'showCreate' which determine if the fields is present on Index/Detail/Create. pages. The detail page will place table fields ('OneToMany'/ 'ManyToMany') below the description list, no matter what the fieldOrder.

*tableLinkField*

This prop, if set to null, will default to 'name' to designate that the 'name' column must have the link to the detail page on any displayed table. If a name does not exist for this model, another field can be chosen:

  .. code-block:: JSON

    tableLinkField = 'username'

    or

    tableLinkField = null



If the model is an association model (a collection of 2 or more linked models, no identifying string 'name' field) and has no representative field, set 'tableLinkField' to null. Then, a 'view' button will appear on the right hand side of each row to link to the detail page.

*displayField*

For most models, this will be 'name' (or some other string field representing the object). It can even be a function that generates a custom name.

When building relationship/index tables for association models (models that have no unique identifier field but are a collection of relationships), it is necessary to have 'displayField' set to a function that returns a string (which will represent object instance) **if and only if** 'tableLinkField' is designated to be one of those relationship fields. If 'tableLinkField' is set to null, no 'displayField' is needed because the table will automatically create a "View" button which will link to the association model's detail page.

*hasIndex*

If false, redirects to '/' when you try to go to that model's index page.

*displayName vs displayField*

'displayField' is the name of the instance (one row in the table).
'displayName' is the name of the model (the entire table).

*required*

Adds a '*' to the displayed field name in the create form, to indicate that the field is required.
