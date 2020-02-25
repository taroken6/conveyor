.. _tutorial/singleton:

*********************
Singleton
*********************

To create a singleton page (a model without an Index page and only one instance), add to schema:

 .. code-block:: javascript

    schema = { <modelName>: {
        singleton: true,
        hasIndex: false, // not necessary but recommended
    }}
    // singleton => higher precedence than 'hasIndex: true'


Navigating to Index page (or Detail page) will redirect to Detail page:


 .. code-block:: javascript

    <Redirect to={`/${modelName}/${id}`} />


You shouldn't need to set up any additional routes in your navigation. If you have set up conveyor to handle your "Detail Page", its layout will be the same as other detail pages (where url matches "/modelName/id"). If you do not want this behavior, you must set up a custom detail page in your navigation to override this.

**Data Handling**

To get the singleton, conveyor will look at the last object in the 'data' list (passed into "Index" component). If the object does not exist, or if it has no 'id', then the singleton does not exist. If no instance exists, it will redirect to a intermediate page with a "Create" button, which will then navigate to that model's create page.

