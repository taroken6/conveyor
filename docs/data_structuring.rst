Data Structuring
----------------

Data that is used in the table expects data in this form::

//TODO: Add table data structure

Data that is used by relSelectInputs expects data in this form::
  
  <modelName>: {
    <fieldNameToOne>: { label: "label", value: {} } // an object with label value keys fills in the select input
    <fieldNameToMany> [{ label: "label", value: {} }, ...] // a list of objects with the above structure fill multiselects
  }
