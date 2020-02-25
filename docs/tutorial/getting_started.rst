.. _tutorial/getting_started:

*********************
Getting Started
*********************


This tutorial is front-end only, and does not manage database queries, mutations, resolvers, ect. It merely exposes the flow of data and the access points where a request might be made.

We assume you have an empty react app, a redux store, and a connected router. Reference the example project for inspiration.

We assume you have some familiarity with react, redux, functional programming, routing, and ramda.

For clarification on terms such as 'index page', 'detail page', 'delete warning', 'relationship table', 'association table', 'form stack', 'inline edits' and 'table edits' refer to the
:ref:`Feature Gallery <feature_gallery>`.


================
React-Router
================

You must create an entry point to Conveyor's Index, Detail, and Create components within your app. This application creates links to detail pages using the 'modelName' and 'id'. For example:

  .. code-block:: JSON

    '/<modelName>/<id>'

And it uses the 'modelName' for index pages:

  .. code-block:: JSON

    '/<modelName>'

If nested tabs are incorporated, the pillId is stacked on top of the Detail url:

  .. code-block:: JSON

    '/<modelName>/<id>/<pillId>/<pillId>/...'


Here, 'react-router-dom' is used to set up navigation for the index, detail, and create pages. You need only 1 Route for each type of page: Index, Detail, Create. Here, 'modelName' dynamically be picked up from the url (the modelName must match the schema). As Conveyor auto-generates detail components, and links to those components, the code below will automatically associate those pages with a url in this format: '/:modelName/:id'. The 'CreateContainer', 'DetailContainer' and 'IndexTableContainer' will house the Conveyor components.


 .. code-block:: javascript

        <Switch>
          <Route exact path='/Create' component={CreateContainer} />
          <Route exact path='/:modelName/:id' component={DetailContainer} />
          <Route exact path='/:modelName' component={IndexTableContainer} />
        </Switch>

*Note*: The paths must not be prefixed. For example, a detail url, '/Book/1', cannot be prefixed by anything (cannot be: 'somepath/<modelName>/<id>').


================
CSS
================

Import css from conveyor, react-datepicker, rc-switch, and react-tippy into your /src/index.js file.

 .. code-block:: javascript

    import 'react-datepicker/dist/react-datepicker.css'
    import 'react-tippy/dist/tippy.css'
    import 'conveyor/css/index.css'
    import 'rc-switch/assets/index.css'
