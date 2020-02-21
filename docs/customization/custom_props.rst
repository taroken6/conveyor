.. _customization/custom_props:

*************
Custom Props
*************


`customProps` is an immutable reference object for passing in useful props into override functions whenever necessary. You can put anything you want in there. We won't judge. For example, if you want to override a create component, but need a 'location' prop, which is only available in the container housing conveyor's `Create` component, then you may place it into `customProps`:


 .. code-block:: javascript

    import { Create } from 'conveyor'
    const mapStateToProps = (state, props) => {
      return {
        ...props
        customProps: {location: props.location} // 'location' necessary for override
      }
    }
    export const Foo = connect(mapStateToProps, mapDispatchToProps)(Create)

Then, in your schema, override functions will have access to this customProps object:

 .. code-block:: javascript

    // creatable prop in schema:
    const creatable = ({ schema, modelName, parentNode, data, customProps }) => {
      // ...custom logic
      return true
    }
    const deletable = ({ schema, modelName, parentNode, node, customProps }) => false


The object 'customProps' is passed into the following override functions & override components supplied by the schema:


Schema Function Props
-----------------------

 .. code-block:: JSON

    displayField
    displayName (field)
    displayName (model)
    displayNamePlural

    showCreate
    showDetail
    showIndex
    showTooltip

    createFieldOrder
    detailFieldOrder
    indexFieldOrder

    editable
    deletable
    creatable

    displayConditions (detail, index, create)
    disabled

    // components which receive 'customProps'

    fieldName => components =>

    'cell'
    'detail'
    'detailLabel'
    'detailValue'
    'input'

    modelName => components =>

    'create',
    'createTitle',
    'createPage',
    'detail',
    'detailTitle',
    'detailPage',
    'index',
    'indexTitle',
    'indexPage'


Notes
---------

If you override components, you must pass 'customProps' into them as well. Otherwise you may not consistently get the props you need into you schema functions. Features may be compromised.

For example, if you override the 'input' on a fieldName with another conveyor component (InputCore), you must pass all the props that you recieved:


 .. code-block:: javascript

    // goes into fieldName => components => 'input'
    const inputOverride = ({ node, customProps, ...props }) => {
      // custom logic here using 'node' and 'customProps'
      // pass in all the variables received so as not to compromise features
      return InputCore({ node, customProps, ...props })
    }
